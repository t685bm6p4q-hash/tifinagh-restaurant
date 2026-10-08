import { cache } from 'react'
import { getDictionary } from '@/lib/i18n/get-locale'
import type { Locale } from '@/lib/i18n/config'
import {
  MENU_IMAGE_LCP_WIDTH,
  MENU_IMAGE_PREVIEW_WIDTHS,
  MENU_IMAGE_SIZES,
} from '@/lib/menu-image-display'
import { getMenuDishes } from '@/lib/menu-dishes'
import type { MenuDishesTexts } from '@/lib/menu-dishes-format'
import { getMenuStorageStatus, getPublicMenuKind } from '@/lib/menu-kind'
import {
  menuDayVariantForLocale,
  menuDuJourAlt,
  menuPdfApiUrl,
  menuPdfPreviewSrcSet,
  type MenuDayVariant,
  type MenuMediaKind,
} from '@/lib/menu-pdf'

export type MenuPdfViewerContext = {
  dictionary: ReturnType<typeof getDictionary>
  locale: Locale
  defaultVariant: MenuDayVariant
  hasEnglish: boolean
  kindByVariant: { fr: MenuMediaKind; en: MenuMediaKind }
  revisionByVariant: { fr: string | null; en: string | null }
  dishesByVariant: MenuDishesTexts
  lcpPreload:
    | {
        href: string
        imageSrcSet: string
        imageSizes: string
      }
    | null
}

/** Données partagées menu du jour (une seule résolution par requête RSC). */
export const getMenuPdfViewerContext = cache(async (locale: Locale): Promise<MenuPdfViewerContext> => {
  const dictionary = getDictionary(locale)
  const defaultVariant = menuDayVariantForLocale(locale)
  const [storageFr, storageEn, kindFr, kindEnResolved, dishesByVariant] = await Promise.all([
    getMenuStorageStatus('fr'),
    getMenuStorageStatus('en'),
    getPublicMenuKind('fr'),
    getPublicMenuKind('en'),
    getMenuDishes(),
  ])
  const hasEnglish = storageEn.exists
  const kindEn = hasEnglish ? kindEnResolved : kindFr

  const revisionByVariant = {
    fr: storageFr.revision,
    en: storageEn.revision,
  }

  const kindByVariant = { fr: kindFr, en: kindEn }
  const lcpVariant = defaultVariant
  const lcpKind = kindByVariant[lcpVariant]
  const lcpRevision = revisionByVariant[lcpVariant]
  const lcpPreload =
    lcpKind === 'image'
      ? {
          href: menuPdfApiUrl(lcpVariant, {
            maxWidth: MENU_IMAGE_LCP_WIDTH,
            revision: lcpRevision,
          }),
          imageSrcSet: menuPdfPreviewSrcSet(
            lcpVariant,
            MENU_IMAGE_PREVIEW_WIDTHS,
            lcpRevision,
          ),
          imageSizes: MENU_IMAGE_SIZES,
        }
      : null

  return {
    dictionary,
    locale,
    defaultVariant,
    hasEnglish,
    kindByVariant,
    revisionByVariant,
    dishesByVariant,
    lcpPreload,
  }
})

export function menuPdfViewerLabels(): { fr: string; en: string } {
  return { fr: menuDuJourAlt('fr'), en: menuDuJourAlt('en') }
}
