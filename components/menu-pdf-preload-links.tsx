import type { Locale } from '@/lib/i18n/config'
import { getMenuPdfViewerContext } from '@/lib/menu-pdf-viewer-context'

/** Preload LCP menu image — doit apparaître tôt dans le document (avant le header). */
export async function MenuPdfPreloadLinks({ locale }: { locale: Locale }) {
  const { lcpPreload } = await getMenuPdfViewerContext(locale)
  if (!lcpPreload) return null

  return (
    <link
      rel="preload"
      as="image"
      href={lcpPreload.href}
      imageSrcSet={lcpPreload.imageSrcSet}
      imageSizes={lcpPreload.imageSizes}
      type="image/webp"
      fetchPriority="high"
    />
  )
}
