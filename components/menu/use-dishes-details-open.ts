'use client'

import { useCallback, useEffect, useRef } from 'react'
import { MENU_DISHES_BREAKPOINT_PX } from '@/lib/menu-viewer-derived'

function dishesOpenByViewport(): boolean {
  return !window.matchMedia(`(min-width: ${MENU_DISHES_BREAKPOINT_PX}px)`).matches
}

/** Sync `<details open>` : mobile ouvert, desktop fermé ; réagit au redimensionnement. */
export function useDishesDetailsOpen(dishesId: string | undefined) {
  const ref = useRef<HTMLDetailsElement>(null)

  const syncOpen = useCallback(() => {
    const details = ref.current
    if (!details || !dishesId) return
    details.open = dishesOpenByViewport()
  }, [dishesId])

  useEffect(() => {
    syncOpen()
    const mq = window.matchMedia(`(min-width: ${MENU_DISHES_BREAKPOINT_PX}px)`)
    mq.addEventListener('change', syncOpen)
    return () => mq.removeEventListener('change', syncOpen)
  }, [syncOpen, dishesId])

  return ref
}
