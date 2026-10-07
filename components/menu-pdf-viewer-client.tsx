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
import { MenuShareButton } from '@/components/menu-share-button'
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

function IconMaximize({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
  fullscreenByVariant: Record<
    MenuDayVariant,
    { open: string; short: string; back: string }
  >
  reserveByVariant: Record<MenuDayVariant, string>
  share: {
    label: string
    copiedLabel: string
    shareTitle: string
    shareText: string
  }
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
  fullscreenByVariant,
  reserveByVariant,
  share,
}: MenuPdfViewerClientProps) {
  const [variant, setVariant] = useState<MenuDayVariant>(defaultVariant)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    setVariant(defaultVariant)
  }, [defaultVariant])

  const showEnFallback = variant === 'en' && !hasEnglish
  const servedVariant: MenuDayVariant = showEnFallback ? 'fr' : variant
  const menuUiVariant: MenuDayVariant = showEnFallback ? 'fr' : variant
  const fullscreenUi = fullscreenByVariant[menuUiVariant]
  const reserveLabel = reserveByVariant[menuUiVariant]
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

  const dishesSource = useMemo(() => {
    const fr = dishesByVariant.fr.trim()
    const en = dishesByVariant.en.trim()
    if (servedVariant === 'en' && en) return { text: en, variant: 'en' as MenuDayVariant }
    if (fr) return { text: fr, variant: 'fr' as MenuDayVariant }
    if (en) return { text: en, variant: 'en' as MenuDayVariant }
    return { text: '', variant: servedVariant }
  }, [dishesByVariant, servedVariant])

  const dishesVariant = dishesSource.variant
  const dishesLines = useMemo(
    () => parseMenuDishLines(dishesSource.text, dishesSource.variant),
    [dishesSource],
  )
  const dishesId = dishesLines.length > 0 ? 'menu-du-jour-plats' : undefined
  const dishesDetailsRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    setDisplayKind(serverKind)
  }, [serverKind, servedVariant, servedRevision])

  useEffect(() => {
    const details = dishesDetailsRef.current
    if (!details || !dishesId) return
    details.open = !window.matchMedia('(min-width: 901px)').matches
  }, [dishesId])

  const openFullscreen = useCallback(() => {
    pulseUiHaptic()
    setFullscreen(true)
  }, [])

  const close = useCallback(() => setFullscreen(false), [])

  const toggleMenuLang = useCallback(() => {
    pulseUiHaptic()
    setVariant((v) => (v === 'fr' ? 'en' : 'fr'))
  }, [])

  const onImageError = useCallback(() => {
    if (serverKind === 'pdf') {
      setDisplayKind('pdf')
    }
  }, [serverKind])

  const previewAriaLabel = `${label} — ${fullscreenUi.open}`

  const floatingFullscreen = (
    <div className="menu-pdf-float-actions">
      <button
        type="button"
        className="menu-pdf-preview-badge menu-pdf-preview-badge--lightbox"
        onClick={(event) => {
          event.stopPropagation()
          openFullscreen()
        }}
        aria-label={fullscreenUi.open}
      >
        <IconMaximize size={18} />
        <span className="menu-pdf-preview-badge__text">{fullscreenUi.short}</span>
      </button>
      {displayKind === 'pdf' ? (
        <a
          className="menu-pdf-preview-badge menu-pdf-preview-badge--native"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={fullscreenUi.open}
        >
          <IconMaximize size={18} />
          <span className="menu-pdf-preview-badge__text">{fullscreenUi.short}</span>
        </a>
      ) : null}
    </div>
  )

  const pdfEmbed = (
    <iframe
      className="menu-pdf-viewer menu-pdf-viewer--embed"
      src={embedUrl}
      title={label}
    />
  )

  const imagePreview = (
    <button
      type="button"
      className="menu-pdf-preview-trigger"
      onClick={openFullscreen}
      aria-label={previewAriaLabel}
      aria-describedby={dishesId}
    >
      <img
        key={`${servedVariant}-${servedRevision ?? 'default'}`}
        className="menu-pdf-viewer menu-pdf-viewer--image"
        src={previewImageUrl}
        srcSet={previewSrcSet}
        alt=""
        width={MENU_IMAGE_LAYOUT_WIDTH}
        height={MENU_IMAGE_LAYOUT_HEIGHT}
        sizes={MENU_IMAGE_SIZES}
        decoding="async"
        fetchPriority="high"
        onError={onImageError}
      />
    </button>
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

      <div
        className={`menu-pdf-viewer-wrap${displayKind === 'pdf' ? ' menu-pdf-viewer-wrap--pdf' : ''}`}
      >
        {displayKind === 'pdf' ? pdfEmbed : imagePreview}
        {floatingFullscreen}
      </div>

      {dishesId ? (
        <details
          ref={dishesDetailsRef}
          className="menu-dishes"
          id={dishesId}
          lang={dishesVariant}
        >
          <summary className="menu-dishes__summary">{MENU_DISHES_HEADING[dishesVariant]}</summary>
          <div className="menu-dishes__body">
            <MenuDishesCard lines={dishesLines} />
          </div>
        </details>
      ) : null}

      <MenuShareButton
        label={share.label}
        copiedLabel={share.copiedLabel}
        shareTitle={share.shareTitle}
        shareText={share.shareText}
      />

      {fullscreen ? (
        <MenuPdfFullscreen
          url={displayKind === 'image' ? url : embedUrl}
          label={label}
          displayKind={displayKind}
          closeLabel={fullscreenUi.back}
          reserveLabel={reserveLabel}
          onClose={close}
        />
      ) : null}
    </>
  )
}
