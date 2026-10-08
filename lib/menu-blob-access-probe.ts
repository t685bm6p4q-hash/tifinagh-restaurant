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

export async function probeMenuBlobAccess(pathname: string): Promise<MenuBlobAccessProbe> {
  const [privateReadable, publicReadable] = await Promise.all([
    blobReadable(pathname, 'private'),
    blobReadable(pathname, 'public'),
  ])
  return {
    privateReadable,
    publicReadable,
    privateOnlyReady: privateReadable,
    publicLegacyPresent: publicReadable,
  }
}
