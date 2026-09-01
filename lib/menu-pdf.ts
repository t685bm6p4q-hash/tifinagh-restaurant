import { isAdminAuthorized } from '@/lib/admin-auth'

export const MENU_PDF_PATHNAME = 'menu-du-jour.pdf'

/** URL unique du menu du jour (inline, iframe, lien direct). */
export const MENU_PDF_URL = '/api/menu-pdf'

/** Repli servi tant qu'aucun PDF n'a ete televerse. */
export const MENU_PDF_STATIC_FALLBACK = '/menu-du-jour.pdf'

export const MAX_MENU_PDF_BYTES = 5 * 1024 * 1024

export function pdfInlineResponseHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'inline; filename="menu-du-jour.pdf"',
    'Cache-Control': 'no-store',
    'X-Frame-Options': 'SAMEORIGIN',
    /** Autorise l'iframe same-origin sur /menu-du-jour (sinon frame-ancestors 'none' bloque). */
    'Content-Security-Policy': "frame-ancestors 'self'",
  }
}

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

/** Fail-closed : refuse si le mot de passe env est absent ou incorrect. */
export function isUploadAuthorized(request: Request): boolean {
  return isAdminAuthorized(request)
}
