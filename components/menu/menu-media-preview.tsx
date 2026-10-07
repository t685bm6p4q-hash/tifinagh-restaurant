'use client'

import { MenuFloatingFullscreenBadges } from '@/components/menu/menu-floating-fullscreen-badges'
import {
  MENU_IMAGE_LAYOUT_HEIGHT,
  MENU_IMAGE_LAYOUT_WIDTH,
  MENU_IMAGE_SIZES,
} from '@/lib/menu-image-display'
import type { MenuDayVariant, MenuMediaKind } from '@/lib/menu-pdf'
import type { MenuFullscreenLabels } from '@/lib/menu-viewer-types'

type MenuMediaPreviewProps = {
  displayKind: MenuMediaKind
  label: string
  embedUrl: string
  previewImageUrl: string
  previewSrcSet: string
  pdfDownloadUrl: string
  servedVariant: MenuDayVariant
  servedRevision: string | null
  dishesDescribedBy?: string
  previewAriaLabel: string
  fullscreenLabels: MenuFullscreenLabels
  onOpenLightbox: () => void
}

export function MenuMediaPreview({
  displayKind,
  label,
  embedUrl,
  previewImageUrl,
  previewSrcSet,
  pdfDownloadUrl,
  servedVariant,
  servedRevision,
  dishesDescribedBy,
  previewAriaLabel,
  fullscreenLabels,
  onOpenLightbox,
}: MenuMediaPreviewProps) {
  return (
    <div
      className={`menu-pdf-viewer-wrap${displayKind === 'pdf' ? ' menu-pdf-viewer-wrap--pdf' : ''}`}
    >
      {displayKind === 'pdf' ? (
        <iframe
          className="menu-pdf-viewer menu-pdf-viewer--embed"
          src={embedUrl}
          title={label}
        />
      ) : (
        <button
          type="button"
          className="menu-pdf-preview-trigger"
          onClick={onOpenLightbox}
          aria-label={previewAriaLabel}
          aria-describedby={dishesDescribedBy}
        >
          <img
            key={`${servedVariant}-${servedRevision ?? 'default'}`}
            className="menu-pdf-viewer menu-pdf-viewer--image"
            src={previewImageUrl}
            srcSet={previewSrcSet}
            alt={label}
            width={MENU_IMAGE_LAYOUT_WIDTH}
            height={MENU_IMAGE_LAYOUT_HEIGHT}
            sizes={MENU_IMAGE_SIZES}
            decoding="async"
            fetchPriority="high"
          />
        </button>
      )}
      <MenuFloatingFullscreenBadges
        displayKind={displayKind}
        pdfDownloadUrl={pdfDownloadUrl}
        labels={fullscreenLabels}
        onOpenLightbox={onOpenLightbox}
      />
    </div>
  )
}
