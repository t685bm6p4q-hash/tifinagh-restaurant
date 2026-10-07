'use client'

import { MenuDishesCard } from '@/components/menu-dishes-card'
import { useDishesDetailsOpen } from '@/components/menu/use-dishes-details-open'
import { MENU_DISHES_HEADING, type MenuDishLine } from '@/lib/menu-dishes-format'
import type { MenuDayVariant } from '@/lib/menu-pdf'

type MenuDishesDetailsProps = {
  dishesId: string
  lang: MenuDayVariant
  lines: MenuDishLine[]
}

export function MenuDishesDetails({ dishesId, lang, lines }: MenuDishesDetailsProps) {
  const detailsRef = useDishesDetailsOpen(dishesId)

  return (
    <details ref={detailsRef} className="menu-dishes" id={dishesId} lang={lang}>
      <summary className="menu-dishes__summary">{MENU_DISHES_HEADING[lang]}</summary>
      <div className="menu-dishes__body">
        <MenuDishesCard lines={lines} />
      </div>
    </details>
  )
}
