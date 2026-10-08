import { get } from '@vercel/blob'

export type MenuBlobAccessProbe = {
  privateReadable: boolean
  publicReadable: boolean
  /** Privé lisible par l’API (requis pour MENU_BLOB_ALLOW_PUBLIC_FALLBACK=0). */
  privateOnlyReady: boolean
  /** Copie publique encore présente — à supprimer dans Vercel Storage pour un store 100 % privé. */
  publicLegacyPresent: boolean
}

async function blobReadable(pathname: string, access: 'private' | 'public'): Promise<boolean> {
  try {
    const result = await get(pathname, { access, useCache: false })
    if (result?.statusCode !== 200 || !result.stream) return false
    const reader = result.stream.getReader()
    const first = await reader.read()
    await reader.cancel().catch(() => undefined)
    return (first.value?.byteLength ?? 0) > 0
  } catch {
    return false
  }
}

/**
 * Détecte une vraie copie publique (URL .public.blob.* sans auth).
 * `get(..., { access: 'public' })` avec token/OIDC sur un store privé renvoie souvent 200
 * alors qu’aucun accès anonyme n’existe — d’où ce test HEAD sans Authorization.
 */
async function publicBlobAnonymousReadable(pathname: string): Promise<boolean> {
  const bases = new Set<string>()
  const legacy = process.env.MENU_BLOB_LEGACY_PUBLIC_BASE_URL?.replace(/\/$/, '')
  if (legacy) bases.add(legacy)

  const storeId = process.env.BLOB_STORE_ID?.replace(/^store_/i, '')
  if (storeId) {
    bases.add(`https://${storeId.toLowerCase()}.public.blob.vercel-storage.com`)
  }

  const encodedPath = pathname
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  for (const base of bases) {
    try {
      const res = await fetch(`${base}/${encodedPath}`, {
        method: 'HEAD',
        redirect: 'follow',
        signal: AbortSignal.timeout(8_000),
      })
      if (res.ok) return true
    } catch {
      /* base suivante */
    }
  }
  return false
}

export async function probeMenuBlobAccess(pathname: string): Promise<MenuBlobAccessProbe> {
  const [privateReadable, publicLegacyPresent] = await Promise.all([
    blobReadable(pathname, 'private'),
    publicBlobAnonymousReadable(pathname),
  ])
  return {
    privateReadable,
    publicReadable: publicLegacyPresent,
    privateOnlyReady: privateReadable,
    publicLegacyPresent,
  }
}
