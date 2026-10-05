import sharp from 'sharp'

export {
  MENU_IMAGE_LAYOUT_HEIGHT,
  MENU_IMAGE_LAYOUT_WIDTH,
  MENU_IMAGE_LCP_WIDTH,
  MENU_IMAGE_PREVIEW_MAX_WIDTH,
  MENU_IMAGE_PREVIEW_WIDTHS,
  parseMenuDisplayWidth,
} from '@/lib/menu-image-display'

export async function resizeMenuImageForDisplay(
  input: Uint8Array,
  maxWidth: number,
): Promise<Buffer> {
  return sharp(Buffer.from(input))
    .rotate()
    .resize({ width: maxWidth, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: maxWidth <= 720 ? 68 : 76, effort: 3 })
    .toBuffer()
}
