'use client'

import { ArrowLeft, Maximize2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { menuPdfApiUrl, type MenuDayVariant, type MenuMediaKind } from '@/lib/menu-pdf'

const DOUBLE_TAP_MS = 320

function pulseMenuLangHaptic() {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  navigator.vibrate?.(14)
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
  fullscreenOpenLabel: string
  fullscreenBackLabel: string
}

export function MenuPdfViewerClient({
  defaultVariant,
  hasEnglish,
  kindByVariant,
  labels,
  langToggleFr,
  langToggleEn,
  enFallbackNote,
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
  const url = useMemo(() => menuPdfApiUrl(servedVariant), [servedVariant])
  const serverKind = kindByVariant[servedVariant]
  const [displayKind, setDisplayKind] = useState<MenuMediaKind>(serverKind)
  const label = labels[servedVariant]

  useEffect(() => {
    setDisplayKind(serverKind)
  }, [serverKind])

  useEffect(() => {
    let cancelled = false
    fetch(url, { method: 'HEAD', cache: 'no-store' })
      .then((response) => {
        if (cancelled || !response.ok) return
        const contentType = response.headers.get('content-type') ?? ''
        setDisplayKind(contentType.startsWith('image/') ? 'image' : 'pdf')
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [url])

  const openFullscreen = useCallback(() => setFullscreen(true), [])
  const close = useCallback(() => setFullscreen(false), [])

  const onPreviewActivate = useCallback(() => {
    openFullscreen()
  }, [openFullscreen])

  const toggleMenuLang = useCallback(() => {
    pulseMenuLangHaptic()
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

  const media =
    displayKind === 'image' ? (
      <img
        className="menu-pdf-viewer menu-pdf-viewer--image"
        src={url}
        alt={label}
        decoding="async"
        fetchPriority="high"
        onDoubleClick={onPreviewActivate}
        onTouchEnd={onPreviewTouchEnd}
        onError={() => setDisplayKind('pdf')}
      />
    ) : (
      <iframe className="menu-pdf-viewer" src={url} title={label} />
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
        onDoubleClick={displayKind === 'pdf' ? onPreviewActivate : undefined}
        onTouchEnd={displayKind === 'pdf' ? onPreviewTouchEnd : undefined}
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
