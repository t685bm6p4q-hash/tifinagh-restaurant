import { MenuDayPreviewImage } from '@/components/menu-day-preview-image'
import { MenuPdfViewerClient } from '@/components/menu-pdf-viewer-client'
import {
  getMenuPdfViewerContext,
  menuPdfViewerLabels,
} from '@/lib/menu-pdf-viewer-context'
import { menuDuJourAlt } from '@/lib/menu-pdf'

/** Menu du jour — iframe PDF ou image, avec bascule FR / EN. */
export async function MenuPdfViewer() {
  const ctx = await getMenuPdfViewerContext()
  const d = ctx.dictionary.dailyMenuPage
  const labels = menuPdfViewerLabels()
  const { fr: kindFr } = ctx.kindByVariant
  const defaultVariant = ctx.defaultVariant

  return (
    <MenuPdfViewerClient
      defaultVariant={defaultVariant}
      lcpPreview={
        kindFr === 'image' ? (
          <MenuDayPreviewImage
            variant={defaultVariant}
            alt={menuDuJourAlt(defaultVariant)}
            revision={ctx.revisionByVariant[defaultVariant]}
          />
        ) : null
      }
      revisionByVariant={ctx.revisionByVariant}
      hasEnglish={ctx.hasEnglish}
      kindByVariant={ctx.kindByVariant}
      labels={labels}
      langToggleFr={d.langToggleFr}
      langToggleEn={d.langToggleEn}
      enFallbackNote={d.enFallbackNote}
      fullscreenOpenLabel={d.fullscreenOpen}
      fullscreenBackLabel={d.fullscreenBack}
    />
  )
}
