import { menuRevisionCacheKey } from '@/lib/menu-pdf'

/** En-tête Cache-Control pour `/api/menu-pdf` (images redimensionnées). */
export function menuPdfImageCacheControl(
  revision: string | null,
  displayWidth: number | null,
  isImage: boolean,
): string {
  if (menuRevisionCacheKey(revision)) {
    return 'public, max-age=31536000, immutable'
  }
  if (isImage && displayWidth) {
    return 'public, max-age=120, stale-while-revalidate=86400'
  }
  return 'public, max-age=300, stale-while-revalidate=86400'
}
