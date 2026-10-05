import { MenuPdfViewerClient } from '@/components/menu-pdf-viewer-client'
import {
  getMenuPdfViewerContext,
  menuPdfViewerLabels,
} from '@/lib/menu-pdf-viewer-context'

/** Menu du jour — iframe PDF ou image, avec bascule FR / EN. */
export async function MenuPdfViewer() {
  const ctx = await getMenuPdfViewerContext()
  const d = ctx.dictionary.dailyMenuPage
  const labels = menuPdfViewerLabels()

  return (
    <MenuPdfViewerClient
      defaultVariant={ctx.defaultVariant}
      revisionByVariant={ctx.revisionByVariant}
      dishesByVariant={ctx.dishesByVariant}
      hasEnglish={ctx.hasEnglish}
      kindByVariant={ctx.kindByVariant}
      labels={labels}
      langToggleFr={d.langToggleFr}
      langToggleEn={d.langToggleEn}
      enFallbackNote={d.enFallbackNote}
      fullscreenOpenLabel={d.fullscreenOpen}
      fullscreenBackLabel={d.fullscreenBack}
      reserveLabel={d.bookNow}
    />
  )
}
