import type { Locale } from '@/lib/i18n/config'

const MENU_PDF_PATHNAME = 'menu-du-jour.pdf'
const MENU_PDF_PATHNAME_EN = 'menu-du-jour-en.pdf'

export type MenuDayVariant = 'fr' | 'en'

/** URL du menu du jour (inline, iframe) — ajouter `?variant=en` pour l’anglais. */
const MENU_PDF_URL = '/api/menu-pdf'

export function menuBlobPathname(variant: MenuDayVariant): string {
  return variant === 'en' ? MENU_PDF_PATHNAME_EN : MENU_PDF_PATHNAME
}

/** FR pour fr/zgh ; EN pour toutes les autres locales du site. */
export function menuDayVariantForLocale(locale: Locale): MenuDayVariant {
  return locale === 'fr' || locale === 'zgh' ? 'fr' : 'en'
}

export function menuRevisionCacheKey(revision: string | null | undefined): string | null {
  if (!revision) return null
  const safe = revision.replace(/[^\dA-Za-z-_.]/g, '').slice(0, 80)
  return safe.length > 0 ? safe : null
}

export function menuPdfApiUrl(
  variant: MenuDayVariant,
  options?: { maxWidth?: number; revision?: string | null },
): string {
  const params = new URLSearchParams()
  if (variant === 'en') params.set('variant', 'en')
  if (options?.maxWidth) params.set('w', String(options.maxWidth))
  const r = menuRevisionCacheKey(options?.revision)
  if (r) params.set('r', r)
  const query = params.toString()
  return query ? `${MENU_PDF_URL}?${query}` : MENU_PDF_URL
}

export function menuPdfPreviewSrcSet(
  variant: MenuDayVariant,
  widths: readonly number[],
  revision?: string | null,
): string {
  return widths
    .map((w) => `${menuPdfApiUrl(variant, { maxWidth: w, revision })} ${w}w`)
    .join(', ')
}

export function parseMenuDayVariant(value: string | null | undefined): MenuDayVariant {
  return value === 'en' ? 'en' : 'fr'
}

/** Variante d’upload : URL + formulaire doivent concorder si les deux sont présents. */
export function resolveMenuUploadVariant(
  formValue: FormDataEntryValue | null,
  queryValue: string | null,
): { variant: MenuDayVariant } | { error: string } {
  const hasForm = typeof formValue === 'string' && formValue.length > 0
  const hasQuery = Boolean(queryValue && queryValue.length > 0)
  const fromForm = hasForm ? parseMenuDayVariant(String(formValue)) : null
  const fromQuery = hasQuery ? parseMenuDayVariant(queryValue) : null

  if (fromForm && fromQuery && fromForm !== fromQuery) {
    return { error: 'Variante incohérente : le bouton FR/EN ne correspond pas à la requête.' }
  }

  const variant = fromQuery ?? fromForm ?? 'fr'
  return { variant }
}

export const MAX_MENU_PDF_BYTES = Math.floor(4.5 * 1024 * 1024)
export const PDF_TOO_HEAVY_MESSAGE = 'Le PDF est trop lourd, veuillez le compresser.'
export const MAX_MENU_UPLOAD_BYTES = 10 * 1024 * 1024

/** Alt / title du menu, avec la date du jour à Paris. */
export function menuDuJourAlt(variant: MenuDayVariant = 'fr'): string {
  const today = new Date().toLocaleDateString('fr-FR', { timeZone: 'Europe/Paris' })
  if (variant === 'en') {
    return `Today's menu Le Tifinagh Paris 18 - ${today}`
  }
  return `Menu du jour Le Tifinagh Paris 18 - ${today}`
}

export type MenuMediaKind = 'pdf' | 'image'

const JPEG = 'image/jpeg'
const PNG = 'image/png'
const WEBP = 'image/webp'
const PDF = 'application/pdf'

export function sniffMenuContentType(bytes: Uint8Array): string | null {
  if (bytes.length >= 4 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return PDF
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return JPEG
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return PNG
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return WEBP
  }
  return null
}

export function resolveMenuUpload(file: File): { contentType: string; filename: string } | null {
  const name = file.name.toLowerCase()
  const type = (file.type || '').toLowerCase()

  if (type.includes('pdf') || name.endsWith('.pdf')) {
    return { contentType: PDF, filename: 'menu-du-jour.pdf' }
  }
  if (type === JPEG || type === 'image/jpg' || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
    return { contentType: JPEG, filename: 'menu-du-jour.jpg' }
  }
  if (type === PNG || name.endsWith('.png')) {
    return { contentType: PNG, filename: 'menu-du-jour.png' }
  }
  if (type === WEBP || name.endsWith('.webp')) {
    return { contentType: WEBP, filename: 'menu-du-jour.webp' }
  }
  return null
}

export function menuKindFromContentType(contentType: string): MenuMediaKind {
  return contentType.startsWith('image/') ? 'image' : 'pdf'
}

export function menuInlineResponseHeaders(
  contentType: string,
  variant: MenuDayVariant = 'fr',
): HeadersInit {
  const base = variant === 'en' ? 'menu-du-jour-en' : 'menu-du-jour'
  const filename = contentType.includes('png')
    ? `${base}.png`
    : contentType.includes('webp')
      ? `${base}.webp`
      : contentType.startsWith('image/')
        ? `${base}.jpg`
        : `${base}.pdf`

  return {
    'Content-Type': contentType,
    'Content-Disposition': `inline; filename="${filename}"`,
    'Cache-Control': 'no-store',
  }
}

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}
