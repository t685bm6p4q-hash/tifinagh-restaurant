import { isAdminAuthorized } from '@/lib/admin-auth'

export const MENU_PDF_PATHNAME = 'menu-du-jour.pdf'

/** Repli servi tant qu'aucun PDF n'a ete televerse. */
export const MENU_PDF_STATIC_FALLBACK = '/menu-du-jour.pdf'

export const MAX_MENU_PDF_BYTES = 5 * 1024 * 1024

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

/** Fail-closed : refuse si le mot de passe env est absent ou incorrect. */
export function isUploadAuthorized(request: Request): boolean {
  return isAdminAuthorized(request)
}
