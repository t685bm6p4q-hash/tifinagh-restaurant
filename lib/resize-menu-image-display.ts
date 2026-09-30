import sharp from 'sharp'

/** Largeur LCP mobile (~617 px affichés × ~1,05). */
export const MENU_IMAGE_LCP_WIDTH = 640

/** Largeur desktop (colonne ~880 px). */
export const MENU_IMAGE_PREVIEW_MAX_WIDTH = 920

export const MENU_IMAGE_PREVIEW_WIDTHS = [MENU_IMAGE_LCP_WIDTH, MENU_IMAGE_PREVIEW_MAX_WIDTH] as const

/** Ratio affichage Lighthouse (617×872) pour width/height HTML. */
export const MENU_IMAGE_LAYOUT_WIDTH = 617
export const MENU_IMAGE_LAYOUT_HEIGHT = 872

export function parseMenuDisplayWidth(param: string | null | undefined): number | null {
  const n = Number.parseInt(param ?? '', 10)
  if (!Number.isFinite(n) || n < 320 || n > 1600) return null
  return n
}

export async function resizeMenuImageForDisplay(
  input: Uint8Array,
  maxWidth: number,
): Promise<Buffer> {
  return sharp(Buffer.from(input))
    .rotate()
    .resize({ width: maxWidth, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toBuffer()
}
