import { getDictionary } from '@/lib/i18n/get-locale'
import {
  menuPdfViewerLabels,
  type MenuPdfViewerContext,
} from '@/lib/menu-pdf-viewer-context'
import type { MenuPdfViewerClientProps } from '@/lib/menu-viewer-types'

export function buildMenuPdfViewerClientProps(
  ctx: MenuPdfViewerContext,
): MenuPdfViewerClientProps {
  const d = ctx.dictionary.dailyMenuPage
  const menuFr = getDictionary('fr').dailyMenuPage
  const menuEn = getDictionary('en').dailyMenuPage

  return {
    defaultVariant: ctx.defaultVariant,
    revisionByVariant: ctx.revisionByVariant,
    dishesByVariant: ctx.dishesByVariant,
    hasEnglish: ctx.hasEnglish,
    kindByVariant: ctx.kindByVariant,
    labels: menuPdfViewerLabels(),
    langToggleFr: d.langToggleFr,
    langToggleEn: d.langToggleEn,
    enFallbackNote: d.enFallbackNote,
    fullscreenByVariant: {
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
    },
    share: {
      label: d.shareMenuLabel,
      copiedLabel: d.shareMenuCopied,
      shareTitle: d.shareMenuTitle,
      shareText: d.shareMenuText,
    },
    reserveByVariant: { fr: menuFr.bookNow, en: menuEn.bookNow },
  }
}

