'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { pulseUiHaptic } from '@/lib/ui-haptic'

const SCROLL_THRESHOLD_PX = 12

export function HeaderScrollShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const sync = () => {
      node.classList.toggle('site-header--scrolled', window.scrollY > SCROLL_THRESHOLD_PX)
    }

    sync()
    window.addEventListener('scroll', sync, { passive: true })

    const onPointerUp = (event: PointerEvent) => {
      if (event.button !== 0) return
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest('.menu-toggle')) return
      pulseUiHaptic()
    }

    node.addEventListener('pointerup', onPointerUp)

    return () => {
      window.removeEventListener('scroll', sync)
      node.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  return (
    <header ref={ref} className="site-header">
      {children}
    </header>
  )
}
