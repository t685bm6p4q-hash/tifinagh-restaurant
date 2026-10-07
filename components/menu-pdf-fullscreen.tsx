'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import type { MenuMediaKind } from '@/lib/menu-pdf'

type MenuPdfFullscreenProps = {
  url: string
  label: string
  displayKind: MenuMediaKind
  closeLabel: string
  reserveLabel: string
  onClose: () => void
}

function IconClose() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 6 6 18M6 6l12 12"
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
  closeLabel,
  reserveLabel,
  onClose,
}: MenuPdfFullscreenProps) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="menu-pdf-fullscreen"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
    >
      <button
        type="button"
        className="menu-pdf-fullscreen-close"
        onClick={onClose}
        aria-label={closeLabel}
      >
        <IconClose />
      </button>
      <div
        className="menu-pdf-fullscreen-body"
        onClick={(event) => event.stopPropagation()}
      >
        {displayKind === 'image' ? (
          <img
            className="menu-pdf-fullscreen-media menu-pdf-fullscreen-media--image"
            src={url}
            alt={label}
            decoding="async"
          />
        ) : (
          <iframe className="menu-pdf-fullscreen-media" src={url} title={label} />
        )}
      </div>
      <div
        className="menu-pdf-fullscreen-reserve"
        onClick={(event) => event.stopPropagation()}
      >
        <Link className="button button-primary" href="/reservation" prefetch={false}>
          {reserveLabel}
        </Link>
      </div>
    </div>
  )
}
