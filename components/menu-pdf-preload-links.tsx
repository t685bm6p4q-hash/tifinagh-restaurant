import { getMenuPdfViewerContext } from '@/lib/menu-pdf-viewer-context'

/** Preload LCP menu image — doit apparaître tôt dans le document (avant le header). */
export async function MenuPdfPreloadLinks() {
  const { lcpPreload } = await getMenuPdfViewerContext()
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
