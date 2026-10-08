import { MenuMediaPreviewServer } from '@/components/menu/menu-media-preview-server'
import { MenuPdfViewerClient } from '@/components/menu-pdf-viewer-client'
import { buildMenuViewerInitialSnapshot } from '@/lib/menu-viewer-initial-snapshot'
import { buildMenuPdfViewerClientProps } from '@/lib/menu-pdf-viewer-props'
import { getMenuPdfViewerContext } from '@/lib/menu-pdf-viewer-context'

/** Menu du jour — iframe PDF ou image, avec bascule FR / EN. */
export async function MenuPdfViewer() {
  const ctx = await getMenuPdfViewerContext()
  const initialSnapshot = buildMenuViewerInitialSnapshot(ctx)

  return (
    <MenuPdfViewerClient
      {...buildMenuPdfViewerClientProps(ctx)}
      initialSnapshotKey={initialSnapshot.key}
      locale={ctx.locale}
    >
      <MenuMediaPreviewServer snapshot={initialSnapshot} />
    </MenuPdfViewerClient>
  )
}
