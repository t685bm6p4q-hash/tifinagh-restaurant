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

/** Tirets en tête/fin de ligne — tiret ASCII en dernier pour éviter une plage regex accidentelle. */
const LEADING_DECOR = /^[*•·.\s–—-]+/
const TRAILING_DECOR = /[*•·.\s–—_:]+$/ 

const CATEGORY_CANONICAL: { pattern: RegExp; label: string }[] = [
  { pattern: /^entree?s?$/, label: 'Entrées' },
  { pattern: /^plats?$/, label: 'Plats' },
  { pattern: /^desserts?$/, label: 'Desserts' },
  { pattern: /^starters?$/, label: 'Starters' },
  { pattern: /^mains?$/, label: 'Mains' },
]

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

function isAllergenNote(trimmed: string, compact: string): boolean {
  if (/allerg[eè]ne/i.test(compact) || /allergen/i.test(compact)) return true
  if (/^\*/.test(trimmed) && /allerg/i.test(trimmed)) return true
  return false
}

function categoryLettersKey(line: string): string {
  return compactKey(line).replace(/[^a-z]/g, '')
}

function resolveCategoryLabel(line: string): string | null {
  const key = categoryLettersKey(line.replace(/:$/, ''))
  if (!key) return null
  for (const { pattern, label } of CATEGORY_CANONICAL) {
    if (pattern.test(key)) return label
  }
  return null
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
 * Ordre des règles : note allergènes → formule/prix → catégorie → plat.
 */
export function parseMenuDishLines(text: string): MenuDishLine[] {
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
      lines.push({
        kind: 'price',
        text: formatMenuTariffText(stripLineDecor(trimmed)),
      })
      continue
    }

    const categoryLabel = resolveCategoryLabel(trimmed)
    if (categoryLabel) {
      lines.push({ kind: 'category', text: categoryLabel })
      continue
    }

    lines.push({ kind: 'dish', text: stripListPrefix(trimmed) })
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
