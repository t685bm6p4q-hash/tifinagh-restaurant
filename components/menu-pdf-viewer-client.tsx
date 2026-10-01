'use client'

import type { ReactNode } from 'react'
import { ArrowLeft, Maximize2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  MENU_IMAGE_LAYOUT_HEIGHT,
  MENU_IMAGE_LAYOUT_WIDTH,
  MENU_IMAGE_LCP_WIDTH,
  MENU_IMAGE_PREVIEW_WIDTHS,
  MENU_IMAGE_SIZES,
} from '@/lib/menu-image-display'
import { menuPdfApiUrl, menuPdfPreviewSrcSet, type MenuDayVariant, type MenuMediaKind } from '@/lib/menu-pdf'
import { pulseUiHaptic } from '@/lib/ui-haptic'

const DOUBLE_TAP_MS = 320

type MenuPdfViewerClientProps = {
  defaultVariant: MenuDayVariant
  lcpPreview: ReactNode
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
  fullscreenOpenLabel: string
  fullscreenBackLabel: string
}

export function MenuPdfViewerClient({
  defaultVariant,
  lcpPreview,
  hasEnglish,
  kindByVariant,
  labels,
  langToggleFr,
  langToggleEn,
  enFallbackNote,
  revisionByVariant,
  fullscreenOpenLabel,
  fullscreenBackLabel,
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

  useEffect(() => {
    setDisplayKind(serverKind)
  }, [serverKind])

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

  useEffect(() => {
    if (!fullscreen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [fullscreen, close])

  const useServerLcpImage =
    displayKind === 'image' && servedVariant === defaultVariant && !showEnFallback

  const media =
    displayKind === 'image' ? (
      useServerLcpImage ? (
        lcpPreview
      ) : (
        <img
          key={servedRevision ?? servedVariant}
          className="menu-pdf-viewer menu-pdf-viewer--image"
          src={previewImageUrl}
          srcSet={previewSrcSet}
          alt={label}
          width={MENU_IMAGE_LAYOUT_WIDTH}
          height={MENU_IMAGE_LAYOUT_HEIGHT}
          sizes={MENU_IMAGE_SIZES}
          decoding="async"
          fetchPriority="high"
          onDoubleClick={onPreviewActivate}
          onTouchEnd={onPreviewTouchEnd}
          onError={() => setDisplayKind('pdf')}
        />
      )
    ) : (
      <>
        <a className="menu-pdf-mobile-open" href={url} target="_blank" rel="noopener noreferrer">
          {fullscreenOpenLabel}
        </a>
        <iframe className="menu-pdf-viewer menu-pdf-viewer--embed" src={url} title={label} />
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

      <div
        className="menu-pdf-viewer-wrap"
        onDoubleClick={displayKind !== 'pdf' && !useServerLcpImage ? undefined : onPreviewActivate}
        onTouchEnd={displayKind !== 'pdf' && !useServerLcpImage ? undefined : onPreviewTouchEnd}
        title={fullscreenOpenLabel}
      >
        {media}
        <div className="menu-pdf-viewer-actions">
          <button type="button" className="button menu-pdf-fullscreen-open" onClick={openFullscreen}>
            <Maximize2 size={18} strokeWidth={2.25} aria-hidden="true" />
            {fullscreenOpenLabel}
          </button>
        </div>
      </div>

      {fullscreen ? (
        <div
          className="menu-pdf-fullscreen"
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <button type="button" className="button menu-pdf-fullscreen-back" onClick={close}>
            <ArrowLeft size={18} strokeWidth={2.25} aria-hidden="true" />
            {fullscreenBackLabel}
          </button>
          <div className="menu-pdf-fullscreen-body">
            {displayKind === 'image' ? (
              <img className="menu-pdf-fullscreen-media" src={url} alt={label} decoding="async" />
            ) : (
              <iframe className="menu-pdf-fullscreen-media" src={url} title={label} />
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
