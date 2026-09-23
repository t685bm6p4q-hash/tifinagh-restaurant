import { MenuPdfViewerClient } from '@/components/menu-pdf-viewer-client'
import { getI18n } from '@/lib/i18n'
import { getPublicMenuKind } from '@/lib/menu-kind'
import { MENU_PDF_URL, menuDuJourAlt } from '@/lib/menu-pdf'

/** Menu du jour — iframe pour un PDF, image pour un JPEG/PNG. */
export async function MenuPdfViewer() {
  const kind = await getPublicMenuKind()
  const label = menuDuJourAlt()
  const { dictionary } = await getI18n()
  const d = dictionary.dailyMenuPage

  return (
    <MenuPdfViewerClient
      kind={kind}
      url={MENU_PDF_URL}
      label={label}
      fullscreenOpenLabel={d.fullscreenOpen}
      fullscreenCloseLabel={d.fullscreenClose}
    />
  )
}
