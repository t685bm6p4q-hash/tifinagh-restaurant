import type { MenuDishesTexts } from '@/lib/menu-dishes-format'
import type { MenuDayVariant, MenuMediaKind } from '@/lib/menu-pdf'

export type MenuFullscreenLabels = {
  open: string
  short: string
  back: string
}

export type MenuPdfViewerClientProps = {
  defaultVariant: MenuDayVariant
  hasEnglish: boolean
  kindByVariant: { fr: MenuMediaKind; en: MenuMediaKind }
  labels: { fr: string; en: string }
  langToggleFr: string
  langToggleEn: string
  enFallbackNote: string
  revisionByVariant: { fr: string | null; en: string | null }
  dishesByVariant: MenuDishesTexts
  fullscreenByVariant: Record<MenuDayVariant, MenuFullscreenLabels>
  reserveByVariant: Record<MenuDayVariant, string>
  share: {
    label: string
    copiedLabel: string
    shareTitle: string
    shareText: string
  }
}
