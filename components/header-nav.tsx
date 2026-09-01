import Link from 'next/link'
import { navItems } from '@/lib/restaurant-data'
import { isNavActive } from '@/lib/nav-active'

function MessageCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

export function HeaderNav({ pathname }: { pathname: string }) {
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

export function HeaderShell({ pathname }: { pathname: string }) {
  return (
    <header className="site-header">
      <input type="checkbox" id="nav-toggle" className="nav-toggle-input" aria-hidden="true" tabIndex={-1} />
      <Link href="/" className="brand" prefetch={false}>
        <img
          className="brand-logo"
          src="/images/logo-tifinagh-detoure.webp"
          alt="Logo Tifinagh"
          width={52}
          height={52}
          decoding="async"
          fetchPriority="low"
        />
        <span>TIFINAGH</span>
      </Link>
      <HeaderNav pathname={pathname} />
      <label htmlFor="nav-toggle" className="menu-toggle">
        <span className="menu-toggle-open" aria-hidden="true">☰</span>
        <span className="menu-toggle-close" aria-hidden="true">✕</span>
        <span className="sr-only">Ouvrir ou fermer le menu</span>
      </label>
    </header>
  )
}
