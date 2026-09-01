'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/lib/restaurant-data'

function MessageCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  if (href === '/autour-de-nous') {
    return pathname === href || pathname.startsWith('/restaurant-')
  }
  return pathname === href
}

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="main-nav" aria-label="Navigation principale">
      {navItems.map((item) => {
        const active = isNavActive(pathname, item.href)
        const className = [
          item.href === '/menu-du-jour' ? 'nav-menu-jour' : null,
          active ? 'nav-active' : null,
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            className={className || undefined}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
      <Link
        className={`nav-cta${pathname === '/reservation' ? ' nav-active' : ''}`}
        href="/reservation"
        prefetch={false}
        aria-current={pathname === '/reservation' ? 'page' : undefined}
        style={{ color: '#000', backgroundColor: '#25d366' }}
      >
        <MessageCircleIcon />
        Réserver
      </Link>
    </nav>
  )
}
