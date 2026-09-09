import { head } from '@vercel/blob'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import {
  MENU_PDF_PATHNAME,
  isBlobConfigured,
  menuKindFromContentType,
  sniffMenuContentType,
  type MenuMediaKind,
} from '@/lib/menu-pdf'

async function readStaticMenuBytes(): Promise<Uint8Array> {
  const filePath = path.join(process.cwd(), 'public', MENU_PDF_PATHNAME)
  const file = await readFile(filePath)
  return new Uint8Array(file)
}

export async function loadPublicMenu(): Promise<{ bytes: Uint8Array; contentType: string }> {
  if (isBlobConfigured()) {
    try {
      const meta = await head(MENU_PDF_PATHNAME)
      const upstream = await fetch(meta.url)
      if (!upstream.ok) throw new Error('Blob fetch failed')
      const bytes = new Uint8Array(await upstream.arrayBuffer())
      const sniffed = sniffMenuContentType(bytes)
      const contentType = sniffed ?? meta.contentType ?? 'application/pdf'
      return { bytes, contentType }
    } catch {
      // Repli sur le fichier statique livre avec le site.
    }
  }

  const bytes = await readStaticMenuBytes()
  const contentType = sniffMenuContentType(bytes) ?? 'application/pdf'
  return { bytes, contentType }
}

export async function getPublicMenuKind(): Promise<MenuMediaKind> {
  try {
    const menu = await loadPublicMenu()
    return menuKindFromContentType(menu.contentType)
  } catch {
    return 'pdf'
  }
}
