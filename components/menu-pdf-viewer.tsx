import { MenuPdfViewerClient } from '@/components/menu-pdf-viewer-client'
import { getDictionary } from '@/lib/i18n/get-locale'
import {
  getMenuPdfViewerContext,
  menuPdfViewerLabels,
} from '@/lib/menu-pdf-viewer-context'

/** Menu du jour — iframe PDF ou image, avec bascule FR / EN. */
export async function MenuPdfViewer() {
  const ctx = await getMenuPdfViewerContext()
  const d = ctx.dictionary.dailyMenuPage
  const labels = menuPdfViewerLabels()
  const menuFr = getDictionary('fr').dailyMenuPage
  const menuEn = getDictionary('en').dailyMenuPage

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
      fullscreenByVariant={{
        fr: {
          open: menuFr.fullscreenOpen,
          short: menuFr.fullscreenShort,
          back: menuFr.fullscreenBack,
        },
        en: {
          open: menuEn.fullscreenOpen,
          short: menuEn.fullscreenShort,
          back: menuEn.fullscreenBack,
        },
      }}
      share={{
        label: d.shareMenuLabel,
        copiedLabel: d.shareMenuCopied,
        shareTitle: d.shareMenuTitle,
        shareText: d.shareMenuText,
      }}
      reserveByVariant={{ fr: menuFr.bookNow, en: menuEn.bookNow }}
    />
  )
}
