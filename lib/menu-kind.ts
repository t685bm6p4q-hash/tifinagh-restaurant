import { head } from '@vercel/blob'
import { access, open, readFile } from 'node:fs/promises'
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
}

async function loadMenuFromStorage(pathname: string): Promise<{ bytes: Uint8Array; contentType: string }> {
  if (isBlobConfigured()) {
    const meta = await head(pathname)
    const upstream = await fetch(meta.url)
    if (!upstream.ok) throw new Error('Blob fetch failed')
    const bytes = new Uint8Array(await upstream.arrayBuffer())
    const sniffed = sniffMenuContentType(bytes)
    const contentType = sniffed ?? meta.contentType ?? 'application/pdf'
    return { bytes, contentType }
  }

  const bytes = await readStaticMenuBytes(pathname)
  const contentType = sniffMenuContentType(bytes) ?? 'application/pdf'
  return { bytes, contentType }
}

/** Charge le menu pour une variante ; repli EN → FR si demandé. */
export async function loadPublicMenu(variant: MenuDayVariant = 'fr'): Promise<LoadedPublicMenu> {
  const pathname = menuBlobPathname(variant)

  try {
    const menu = await loadMenuFromStorage(pathname)
    return { ...menu, variant, fellBackFromEn: false }
  } catch {
    if (variant === 'en') {
      const fr = await loadPublicMenu('fr')
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
    const bytes = await readStaticMenuBytes(menuBlobPathname('fr'))
    const contentType = sniffMenuContentType(bytes) ?? 'application/pdf'
    return { bytes, contentType, variant: 'fr', fellBackFromEn: false }
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
  const declared = meta.contentType ?? ''
  if (declared.startsWith('image/')) return 'image'
  if (declared.includes('pdf')) return 'pdf'

  const res = await fetch(meta.url, { headers: { Range: 'bytes=0-31' } })
  if (!res.ok) return null
  const bytes = new Uint8Array(await res.arrayBuffer())
  const sniffed = sniffMenuContentType(bytes)
  return sniffed ? menuKindFromContentType(sniffed) : null
}

/** Détecte PDF vs image sans télécharger tout le fichier (SSR / PageSpeed). */
export async function getPublicMenuKind(variant: MenuDayVariant = 'fr'): Promise<MenuMediaKind> {
  const pathname = menuBlobPathname(variant)
  if (isBlobConfigured()) {
    try {
      const kind = await sniffBlobMenuKind(pathname)
      if (kind) return kind
      return 'pdf'
    } catch {
      if (variant === 'en') return getPublicMenuKind('fr')
      return 'pdf'
    }
  }
  const kind = await sniffStaticMenuKind(pathname)
  if (kind) return kind
  if (variant === 'en') return getPublicMenuKind('fr')
  return 'pdf'
}
