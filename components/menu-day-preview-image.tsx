import {
  MENU_IMAGE_LAYOUT_HEIGHT,
  MENU_IMAGE_LAYOUT_WIDTH,
  MENU_IMAGE_LCP_WIDTH,
  MENU_IMAGE_PREVIEW_WIDTHS,
  MENU_IMAGE_SIZES,
} from '@/lib/menu-image-display'
import { menuPdfApiUrl, menuPdfPreviewSrcSet, type MenuDayVariant } from '@/lib/menu-pdf'

type MenuDayPreviewImageProps = {
  variant: MenuDayVariant
  alt: string
  revision?: string | null
}

/** Image LCP menu du jour — rendue côté serveur dans le HTML initial. */
export function MenuDayPreviewImage({ variant, alt, revision }: MenuDayPreviewImageProps) {
  return (
    <img
      key={revision ?? variant}
      className="menu-pdf-viewer menu-pdf-viewer--image"
      src={menuPdfApiUrl(variant, { maxWidth: MENU_IMAGE_LCP_WIDTH, revision })}
      srcSet={menuPdfPreviewSrcSet(variant, MENU_IMAGE_PREVIEW_WIDTHS, revision)}
      alt={alt}
      width={MENU_IMAGE_LAYOUT_WIDTH}
      height={MENU_IMAGE_LAYOUT_HEIGHT}
      sizes={MENU_IMAGE_SIZES}
      decoding="async"
      fetchPriority="high"
    />
  )
}
