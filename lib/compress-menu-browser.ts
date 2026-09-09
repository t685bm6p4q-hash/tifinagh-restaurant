const MAX_WEBP_BYTES = 1024 * 1024
const MAX_SIDE = 1600

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality)
  })
}

/** Compresse une photo de menu dans le navigateur (WebP ≤ 1 Mo, JPEG en repli). */
export async function compressMenuImageInBrowser(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
  let width = Math.max(1, Math.round(bitmap.width * scale))
  let height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    bitmap.close()
    throw new Error('CANVAS')
  }

  const draw = (w: number, h: number) => {
    canvas.width = w
    canvas.height = h
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)
    ctx.drawImage(bitmap, 0, 0, w, h)
  }

  draw(width, height)

  let type: 'image/webp' | 'image/jpeg' = 'image/webp'
  let quality = 0.82
  let blob = await canvasToBlob(canvas, type, quality)

  if (!blob || blob.type !== 'image/webp') {
    type = 'image/jpeg'
    blob = await canvasToBlob(canvas, type, quality)
  }

  if (!blob) {
    bitmap.close()
    throw new Error('ENCODE')
  }

  while (blob.size > MAX_WEBP_BYTES && (quality > 0.35 || width > 720)) {
    if (quality > 0.35) {
      quality = Math.max(0.35, Number((quality - 0.1).toFixed(2)))
    } else {
      width = Math.max(720, Math.round(width * 0.8))
      height = Math.max(720, Math.round(height * 0.8))
      draw(width, height)
      quality = 0.65
    }
    const next = await canvasToBlob(canvas, type, quality)
    if (next) blob = next
    else break
  }

  bitmap.close()

  if (blob.size > MAX_WEBP_BYTES) {
    throw new Error('IMAGE_TOO_HEAVY')
  }

  const ext = type === 'image/webp' ? 'webp' : 'jpg'
  return new File([blob], `menu-du-jour.${ext}`, { type, lastModified: Date.now() })
}
