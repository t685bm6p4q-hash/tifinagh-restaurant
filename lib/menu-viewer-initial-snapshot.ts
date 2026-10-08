import {
  MENU_IMAGE_LAYOUT_HEIGHT,
  MENU_IMAGE_LAYOUT_WIDTH,
  MENU_IMAGE_LCP_WIDTH,
  MENU_IMAGE_PREVIEW_WIDTHS,
  MENU_IMAGE_SIZES,
} from '@/lib/menu-image-display'
import {
  menuDuJourAlt,
  menuPdfApiUrl,
  menuPdfEmbedUrl,
  menuPdfPreviewSrcSet,
  type MenuDayVariant,
  type MenuMediaKind,
} from '@/lib/menu-pdf'
import { menuServedVariant } from '@/lib/menu-viewer-derived'
import type { MenuPdfViewerContext } from '@/lib/menu-pdf-viewer-context'

export type MenuViewerInitialSnapshot = {
  key: string
  servedVariant: MenuDayVariant
  servedRevision: string | null
  displayKind: MenuMediaKind
  label: string
  embedUrl: string
  previewImageUrl: string
  previewSrcSet: string
  pdfDownloadUrl: string
}

export function buildMenuViewerInitialSnapshot(
  ctx: MenuPdfViewerContext,
): MenuViewerInitialSnapshot {
  const servedVariant = menuServedVariant(ctx.defaultVariant, ctx.hasEnglish)
  const servedRevision = ctx.revisionByVariant[servedVariant]
  const displayKind = ctx.kindByVariant[servedVariant]
  return {
    key: `${servedVariant}-${servedRevision ?? 'default'}-${displayKind}`,
    servedVariant,
    servedRevision,
    displayKind,
    label: menuDuJourAlt(servedVariant),
    embedUrl: menuPdfEmbedUrl(servedVariant, servedRevision),
    previewImageUrl: menuPdfApiUrl(servedVariant, {
      maxWidth: MENU_IMAGE_LCP_WIDTH,
      revision: servedRevision,
    }),
    previewSrcSet: menuPdfPreviewSrcSet(
      servedVariant,
      MENU_IMAGE_PREVIEW_WIDTHS,
      servedRevision,
    ),
    pdfDownloadUrl: menuPdfApiUrl(servedVariant, { revision: servedRevision }),
  }
}
