'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { menuPdfApiUrl, type MenuDayVariant, type MenuMediaKind } from '@/lib/menu-pdf'

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
  fullscreenCloseLabel: string
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
  fullscreenCloseLabel,
}: MenuPdfViewerClientProps) {
  const [variant, setVariant] = useState<MenuDayVariant>(defaultVariant)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    setVariant(defaultVariant)
  }, [defaultVariant])

  const showEnFallback = variant === 'en' && !hasEnglish
  const servedVariant: MenuDayVariant = showEnFallback ? 'fr' : variant
  const url = useMemo(() => menuPdfApiUrl(servedVariant), [servedVariant])
  const kind = kindByVariant[servedVariant]
  const label = labels[servedVariant]

  const close = useCallback(() => setFullscreen(false), [])

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
    kind === 'image' ? (
      <img
        className="menu-pdf-viewer menu-pdf-viewer--image"
        src={url}
        alt={label}
        decoding="async"
        fetchPriority="high"
      />
    ) : (
      <iframe className="menu-pdf-viewer" src={url} title={label} />
    )

  return (
    <>
      <div className="menu-lang-toggle" role="group" aria-label={langToggleFr}>
        <button
          type="button"
          className={`menu-lang-toggle__btn${variant === 'fr' ? ' menu-lang-toggle__btn--active' : ''}`}
          aria-pressed={variant === 'fr'}
          onClick={() => setVariant('fr')}
        >
          {langToggleFr}
        </button>
        <button
          type="button"
          className={`menu-lang-toggle__btn${variant === 'en' ? ' menu-lang-toggle__btn--active' : ''}`}
          aria-pressed={variant === 'en'}
          onClick={() => setVariant('en')}
        >
          {langToggleEn}
        </button>
      </div>

      {showEnFallback ? (
        <p className="menu-lang-fallback" role="status">{enFallbackNote}</p>
      ) : null}

      <div className="menu-pdf-viewer-wrap">
        {media}
        <p className="menu-pdf-viewer-fallback">
          <button
            type="button"
            className="menu-pdf-fullscreen-trigger"
            onClick={() => setFullscreen(true)}
          >
            {fullscreenOpenLabel}
          </button>
        </p>
      </div>

      {fullscreen ? (
        <div
          className="menu-pdf-fullscreen"
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <button type="button" className="menu-pdf-fullscreen-close" onClick={close}>
            ← {fullscreenCloseLabel}
          </button>
          <div className="menu-pdf-fullscreen-body">
            {kind === 'image' ? (
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
