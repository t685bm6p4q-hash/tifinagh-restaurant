import { writeFile } from 'fs/promises'
import { join } from 'path'
import { writePrivateMenuBlob } from '@/lib/menu-blob-store'
import { compressMenuImageToWebp } from '@/lib/compress-menu-image'
import { revalidateMenuPublicCache } from '@/lib/menu-public-cache'
import {
  isBlobConfigured,
  isMenuSourceWithinLimit,
  MAX_MENU_UPLOAD_BYTES,
  menuBlobPathname,
  menuUploadSourceTooLargeMessage,
  menuUploadTooHeavyMessage,
  resolveMenuUpload,
  sniffMenuContentType,
  type MenuDayVariant,
} from '@/lib/menu-pdf'

export type MenuUploadProcessResult =
  | { ok: true; message: string; variant: MenuDayVariant }
  | { ok: false; error: string; status: number }

export async function processMenuUploadFile(
  file: File,
  variant: MenuDayVariant,
): Promise<MenuUploadProcessResult> {
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: 'Aucun fichier choisi.', status: 400 }
  }

  const resolved = resolveMenuUpload(file)
  if (resolved?.contentType === 'application/pdf') {
    return {
      ok: false,
      error:
        'Le serveur attend une photo JPEG ou PNG (max 10 Mo). Exportez votre PDF en image ou prenez une photo du menu.',
      status: 400,
    }
  }

  if (!isMenuSourceWithinLimit(file.size)) {
    return { ok: false, error: menuUploadSourceTooLargeMessage(file.size), status: 400 }
  }

  let buffer = Buffer.from(await file.arrayBuffer())
  const sniffed = sniffMenuContentType(new Uint8Array(buffer))
  if (!sniffed || !sniffed.startsWith('image/')) {
    return {
      ok: false,
      error:
        'Image non reconnue. Utilisez JPEG ou PNG (pas HEIC iPhone brut — partagez en JPEG depuis Photos).',
      status: 400,
    }
  }

  let contentType = sniffed
  if (contentType !== 'image/webp' || buffer.length > MAX_MENU_UPLOAD_BYTES) {
    try {
      buffer = Buffer.from(await compressMenuImageToWebp(buffer))
      contentType = 'image/webp'
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'IMAGE_TOO_HEAVY') {
        return { ok: false, error: menuUploadTooHeavyMessage(file.size), status: 400 }
      }
      throw error
    }
  }

  if (buffer.length > MAX_MENU_UPLOAD_BYTES) {
    return { ok: false, error: menuUploadTooHeavyMessage(buffer.length), status: 400 }
  }

  const pathname = menuBlobPathname(variant)

  try {
    if (isBlobConfigured()) {
      await writePrivateMenuBlob(pathname, buffer, contentType)
    } else {
      await writeFile(join(process.cwd(), 'public', pathname), buffer)
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : ''
    if (msg.includes('BLOB_READ_WRITE_TOKEN') || msg.includes('token')) {
      return {
        ok: false,
        error: 'Blob Vercel indisponible — vérifiez BLOB_READ_WRITE_TOKEN sur Vercel.',
        status: 503,
      }
    }
    throw error
  }

  revalidateMenuPublicCache()

  const label = variant === 'en' ? 'Menu anglais' : 'Menu français'
  return {
    ok: true,
    message: `✅ ${label} mis en ligne sur le site (WebP optimisé).`,
    variant,
  }
}
