'use client'

import { useEffect, useRef, type ReactNode } from 'react'

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
    return () => window.removeEventListener('scroll', sync)
  }, [])

  return (
    <header ref={ref} className="site-header">
      {children}
    </header>
  )
}
