'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  MENU_IMAGE_LCP_WIDTH,
  MENU_IMAGE_PREVIEW_WIDTHS,
} from '@/lib/menu-image-display'
import {
  menuDishesSource,
  menuShowEnFallback,
  menuServedVariant,
} from '@/lib/menu-viewer-derived'
import type { MenuPdfViewerClientProps } from '@/lib/menu-viewer-types'
import {
  menuPdfApiUrl,
  menuPdfEmbedUrl,
  menuPdfPreviewSrcSet,
  type MenuDayVariant,
  type MenuMediaKind,
} from '@/lib/menu-pdf'
import {
  parseMenuDishLines,
} from '@/lib/menu-dishes-format'

type UseMenuViewerStateInput = Pick<
  MenuPdfViewerClientProps,
  | 'defaultVariant'
  | 'hasEnglish'
  | 'kindByVariant'
  | 'labels'
  | 'revisionByVariant'
  | 'dishesByVariant'
  | 'fullscreenByVariant'
  | 'reserveByVariant'
>

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
  const [variant, setVariant] = useState<MenuDayVariant>(defaultVariant)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    setVariant(defaultVariant)
  }, [defaultVariant])

  const showEnFallback = menuShowEnFallback(variant, hasEnglish)
  const servedVariant = menuServedVariant(variant, hasEnglish)
  const uiVariant = servedVariant
  const fullscreenUi = fullscreenByVariant[uiVariant]
  const reserveLabel = reserveByVariant[uiVariant]
  const servedRevision = revisionByVariant[servedVariant]
  const serverKind = kindByVariant[servedVariant]
  const label = labels[servedVariant]

  const [displayKind, setDisplayKind] = useState<MenuMediaKind>(serverKind)

  useEffect(() => {
    setDisplayKind(serverKind)
  }, [serverKind, servedVariant, servedRevision])

  const url = useMemo(
    () => menuPdfApiUrl(servedVariant, { revision: servedRevision }),
    [servedVariant, servedRevision],
  )
  const embedUrl = useMemo(
    () => menuPdfEmbedUrl(servedVariant, servedRevision),
    [servedVariant, servedRevision],
  )
  const previewImageUrl = useMemo(
    () =>
      menuPdfApiUrl(servedVariant, {
        maxWidth: MENU_IMAGE_LCP_WIDTH,
        revision: servedRevision,
      }),
    [servedVariant, servedRevision],
  )
  const previewSrcSet = useMemo(
    () => menuPdfPreviewSrcSet(servedVariant, MENU_IMAGE_PREVIEW_WIDTHS, servedRevision),
    [servedVariant, servedRevision],
  )

  const dishesSource = useMemo(
    () => menuDishesSource(dishesByVariant, servedVariant),
    [dishesByVariant, servedVariant],
  )
  const dishesLines = useMemo(
    () => parseMenuDishLines(dishesSource.text, dishesSource.variant),
    [dishesSource],
  )
  const dishesId = dishesLines.length > 0 ? 'menu-du-jour-plats' : undefined

  const openFullscreen = useCallback(() => {
    setFullscreen(true)
  }, [])
  const closeFullscreen = useCallback(() => setFullscreen(false), [])

  const toggleMenuLang = useCallback(() => {
    setVariant((current) => (current === 'fr' ? 'en' : 'fr'))
  }, [])

  const onImageError = useCallback(() => {
    if (serverKind === 'pdf') {
      setDisplayKind('pdf')
    }
  }, [serverKind])

  const lightboxUrl = displayKind === 'image' ? url : embedUrl
  const previewAriaLabel = `${label} — ${fullscreenUi.open}`

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
    dishesSource,
    dishesLines,
    dishesId,
    fullscreen,
    fullscreenUi,
    reserveLabel,
    openFullscreen,
    closeFullscreen,
    toggleMenuLang,
    onImageError,
    lightboxUrl,
    previewAriaLabel,
  }
}
