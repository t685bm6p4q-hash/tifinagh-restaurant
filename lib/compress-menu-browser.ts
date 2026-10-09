const MAX_WEBP_BYTES = 1024 * 1024
const MAX_SIDE = 1600
const MIN_SIDE = 720

const MENU_PDF_WORKER_PATH = '/pdf.worker.min.mjs'

function menuPdfWorkerSrc(): string {
  if (typeof window === 'undefined') return MENU_PDF_WORKER_PATH
  return new URL(MENU_PDF_WORKER_PATH, window.location.origin).href
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality)
  })
}

function menuFileName(variant: 'fr' | 'en', ext: string): string {
  const base = variant === 'en' ? 'menu-du-jour-en' : 'menu-du-jour'
  return `${base}.${ext}`
}

/** Encode une source (photo ou page PDF rendue) en WebP ≤ 1 Mo, JPEG en repli. */
async function encodeMenuSourceUnderLimit(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  variant: 'fr' | 'en',
): Promise<File> {
  const scale = Math.min(1, MAX_SIDE / Math.max(sourceWidth, sourceHeight))
  let width = Math.max(1, Math.round(sourceWidth * scale))
  let height = Math.max(1, Math.round(sourceHeight * scale))

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('CANVAS')

  const draw = (w: number, h: number) => {
    canvas.width = w
    canvas.height = h
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)
    ctx.drawImage(source, 0, 0, w, h)
  }

  draw(width, height)

  let type: 'image/webp' | 'image/jpeg' = 'image/webp'
  let quality = 0.82
  let blob = await canvasToBlob(canvas, type, quality)

  if (!blob || blob.type !== 'image/webp') {
    type = 'image/jpeg'
    blob = await canvasToBlob(canvas, type, quality)
  }

  if (!blob) throw new Error('ENCODE')

  while (blob.size > MAX_WEBP_BYTES && (quality > 0.35 || Math.max(width, height) > MIN_SIDE)) {
    if (quality > 0.35) {
      quality = Math.max(0.35, Number((quality - 0.1).toFixed(2)))
    } else {
      width = Math.max(1, Math.round(width * 0.8))
      height = Math.max(1, Math.round(height * 0.8))
      draw(width, height)
      quality = 0.65
    }
    const next = await canvasToBlob(canvas, type, quality)
    if (next) blob = next
    else break
  }

  if (blob.size > MAX_WEBP_BYTES) throw new Error('IMAGE_TOO_HEAVY')

  const ext = type === 'image/webp' ? 'webp' : 'jpg'
  return new File([blob], menuFileName(variant, ext), { type, lastModified: Date.now() })
}

/**
 * PDF → image WebP ; photos toujours recompressées (≤ 1 Mo) pour passer la limite Vercel (~4,5 Mo).
 * Vous pouvez choisir jusqu’à 10 Mo : l’envoi réseau reste léger.
 */
export async function prepareMenuFileForUpload(
  file: File,
  variant: 'fr' | 'en',
  isPdf: boolean,
): Promise<File> {
  if (isPdf) return convertMenuPdfToImageInBrowser(file, variant)
  return compressMenuImageInBrowser(file, variant)
}

async function loadMenuImageBitmap(file: File): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file)
  } catch {
    const url = URL.createObjectURL(file)
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image()
        el.onload = () => resolve(el)
        el.onerror = () => reject(new Error('IMAGE_DECODE'))
        el.src = url
      })
      return await createImageBitmap(img)
    } finally {
      URL.revokeObjectURL(url)
    }
  }
}

/** Compresse une photo de menu dans le navigateur (WebP ≤ 1 Mo, JPEG en repli). */
export async function compressMenuImageInBrowser(
  file: File,
  variant: 'fr' | 'en' = 'fr',
): Promise<File> {
  const bitmap = await loadMenuImageBitmap(file)
  try {
    return await encodeMenuSourceUnderLimit(bitmap, bitmap.width, bitmap.height, variant)
  } finally {
    bitmap.close()
  }
}

/** Rend la première page d’un PDF via pdf.js puis l’encode en WebP ≤ 1 Mo. */
export async function convertMenuPdfToImageInBrowser(
  file: File,
  variant: 'fr' | 'en' = 'fr',
): Promise<File> {
  const pdfjs = await import('pdfjs-dist')
  pdfjs.GlobalWorkerOptions.workerSrc = menuPdfWorkerSrc()

  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) })
  const pdf = await loadingTask.promise
  try {
    const page = await pdf.getPage(1)
    const baseViewport = page.getViewport({ scale: 1 })
    const renderScale = MAX_SIDE / Math.max(baseViewport.width, baseViewport.height)
    const viewport = page.getViewport({ scale: renderScale })

    const pageCanvas = document.createElement('canvas')
    pageCanvas.width = Math.ceil(viewport.width)
    pageCanvas.height = Math.ceil(viewport.height)

    await page.render({ canvas: pageCanvas, viewport, background: '#ffffff' }).promise

    return await encodeMenuSourceUnderLimit(
      pageCanvas,
      pageCanvas.width,
      pageCanvas.height,
      variant,
    )
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'IMAGE_TOO_HEAVY') throw error
    throw new Error('PDF_RENDER')
  } finally {
    await loadingTask.destroy()
  }
}
