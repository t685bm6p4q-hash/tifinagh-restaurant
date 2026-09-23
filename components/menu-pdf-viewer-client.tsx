'use client'

import { useCallback, useEffect, useState } from 'react'
import type { MenuMediaKind } from '@/lib/menu-pdf'

type MenuPdfViewerClientProps = {
  kind: MenuMediaKind
  url: string
  label: string
  fullscreenOpenLabel: string
  fullscreenCloseLabel: string
}

export function MenuPdfViewerClient({
  kind,
  url,
  label,
  fullscreenOpenLabel,
  fullscreenCloseLabel,
}: MenuPdfViewerClientProps) {
  const [fullscreen, setFullscreen] = useState(false)

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

  const preview =
    kind === 'image' ? (
      <img
        className="menu-pdf-viewer menu-pdf-viewer--image"
        src={url}
        alt={label}
      />
    ) : (
      <iframe className="menu-pdf-viewer" src={url} title={label} />
    )

  return (
    <>
      <div className="menu-pdf-viewer-wrap">
        {preview}
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
          <button
            type="button"
            className="menu-pdf-fullscreen-close"
            onClick={close}
          >
            ← {fullscreenCloseLabel}
          </button>
          <div className="menu-pdf-fullscreen-body">
            {kind === 'image' ? (
              <img className="menu-pdf-fullscreen-media" src={url} alt={label} />
            ) : (
              <iframe className="menu-pdf-fullscreen-media" src={url} title={label} />
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
