import type { MenuDishesTexts } from '@/lib/menu-dishes-format'
import type { MenuDayVariant } from '@/lib/menu-pdf'

/** Desktop : plats repliés au chargement ; en dessous : ouverts. */
export const MENU_DISHES_DESKTOP_QUERY = '(min-width: 901px)'

export function menuShowEnFallback(
  variant: MenuDayVariant,
  hasEnglish: boolean,
): boolean {
  return variant === 'en' && !hasEnglish
}

export function menuServedVariant(
  variant: MenuDayVariant,
  hasEnglish: boolean,
): MenuDayVariant {
  return menuShowEnFallback(variant, hasEnglish) ? 'fr' : variant
}

export function menuDishesSource(
  dishesByVariant: MenuDishesTexts,
  servedVariant: MenuDayVariant,
): { text: string; variant: MenuDayVariant } {
  const fr = dishesByVariant.fr.trim()
  const en = dishesByVariant.en.trim()
  if (servedVariant === 'en' && en) return { text: en, variant: 'en' }
  if (fr) return { text: fr, variant: 'fr' }
  if (en) return { text: en, variant: 'en' }
  return { text: '', variant: servedVariant }
}
