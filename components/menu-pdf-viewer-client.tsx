'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  MENU_IMAGE_LAYOUT_HEIGHT,
  MENU_IMAGE_LAYOUT_WIDTH,
  MENU_IMAGE_LCP_WIDTH,
  MENU_IMAGE_PREVIEW_WIDTHS,
  MENU_IMAGE_SIZES,
} from '@/lib/menu-image-display'
import {
  menuPdfApiUrl,
  menuPdfEmbedUrl,
  menuPdfPreviewSrcSet,
  type MenuDayVariant,
  type MenuMediaKind,
} from '@/lib/menu-pdf'
import { MenuDishesCard } from '@/components/menu-dishes-card'
import {
  MENU_DISHES_HEADING,
  parseMenuDishLines,
  type MenuDishesTexts,
} from '@/lib/menu-dishes-format'
import { pulseUiHaptic } from '@/lib/ui-haptic'

const MenuPdfFullscreen = dynamic(
  () => import('@/components/menu-pdf-fullscreen').then((m) => m.MenuPdfFullscreen),
  { ssr: false },
)

const DOUBLE_TAP_MS = 320

function IconMaximize() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type MenuPdfViewerClientProps = {
  defaultVariant: MenuDayVariant
  hasEnglish: boolean
  kindByVariant: { fr: MenuMediaKind; en: MenuMediaKind }
  labels: {
    fr: string
    en: string
  }
  langToggleFr: string
  langToggleEn: string
  enFallbackNote: string
  revisionByVariant: { fr: string | null; en: string | null }
  dishesByVariant: MenuDishesTexts
  fullscreenOpenLabel: string
  fullscreenBackLabel: string
  reserveLabel: string
}

export function MenuPdfViewerClient({
  defaultVariant,
  hasEnglish,
  kindByVariant,
  labels,
  langToggleFr,
  langToggleEn,
  enFallbackNote,
  revisionByVariant,
  dishesByVariant,
  fullscreenOpenLabel,
  fullscreenBackLabel,
  reserveLabel,
}: MenuPdfViewerClientProps) {
  const [variant, setVariant] = useState<MenuDayVariant>(defaultVariant)
  const [fullscreen, setFullscreen] = useState(false)
  const lastTapAtRef = useRef(0)

  useEffect(() => {
    setVariant(defaultVariant)
  }, [defaultVariant])

  const showEnFallback = variant === 'en' && !hasEnglish
  const servedVariant: MenuDayVariant = showEnFallback ? 'fr' : variant
  const servedRevision = revisionByVariant[servedVariant]
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
  const serverKind = kindByVariant[servedVariant]
  const [displayKind, setDisplayKind] = useState<MenuMediaKind>(serverKind)
  const label = labels[servedVariant]

  const dishesVariant: MenuDayVariant =
    dishesByVariant[servedVariant] ? servedVariant : 'fr'
  const dishesLines = useMemo(
    () => parseMenuDishLines(dishesByVariant[dishesVariant]),
    [dishesByVariant, dishesVariant],
  )
  const dishesId = dishesLines.length > 0 ? 'menu-du-jour-plats' : undefined

  useEffect(() => {
    setDisplayKind(serverKind)
  }, [serverKind, servedVariant, servedRevision])

  const openFullscreen = useCallback(() => setFullscreen(true), [])
  const close = useCallback(() => setFullscreen(false), [])

  const onPreviewActivate = useCallback(() => {
    openFullscreen()
  }, [openFullscreen])

  const toggleMenuLang = useCallback(() => {
    pulseUiHaptic()
    setVariant((v) => (v === 'fr' ? 'en' : 'fr'))
  }, [])

  const onPreviewTouchEnd = useCallback(() => {
    const now = Date.now()
    if (now - lastTapAtRef.current <= DOUBLE_TAP_MS) {
      lastTapAtRef.current = 0
      openFullscreen()
      return
    }
    lastTapAtRef.current = now
  }, [openFullscreen])

  const onImageError = useCallback(() => {
    // Ne pas basculer en iframe PDF : un PNG/WebP ne doit pas s’afficher dans une iframe.
    if (serverKind === 'pdf') {
      setDisplayKind('pdf')
    }
  }, [serverKind])

  const media =
    displayKind === 'image' ? (
      <img
        key={`${servedVariant}-${servedRevision ?? 'default'}`}
        className="menu-pdf-viewer menu-pdf-viewer--image"
        src={previewImageUrl}
        srcSet={previewSrcSet}
        alt={label}
        aria-describedby={dishesId}
        width={MENU_IMAGE_LAYOUT_WIDTH}
        height={MENU_IMAGE_LAYOUT_HEIGHT}
        sizes={MENU_IMAGE_SIZES}
        decoding="async"
        fetchPriority="high"
        onDoubleClick={onPreviewActivate}
        onTouchEnd={onPreviewTouchEnd}
        onError={onImageError}
      />
    ) : (
      <>
        <a className="menu-pdf-mobile-open" href={url} target="_blank" rel="noopener noreferrer">
          {fullscreenOpenLabel}
        </a>
        <iframe className="menu-pdf-viewer menu-pdf-viewer--embed" src={embedUrl} title={label} />
      </>
    )

  return (
    <>
      <div className="menu-lang-toggle">
        <button
          type="button"
          className="menu-lang-switch"
          role="switch"
          aria-checked={variant === 'en'}
          aria-label={
            variant === 'fr'
              ? `${langToggleFr} — activer ${langToggleEn}`
              : `${langToggleEn} — activer ${langToggleFr}`
          }
          onClick={toggleMenuLang}
        >
          <span className="menu-lang-switch__panel" data-variant={variant}>
            <span className="menu-lang-switch__thumb" aria-hidden="true" />
            <span
              className={`menu-lang-switch__label${variant === 'fr' ? ' menu-lang-switch__label--on' : ''}`}
            >
              {langToggleFr}
            </span>
            <span
              className={`menu-lang-switch__label${variant === 'en' ? ' menu-lang-switch__label--on' : ''}`}
            >
              {langToggleEn}
            </span>
          </span>
        </button>
      </div>

      {showEnFallback ? (
        <p className="menu-lang-fallback" role="status">{enFallbackNote}</p>
      ) : null}

      <div className="menu-pdf-viewer-wrap" title={fullscreenOpenLabel}>
        {media}
        <div className="menu-pdf-viewer-actions">
          <button type="button" className="button menu-pdf-fullscreen-open" onClick={openFullscreen}>
            <IconMaximize />
            {fullscreenOpenLabel}
          </button>
        </div>
      </div>

      {dishesId ? (
        <details className="menu-dishes" id={dishesId} lang={dishesVariant}>
          <summary className="menu-dishes__summary">{MENU_DISHES_HEADING[dishesVariant]}</summary>
          <div className="menu-dishes__body">
            <MenuDishesCard lines={dishesLines} />
          </div>
        </details>
      ) : null}

      {fullscreen ? (
        <MenuPdfFullscreen
          url={displayKind === 'image' ? url : embedUrl}
          label={label}
          displayKind={displayKind}
          fullscreenBackLabel={fullscreenBackLabel}
          reserveLabel={reserveLabel}
          onClose={close}
        />
      ) : null}
    </>
  )
}
