'use client'

import { useEffect, useRef } from 'react'
import { MenuDishesCard } from '@/components/menu-dishes-card'
import { MENU_DISHES_HEADING, type MenuDishLine } from '@/lib/menu-dishes-format'
import type { MenuDayVariant } from '@/lib/menu-pdf'
import { MENU_DISHES_DESKTOP_QUERY } from '@/lib/menu-viewer-derived'

type MenuDishesDetailsProps = {
  dishesId: string
  lang: MenuDayVariant
  lines: MenuDishLine[]
}

export function MenuDishesDetails({ dishesId, lang, lines }: MenuDishesDetailsProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null)

  // Repli unique au montage : ne jamais écraser un choix manuel (pas d'écoute du resize).
  useEffect(() => {
    const details = detailsRef.current
    if (details && window.matchMedia(MENU_DISHES_DESKTOP_QUERY).matches) {
      details.open = false
    }
  }, [])

  return (
    <details ref={detailsRef} className="menu-dishes" id={dishesId} lang={lang} open>
      <summary className="menu-dishes__summary">{MENU_DISHES_HEADING[lang]}</summary>
      <div className="menu-dishes__body">
        <MenuDishesCard lines={lines} />
      </div>
    </details>
  )
}
