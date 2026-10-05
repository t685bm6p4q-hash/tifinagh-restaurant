import { get, head, list } from '@vercel/blob'
import { unstable_noStore as noStore } from 'next/cache'
import { access, open, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import {
  menuBlobPathname,
  isBlobConfigured,
  menuKindFromContentType,
  sniffMenuContentType,
  type MenuDayVariant,
  type MenuMediaKind,
} from '@/lib/menu-pdf'

async function readStaticMenuBytes(pathname: string): Promise<Uint8Array> {
  const filePath = path.join(process.cwd(), 'public', pathname)
  const file = await readFile(filePath)
  return new Uint8Array(file)
}

async function staticMenuExists(pathname: string): Promise<boolean> {
  try {
    await access(path.join(process.cwd(), 'public', pathname))
    return true
  } catch {
    return false
  }
}

export type MenuStorageStatus = {
  variant: MenuDayVariant
  pathname: string
  exists: boolean
  /**
   * Identifiant de version (souvent etag Blob) pour `?r=` et rechargement navigateur.
   * Ne pas afficher dans l’admin — utiliser `uploadedAt`.
   */
  revision: string | null
  /** Horodatage ISO pour l’admin (« Mise en ligne sur le site »). */
  uploadedAt: string | null
  contentType: string | null
  sizeBytes: number | null
}

function emptyMenuStorageStatus(variant: MenuDayVariant): MenuStorageStatus {
  return {
    variant,
    pathname: menuBlobPathname(variant),
    exists: false,
    revision: null,
    uploadedAt: null,
    contentType: null,
    sizeBytes: null,
  }
}

async function menuBlobStatusesFromList(): Promise<{
  fr: MenuStorageStatus
  en: MenuStorageStatus
}> {
  const { blobs } = await list({ prefix: 'menu-du-jour' })
  const byPath = new Map(blobs.map((blob) => [blob.pathname, blob]))

  const fromBlob = (variant: MenuDayVariant): MenuStorageStatus => {
    const pathname = menuBlobPathname(variant)
    const blob = byPath.get(pathname)
    if (!blob || blob.pathname !== pathname) {
      return emptyMenuStorageStatus(variant)
    }
    return {
      variant,
      pathname,
      exists: true,
      revision: blob.etag || blob.uploadedAt.toISOString(),
      uploadedAt: blob.uploadedAt.toISOString(),
      contentType: null,
      sizeBytes: blob.size,
    }
  }

  return { fr: fromBlob('fr'), en: fromBlob('en') }
}

/** Statut FR + EN en une lecture (liste Blob exacte par pathname). */
export async function getMenuStorageOverview(): Promise<{
  fr: MenuStorageStatus
  en: MenuStorageStatus
}> {
  noStore()
  if (isBlobConfigured()) {
    return menuBlobStatusesFromList()
  }
  const [fr, en] = await Promise.all([getMenuStorageStatus('fr'), getMenuStorageStatus('en')])
  return { fr, en }
}

export async function getMenuStorageStatus(variant: MenuDayVariant): Promise<MenuStorageStatus> {
  const pathname = menuBlobPathname(variant)
  if (isBlobConfigured()) {
    try {
      const meta = await head(pathname)
      if (meta.pathname !== pathname) {
        return emptyMenuStorageStatus(variant)
      }
      return {
        variant,
        pathname,
        exists: true,
        revision: meta.etag || meta.uploadedAt.toISOString(),
        uploadedAt: meta.uploadedAt.toISOString(),
        contentType: meta.contentType ?? null,
        sizeBytes: meta.size,
      }
    } catch {
      return emptyMenuStorageStatus(variant)
    }
  }

  const exists = await staticMenuExists(pathname)
  if (!exists) {
    return emptyMenuStorageStatus(variant)
  }

  const filePath = path.join(process.cwd(), 'public', pathname)
  const fileStat = await stat(filePath)
  const kind = await sniffStaticMenuKind(pathname)
  const contentType =
    kind === 'image' ? 'image/webp' : kind === 'pdf' ? 'application/pdf' : null

  return {
    variant,
    pathname,
    exists: true,
    revision: String(fileStat.mtimeMs),
    uploadedAt: fileStat.mtime.toISOString(),
    contentType,
    sizeBytes: fileStat.size,
  }
}

export async function isPublicMenuAvailable(variant: MenuDayVariant): Promise<boolean> {
  const pathname = menuBlobPathname(variant)
  if (isBlobConfigured()) {
    try {
      await head(pathname)
      return true
    } catch {
      return false
    }
  }
  return staticMenuExists(pathname)
}

export type LoadedPublicMenu = {
  bytes: Uint8Array
  contentType: string
  variant: MenuDayVariant
  fellBackFromEn: boolean
  /** Version du fichier source (invalidation cache des variantes ?w=). */
  revision: string
}

async function loadMenuFromStorage(
  pathname: string,
): Promise<{ bytes: Uint8Array; contentType: string; revision: string }> {
  if (isBlobConfigured()) {
    const meta = await head(pathname)
    const result = await get(pathname, { access: 'public', useCache: false })
    if (!result || result.statusCode !== 200 || !result.stream) {
      throw new Error('Blob fetch failed')
    }
    const bytes = new Uint8Array(await new Response(result.stream).arrayBuffer())
    const sniffed = sniffMenuContentType(bytes)
    const contentType =
      sniffed ?? result.blob.contentType ?? meta.contentType ?? 'application/pdf'
    const revision = meta.etag || meta.uploadedAt.toISOString()
    return { bytes, contentType, revision }
  }

  const filePath = path.join(process.cwd(), 'public', pathname)
  const bytes = await readStaticMenuBytes(pathname)
  const contentType = sniffMenuContentType(bytes) ?? 'application/pdf'
  const fileStat = await stat(filePath)
  return { bytes, contentType, revision: String(fileStat.mtimeMs) }
}

export type LoadPublicMenuOptions = {
  /** Si false, pas de repli FR quand le fichier EN est absent (aperçu admin strict). */
  fallbackEnToFr?: boolean
}

/** Charge le menu pour une variante ; repli EN → FR si demandé. */
export async function loadPublicMenu(
  variant: MenuDayVariant = 'fr',
  options: LoadPublicMenuOptions = {},
): Promise<LoadedPublicMenu> {
  noStore()
  const fallbackEnToFr = options.fallbackEnToFr ?? true
  const pathname = menuBlobPathname(variant)

  try {
    const menu = await loadMenuFromStorage(pathname)
    return { ...menu, variant, fellBackFromEn: false }
  } catch {
    if (variant === 'en') {
      if (!fallbackEnToFr) {
        throw new Error('MENU_NOT_FOUND')
      }
      const fr = await loadPublicMenu('fr', options)
      return { ...fr, variant: 'fr', fellBackFromEn: true }
    }
    if (isBlobConfigured()) {
      try {
        const menu = await loadMenuFromStorage(menuBlobPathname('fr'))
        return { ...menu, variant: 'fr', fellBackFromEn: false }
      } catch {
        // Repli fichier statique FR livré avec le site.
      }
    }
    const frPath = menuBlobPathname('fr')
    const bytes = await readStaticMenuBytes(frPath)
    const contentType = sniffMenuContentType(bytes) ?? 'application/pdf'
    const fileStat = await stat(path.join(process.cwd(), 'public', frPath))
    return {
      bytes,
      contentType,
      variant: 'fr',
      fellBackFromEn: false,
      revision: String(fileStat.mtimeMs),
    }
  }
}

async function sniffStaticMenuKind(pathname: string): Promise<MenuMediaKind | null> {
  const filePath = path.join(process.cwd(), 'public', pathname)
  try {
    const handle = await open(filePath, 'r')
    const buf = Buffer.alloc(16)
    const { bytesRead } = await handle.read(buf, 0, 16, 0)
    await handle.close()
    const sniffed = sniffMenuContentType(new Uint8Array(buf.subarray(0, bytesRead)))
    if (!sniffed) return null
    return menuKindFromContentType(sniffed)
  } catch {
    return null
  }
}

async function sniffBlobMenuKind(pathname: string): Promise<MenuMediaKind | null> {
  const meta = await head(pathname)
  const res = await fetch(meta.url, { headers: { Range: 'bytes=0-31' } })
  if (res.ok) {
    const bytes = new Uint8Array(await res.arrayBuffer())
    const sniffed = sniffMenuContentType(bytes)
    if (sniffed) return menuKindFromContentType(sniffed)
  }

  const declared = meta.contentType ?? ''
  if (declared.startsWith('image/')) return 'image'
  if (declared.includes('pdf')) return 'pdf'
  return null
}

function menuKindFromStorageStatus(status: MenuStorageStatus): MenuMediaKind {
  if (!status.exists) return 'pdf'
  if (status.contentType?.startsWith('image/')) return 'image'
  if (status.contentType?.includes('pdf')) return 'pdf'
  return 'pdf'
}

/** Détecte PDF vs image (PNG/JPEG/WebP) — priorité au contenu réel, pas au nom `.pdf` sur Blob. */
export async function getPublicMenuKind(variant: MenuDayVariant = 'fr'): Promise<MenuMediaKind> {
  const status = await getMenuStorageStatus(variant)
  if (!status.exists) {
    if (variant === 'en') return getPublicMenuKind('fr')
    return 'pdf'
  }

  if (isBlobConfigured()) {
    try {
      const sniffed = await sniffBlobMenuKind(status.pathname)
      if (sniffed) return sniffed
    } catch {
      /* repli contentType */
    }
  } else {
    const sniffed = await sniffStaticMenuKind(status.pathname)
    if (sniffed) return sniffed
  }

  return menuKindFromStorageStatus(status)
}
