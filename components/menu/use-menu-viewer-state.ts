'use client'

import { useCallback, useMemo, useState } from 'react'
import { parseMenuDishLines } from '@/lib/menu-dishes-format'
import {
  MENU_IMAGE_LCP_WIDTH,
  MENU_IMAGE_PREVIEW_WIDTHS,
} from '@/lib/menu-image-display'
import {
  menuPdfApiUrl,
  menuPdfEmbedUrl,
  menuPdfPreviewSrcSet,
  type MenuDayVariant,
} from '@/lib/menu-pdf'
import {
  menuDishesSource,
  menuServedVariant,
  menuShowEnFallback,
} from '@/lib/menu-viewer-derived'
import type { MenuPdfViewerStateProps } from '@/lib/menu-viewer-types'
import { pulseUiHaptic } from '@/lib/ui-haptic'

type UseMenuViewerStateInput = Pick<
  MenuPdfViewerStateProps,
  | 'defaultVariant'
  | 'hasEnglish'
  | 'kindByVariant'
  | 'labels'
  | 'revisionByVariant'
  | 'dishesByVariant'
  | 'fullscreenByVariant'
  | 'reserveByVariant'
>

/** Choix utilisateur valable tant que la locale serveur (`defaultVariant`) ne change pas. */
type VariantChoice = { base: MenuDayVariant; variant: MenuDayVariant }

export function useMenuViewerState({
  defaultVariant,
  hasEnglish,
  kindByVariant,
  labels,
  revisionByVariant,
  dishesByVariant,
  fullscreenByVariant,
  reserveByVariant,
}: UseMenuViewerStateInput) {
  const [choice, setChoice] = useState<VariantChoice | null>(null)
  const [fullscreen, setFullscreen] = useState(false)

  const variant = choice?.base === defaultVariant ? choice.variant : defaultVariant
  const showEnFallback = menuShowEnFallback(variant, hasEnglish)
  const servedVariant = menuServedVariant(variant, hasEnglish)
  const servedRevision = revisionByVariant[servedVariant]
  const displayKind = kindByVariant[servedVariant]
  const label = labels[servedVariant]
  const fullscreenUi = fullscreenByVariant[servedVariant]
  const reserveLabel = reserveByVariant[servedVariant]

  const url = menuPdfApiUrl(servedVariant, { revision: servedRevision })
  const embedUrl = menuPdfEmbedUrl(servedVariant, servedRevision)
  const previewImageUrl = menuPdfApiUrl(servedVariant, {
    maxWidth: MENU_IMAGE_LCP_WIDTH,
    revision: servedRevision,
  })
  const previewSrcSet = menuPdfPreviewSrcSet(
    servedVariant,
    MENU_IMAGE_PREVIEW_WIDTHS,
    servedRevision,
  )

  const dishesSource = menuDishesSource(dishesByVariant, servedVariant)
  const dishesLines = useMemo(
    () => parseMenuDishLines(dishesSource.text, dishesSource.variant),
    [dishesSource.text, dishesSource.variant],
  )
  const dishesId = dishesLines.length > 0 ? 'menu-du-jour-plats' : undefined
  const mediaKey = `${servedVariant}-${servedRevision ?? 'default'}-${displayKind}`

  const openFullscreen = useCallback(() => {
    pulseUiHaptic()
    setFullscreen(true)
  }, [])

  const closeFullscreen = useCallback(() => setFullscreen(false), [])

  const toggleMenuLang = useCallback(() => {
    pulseUiHaptic()
    setChoice({ base: defaultVariant, variant: variant === 'fr' ? 'en' : 'fr' })
  }, [defaultVariant, variant])

  return {
    variant,
    showEnFallback,
    servedVariant,
    servedRevision,
    displayKind,
    label,
    url,
    embedUrl,
    previewImageUrl,
    previewSrcSet,
    lightboxUrl: displayKind === 'image' ? url : embedUrl,
    previewAriaLabel: `${label} — ${fullscreenUi.open}`,
    dishesLang: dishesSource.variant,
    dishesLines,
    dishesId,
    fullscreen,
    fullscreenUi,
    reserveLabel,
    openFullscreen,
    closeFullscreen,
    toggleMenuLang,
    mediaKey,
  }
}
