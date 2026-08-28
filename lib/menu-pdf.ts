export const MENU_PDF_PATHNAME = 'menu-du-jour.pdf'

/** Repli servi tant qu'aucun PDF n'a ete televerse. */
export const MENU_PDF_STATIC_FALLBACK = '/menu-du-jour.pdf'

export const MAX_MENU_PDF_BYTES = 5 * 1024 * 1024

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

export function isUploadAuthorized(request: Request): boolean {
  const expected = process.env.MENU_ADMIN_PASSWORD
  if (!expected) return true

  const provided = request.headers.get('x-menu-admin-password')
  return provided === expected
}
