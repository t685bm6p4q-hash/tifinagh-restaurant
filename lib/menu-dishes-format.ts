import type { MenuDayVariant } from '@/lib/menu-pdf'

export const MAX_MENU_DISHES_CHARS = 2000

export type MenuDishesTexts = { fr: string; en: string }

export type MenuDishesGroup = { title: string | null; items: string[] }

export const MENU_DISHES_HEADING: Record<MenuDayVariant, string> = {
  fr: 'Lire les plats du jour en texte',
  en: "Read today's dishes as text",
}

export const MENU_DISHES_ADMIN_PLACEHOLDER = `Entrées :
Croustillant de pintade et épinards
Œuf poché et crème de petits pois

Plats :
Rôti de veau au jus de romarin, purée maison

Desserts :
Île flottante`

export function normalizeMenuDishesText(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const text = value.replace(/\r\n?/g, '\n').trim()
  if (text.length > MAX_MENU_DISHES_CHARS) return null
  return text
}

/**
 * Une ligne terminée par « : » devient un titre de groupe ; les autres sont des plats.
 * Les puces saisies à la main (-, •, *) sont retirées.
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
