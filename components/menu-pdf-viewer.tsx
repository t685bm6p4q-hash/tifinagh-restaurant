import { MenuDayPreviewImage } from '@/components/menu-day-preview-image'
import { MenuPdfViewerClient } from '@/components/menu-pdf-viewer-client'
import { getI18n } from '@/lib/i18n'
import { getMenuStorageStatus, getPublicMenuKind, isPublicMenuAvailable } from '@/lib/menu-kind'
import {
  MENU_IMAGE_LCP_WIDTH,
  MENU_IMAGE_PREVIEW_WIDTHS,
  MENU_IMAGE_SIZES,
} from '@/lib/menu-image-display'
import {
  menuDayVariantForLocale,
  menuDuJourAlt,
  menuPdfApiUrl,
  menuPdfPreviewSrcSet,
} from '@/lib/menu-pdf'

/** Menu du jour — iframe PDF ou image, avec bascule FR / EN. */
export async function MenuPdfViewer() {
  const { dictionary, locale } = await getI18n()
  const d = dictionary.dailyMenuPage
  const defaultVariant = menuDayVariantForLocale(locale)
  const [hasEnglish, kindFr, storageFr, storageEn] = await Promise.all([
    isPublicMenuAvailable('en'),
    getPublicMenuKind('fr'),
    getMenuStorageStatus('fr'),
    getMenuStorageStatus('en'),
  ])
  const kindEn = hasEnglish ? await getPublicMenuKind('en') : kindFr

  const revisionByVariant = {
    fr: storageFr.revision,
    en: storageEn.revision,
  }

  const lcpVariant = defaultVariant
  const lcpRevision = revisionByVariant[lcpVariant]
  const preloadMenuImage =
    kindFr === 'image'
      ? menuPdfApiUrl(lcpVariant, { maxWidth: MENU_IMAGE_LCP_WIDTH, revision: lcpRevision })
      : null

  return (
    <>
      {preloadMenuImage ? (
        <link
          rel="preload"
          as="image"
          href={preloadMenuImage}
          imageSrcSet={menuPdfPreviewSrcSet(lcpVariant, MENU_IMAGE_PREVIEW_WIDTHS, lcpRevision)}
          imageSizes={MENU_IMAGE_SIZES}
          type="image/webp"
          fetchPriority="high"
        />
      ) : null}
      <MenuPdfViewerClient
      defaultVariant={defaultVariant}
      lcpPreview={
        kindFr === 'image' ? (
          <MenuDayPreviewImage
            variant={defaultVariant}
            alt={menuDuJourAlt(defaultVariant)}
            revision={revisionByVariant[defaultVariant]}
          />
        ) : null
      }
      revisionByVariant={revisionByVariant}
      hasEnglish={hasEnglish}
      kindByVariant={{ fr: kindFr, en: kindEn }}
      labels={{ fr: menuDuJourAlt('fr'), en: menuDuJourAlt('en') }}
      langToggleFr={d.langToggleFr}
      langToggleEn={d.langToggleEn}
      enFallbackNote={d.enFallbackNote}
      fullscreenOpenLabel={d.fullscreenOpen}
      fullscreenBackLabel={d.fullscreenBack}
    />
    </>
  )
}
