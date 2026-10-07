import { MenuPdfViewerClient } from '@/components/menu-pdf-viewer-client'
import {
  buildMenuPdfViewerClientProps,
  getMenuPdfViewerContext,
} from '@/lib/menu-pdf-viewer-props'

/** Menu du jour — iframe PDF ou image, avec bascule FR / EN. */
export async function MenuPdfViewer() {
  const ctx = await getMenuPdfViewerContext()
  const clientProps = buildMenuPdfViewerClientProps(ctx)

  return <MenuPdfViewerClient {...clientProps} />
}
