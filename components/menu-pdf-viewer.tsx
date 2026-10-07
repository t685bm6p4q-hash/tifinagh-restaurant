import { MenuPdfViewerClient } from '@/components/menu-pdf-viewer-client'
import { buildMenuPdfViewerClientProps } from '@/lib/menu-pdf-viewer-props'
import { getMenuPdfViewerContext } from '@/lib/menu-pdf-viewer-context'

/** Menu du jour — iframe PDF ou image, avec bascule FR / EN. */
export async function MenuPdfViewer() {
  const ctx = await getMenuPdfViewerContext()

  return <MenuPdfViewerClient {...buildMenuPdfViewerClientProps(ctx)} />
}
