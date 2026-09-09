import sharp from 'sharp'

export const MAX_MENU_WEBP_BYTES = 1024 * 1024

async function encodeWebp(input: Buffer, width: number, quality: number): Promise<Buffer> {
  const encoded = await sharp(input)
    .rotate()
    .resize({
      width,
      height: width,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality, effort: 4 })
    .toBuffer()
  return Buffer.from(encoded)
}

/** Convertit une photo de menu en WebP d'au plus 1 Mo. */
export async function compressMenuImageToWebp(input: Buffer): Promise<Buffer> {
  let width = 1600
  let quality = 80
  let output = await encodeWebp(input, width, quality)

  while (output.length > MAX_MENU_WEBP_BYTES && (quality > 35 || width > 720)) {
    if (quality > 35) {
      quality -= 10
    } else {
      width = Math.max(720, Math.round(width * 0.8))
      quality = 65
    }
    output = await encodeWebp(input, width, quality)
  }

  if (output.length > MAX_MENU_WEBP_BYTES) {
    throw new Error('IMAGE_TOO_HEAVY')
  }

  return Buffer.from(output)
}
