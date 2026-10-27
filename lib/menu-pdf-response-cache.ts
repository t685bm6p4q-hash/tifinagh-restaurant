/**
 * Cache CDN pour `/api/menu-pdf` quand l’URL n’est pas épinglée à une révision.
 * `s-maxage` est ce que le CDN Vercel honore sur une Function (pas seulement `max-age`).
 */
export const MENU_PDF_CDN_CACHE_CONTROL =
  'public, s-maxage=3600, stale-while-revalidate=86400'

/** URL `?r=<révision>` : le fichier ne change plus pour cette clé. */
export const MENU_PDF_PINNED_CACHE_CONTROL =
  'public, max-age=31536000, s-maxage=31536000, immutable'

export const MENU_PDF_NO_STORE = 'no-store'

/** Les deux révisions doivent déjà passer par `menuRevisionCacheKey`. */
export function menuPdfResponseCacheControl(
  requestRevision: string | null | undefined,
  servedRevision: string | null | undefined,
): string {
  if (requestRevision && servedRevision && requestRevision === servedRevision) {
    return MENU_PDF_PINNED_CACHE_CONTROL
  }
  return MENU_PDF_CDN_CACHE_CONTROL
}

/** Pose le même ordre sur le navigateur et sur le CDN Vercel. */
export function applyMenuPdfCacheHeaders(headers: Headers, cacheControl: string): void {
  headers.set('Cache-Control', cacheControl)
  headers.set('CDN-Cache-Control', cacheControl)
  headers.set('Vercel-CDN-Cache-Control', cacheControl)
}
