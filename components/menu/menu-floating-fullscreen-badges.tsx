'use client'

import type { MouseEvent } from 'react'
import { MaximizeIcon } from '@/components/icons'
import type { MenuMediaKind } from '@/lib/menu-pdf'
import type { MenuFullscreenLabels } from '@/lib/menu-viewer-types'

type MenuFloatingFullscreenBadgesProps = {
  displayKind: MenuMediaKind
  pdfDownloadUrl: string
  labels: MenuFullscreenLabels
  onOpenLightbox: () => void
}

export function MenuFloatingFullscreenBadges({
  displayKind,
  pdfDownloadUrl,
  labels,
  onOpenLightbox,
}: MenuFloatingFullscreenBadgesProps) {
  const openLightbox = (event: MouseEvent) => {
    event.stopPropagation()
    onOpenLightbox()
  }

  return (
    <div className="menu-pdf-float-actions">
      <button
        type="button"
        className="menu-pdf-preview-badge menu-pdf-preview-badge--lightbox"
        onClick={openLightbox}
        aria-label={labels.open}
      >
        <MaximizeIcon size={18} />
        <span className="menu-pdf-preview-badge__text">{labels.short}</span>
      </button>
      {displayKind === 'pdf' ? (
        <a
          className="menu-pdf-preview-badge menu-pdf-preview-badge--native"
          href={pdfDownloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.open}
        >
          <MaximizeIcon size={18} />
          <span className="menu-pdf-preview-badge__text">{labels.short}</span>
        </a>
      ) : null}
    </div>
  )
}
