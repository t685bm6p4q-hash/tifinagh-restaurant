import { MenuPdfViewerClient } from '@/components/menu-pdf-viewer-client'
import { getI18n } from '@/lib/i18n'
import { getPublicMenuKind, isPublicMenuAvailable } from '@/lib/menu-kind'
import { menuDayVariantForLocale, menuDuJourAlt } from '@/lib/menu-pdf'

/** Menu du jour — iframe PDF ou image, avec bascule FR / EN. */
export async function MenuPdfViewer() {
  const { dictionary, locale } = await getI18n()
  const d = dictionary.dailyMenuPage
  const defaultVariant = menuDayVariantForLocale(locale)
  const hasEnglish = await isPublicMenuAvailable('en')
  const kindFr = await getPublicMenuKind('fr')
  const kindEn = hasEnglish ? await getPublicMenuKind('en') : kindFr

  return (
    <MenuPdfViewerClient
      defaultVariant={defaultVariant}
      hasEnglish={hasEnglish}
      kindByVariant={{ fr: kindFr, en: kindEn }}
      labels={{ fr: menuDuJourAlt('fr'), en: menuDuJourAlt('en') }}
      langToggleFr={d.langToggleFr}
      langToggleEn={d.langToggleEn}
      enFallbackNote={d.enFallbackNote}
      fullscreenOpenLabel={d.fullscreenOpen}
      fullscreenBackLabel={d.fullscreenBack}
    />
  )
}
