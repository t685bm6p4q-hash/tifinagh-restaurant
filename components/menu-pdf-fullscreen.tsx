'use client'

import { useEffect } from 'react'
import type { MenuMediaKind } from '@/lib/menu-pdf'

type MenuPdfFullscreenProps = {
  url: string
  label: string
  displayKind: MenuMediaKind
  fullscreenBackLabel: string
  onClose: () => void
}

function IconArrowLeft() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 12H5M5 12l7 7M5 12l7-7"
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MenuPdfFullscreen({
  url,
  label,
  displayKind,
  fullscreenBackLabel,
  onClose,
}: MenuPdfFullscreenProps) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="menu-pdf-fullscreen" role="dialog" aria-modal="true" aria-label={label}>
      <button type="button" className="button menu-pdf-fullscreen-back" onClick={onClose}>
        <IconArrowLeft />
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
  )
}
