import { isAdminAuthorized } from '@/lib/admin-auth'

export const MENU_PDF_PATHNAME = 'menu-du-jour.pdf'

/** URL unique du menu du jour (inline, iframe, lien direct). */
export const MENU_PDF_URL = '/api/menu-pdf'

/** Repli servi tant qu'aucun fichier n'a ete televerse. */
export const MENU_PDF_STATIC_FALLBACK = '/menu-du-jour.pdf'

export const MAX_MENU_PDF_BYTES = 5 * 1024 * 1024

export type MenuMediaKind = 'pdf' | 'image'

const JPEG = 'image/jpeg'
const PNG = 'image/png'
const PDF = 'application/pdf'

export function sniffMenuContentType(bytes: Uint8Array): string | null {
  if (bytes.length >= 4 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return PDF
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return JPEG
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return PNG
  }
  return null
}

export function resolveMenuUpload(file: File): { contentType: string; filename: string } | null {
  const name = file.name.toLowerCase()
  const type = (file.type || '').toLowerCase()

  if (type.includes('pdf') || name.endsWith('.pdf')) {
    return { contentType: PDF, filename: 'menu-du-jour.pdf' }
  }
  if (type === JPEG || type === 'image/jpg' || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
    return { contentType: JPEG, filename: 'menu-du-jour.jpg' }
  }
  if (type === PNG || name.endsWith('.png')) {
    return { contentType: PNG, filename: 'menu-du-jour.png' }
  }
  return null
}

export function menuKindFromContentType(contentType: string): MenuMediaKind {
  return contentType.startsWith('image/') ? 'image' : 'pdf'
}

export function menuInlineResponseHeaders(contentType: string): HeadersInit {
  const filename = contentType.includes('png')
    ? 'menu-du-jour.png'
    : contentType.startsWith('image/')
      ? 'menu-du-jour.jpg'
      : 'menu-du-jour.pdf'

  return {
    'Content-Type': contentType,
    'Content-Disposition': `inline; filename="${filename}"`,
    'Cache-Control': 'no-store',
    'X-Frame-Options': 'SAMEORIGIN',
    /** Autorise l'iframe same-origin sur /menu-du-jour (sinon frame-ancestors 'none' bloque). */
    'Content-Security-Policy': "frame-ancestors 'self'",
  }
}

/** @deprecated Utiliser menuInlineResponseHeaders */
export function pdfInlineResponseHeaders(): HeadersInit {
  return menuInlineResponseHeaders(PDF)
}

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

/** Fail-closed : refuse si le mot de passe env est absent ou incorrect. */
export function isUploadAuthorized(request: Request): boolean {
  return isAdminAuthorized(request)
}
