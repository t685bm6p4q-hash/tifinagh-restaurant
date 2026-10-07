import type { MenuDayVariant } from '@/lib/menu-pdf'

export const MAX_MENU_DISHES_CHARS = 2000

export type MenuDishesTexts = { fr: string; en: string }

export type MenuDishLineKind = 'category' | 'price' | 'dish' | 'note'

export type MenuDishLine = { kind: MenuDishLineKind; text: string }

/** @deprecated Utiliser MenuDishLine — conservé pour compatibilité admin si besoin */
export type MenuDishesGroup = { title: string | null; items: string[] }

export const MENU_DISHES_HEADING: Record<MenuDayVariant, string> = {
  fr: 'Lire les plats du jour en texte',
  en: "Read today's dishes as text",
}

export const MENU_DISHES_ADMIN_PLACEHOLDER = `Entrées :
Croustillant de pintade et épinards
Œuf poché et crème de petits pois

Entrée + plat — 24 €

Plats :
Rôti de veau au jus de romarin, purée maison

Desserts :
Île flottante

* Liste des allergènes disponible sur demande.`

const PRICE_HINT =
  /€|entr[ée]e\s*\+\s*plat|plat\s*\+\s*dessert|menu\s*du\s*jour/i

const LEADING_DECOR = /^[*•·.\s–—_:-]+/
const TRAILING_DECOR = /[*•·.\s–—_:-]+$/

type MenuCategoryId = 'starters' | 'mains' | 'desserts'

const CATEGORY_LABELS: Record<MenuCategoryId, Record<MenuDayVariant, string>> = {
  starters: { fr: 'Entrées', en: 'Starters' },
  mains: { fr: 'Plats', en: 'Mains' },
  desserts: { fr: 'Desserts', en: 'Desserts' },
}

const CATEGORY_REFERENCE_KEYS: Record<MenuCategoryId, readonly string[]> = {
  starters: ['entrees', 'entree', 'starters', 'starter'],
  mains: ['plats', 'plat', 'mains', 'main'],
  desserts: ['desserts', 'dessert'],
}

/** Fautes d’OCR déjà rencontrées, au-delà de la tolérance automatique. */
const CATEGORY_TYPO_ALIASES: Record<string, MenuCategoryId> = {
  erirees: 'starters',
  eritrees: 'starters',
  entrtes: 'starters',
  piats: 'mains',
  dessrts: 'desserts',
  desents: 'desserts',
}

const CATEGORY_LEADING_ARTICLE = /^(les|nos|our|the)\s+/
const CATEGORY_MAX_WORDS = 2

function stripLineDecor(line: string): string {
  return line
    .trim()
    .replace(LEADING_DECOR, '')
    .replace(TRAILING_DECOR, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function compactKey(line: string): string {
  return stripLineDecor(line)
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[:\s]+/g, ' ')
    .trim()
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  const row: number[] = Array.from({ length: b.length + 1 }, (_, index) => index)
  for (let i = 1; i <= a.length; i++) {
    let diagonal = row[0] ?? 0
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const above = row[j] ?? 0
      const left = row[j - 1] ?? 0
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1
      row[j] = Math.min(above + 1, left + 1, diagonal + cost)
      diagonal = above
    }
  }
  return row[b.length] ?? Math.max(a.length, b.length)
}

/** Plus le mot est court, moins on tolère de fautes (sinon « Pain » deviendrait « Mains »). */
function maxTypoDistance(reference: string): number {
  if (reference.length >= 7) return 2
  if (reference.length >= 5) return 1
  return 0
}

function resolveCategoryId(line: string): MenuCategoryId | null {
  const words = compactKey(line).replace(CATEGORY_LEADING_ARTICLE, '')
  if (!words || words.split(' ').length > CATEGORY_MAX_WORDS) return null

  const key = words.replace(/[^a-z]/g, '')
  if (!key) return null

  const alias = CATEGORY_TYPO_ALIASES[key]
  if (alias) return alias

  let best: { id: MenuCategoryId; distance: number } | null = null
  for (const id of Object.keys(CATEGORY_REFERENCE_KEYS) as MenuCategoryId[]) {
    for (const reference of CATEGORY_REFERENCE_KEYS[id]) {
      if (Math.abs(reference.length - key.length) > 1) continue
      const distance = levenshtein(key, reference)
      if (distance > maxTypoDistance(reference)) continue
      if (!best || distance < best.distance) best = { id, distance }
    }
  }
  return best?.id ?? null
}

function isAllergenNote(trimmed: string, compact: string): boolean {
  if (/allerg[eè]ne/i.test(compact) || /allergen/i.test(compact)) return true
  if (/^\*/.test(trimmed) && /allerg/i.test(trimmed)) return true
  return false
}

function isPriceLine(trimmed: string, compact: string): boolean {
  if (trimmed.includes('€')) return true
  return PRICE_HINT.test(compact)
}

function stripListPrefix(line: string): string {
  return line.trim().replace(/^[*•·–—-]+\s*/, '').trim()
}

/** Affiche les montants en euros sans centimes (16,50 € → 17 €). */
export function formatMenuTariffText(text: string): string {
  const rounded = text.replace(
    /(\d{1,3})[,.](\d{1,2})(?=\s*€)/g,
    (_, whole: string, cents: string) => {
      const value = Number(whole) + Number(cents.padEnd(2, '0')) / 100
      return String(Math.round(value))
    },
  )
  return rounded.replace(/\s*€/g, ' €')
}

/**
 * Parse le texte du menu ligne par ligne pour un rendu type carte bistro.
 * Ordre des règles : note allergènes → formule/prix → catégorie (tolérante aux fautes d’OCR) → plat.
 */
export function parseMenuDishLines(text: string, variant: MenuDayVariant = 'fr'): MenuDishLine[] {
  const lines: MenuDishLine[] = []

  for (const rawLine of text.split('\n')) {
    const trimmed = rawLine.trim()
    if (!trimmed) continue

    const compact = compactKey(trimmed)

    if (isAllergenNote(trimmed, compact)) {
      lines.push({ kind: 'note', text: stripLineDecor(trimmed) })
      continue
    }

    if (isPriceLine(trimmed, compact)) {
      lines.push({ kind: 'price', text: formatMenuTariffText(stripLineDecor(trimmed)) })
      continue
    }

    const categoryId = resolveCategoryId(trimmed)
    if (categoryId) {
      lines.push({ kind: 'category', text: CATEGORY_LABELS[categoryId][variant] })
      continue
    }

    const dish = stripListPrefix(trimmed)
    if (dish) lines.push({ kind: 'dish', text: dish })
  }

  return lines
}

/**
 * Une ligne terminée par « : » devient un titre de groupe ; les autres sont des plats.
 * @deprecated Préférer parseMenuDishLines pour l’affichage public.
 */
export function parseMenuDishes(text: string): MenuDishesGroup[] {
  const groups: MenuDishesGroup[] = []
  let current: MenuDishesGroup | null = null

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim().replace(/^[-•*·]\s*/, '')
    if (!line) continue
    if (line.endsWith(':')) {
      current = { title: line.slice(0, -1).trim(), items: [] }
      groups.push(current)
      continue
    }
    if (!current) {
      current = { title: null, items: [] }
      groups.push(current)
    }
    current.items.push(line)
  }

  return groups.filter((group) => group.items.length > 0)
}

export function normalizeMenuDishesText(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const text = value.replace(/\r\n?/g, '\n').trim()
  if (text.length > MAX_MENU_DISHES_CHARS) return null
  return text
}
