import {
  MENU_IMAGE_LAYOUT_HEIGHT,
  MENU_IMAGE_LAYOUT_WIDTH,
  MENU_IMAGE_SIZES,
} from '@/lib/menu-image-display'
import type { MenuViewerInitialSnapshot } from '@/lib/menu-viewer-initial-snapshot'

/** Image / iframe LCP rendus côté serveur (hors bundle client). */
export function MenuMediaPreviewServer({
  snapshot,
}: {
  snapshot: MenuViewerInitialSnapshot
}) {
  if (snapshot.displayKind === 'pdf') {
    return (
      <div
        className="menu-pdf-viewer-wrap menu-pdf-viewer-wrap--pdf"
        data-menu-ssr-preview
      >
        <iframe
          className="menu-pdf-viewer menu-pdf-viewer--embed"
          src={snapshot.embedUrl}
          title={snapshot.label}
        />
      </div>
    )
  }

  return (
    <div className="menu-pdf-viewer-wrap" data-menu-ssr-preview>
      <img
        className="menu-pdf-viewer menu-pdf-viewer--image"
        src={snapshot.previewImageUrl}
        srcSet={snapshot.previewSrcSet}
        alt={snapshot.label}
        width={MENU_IMAGE_LAYOUT_WIDTH}
        height={MENU_IMAGE_LAYOUT_HEIGHT}
        sizes={MENU_IMAGE_SIZES}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  )
}
