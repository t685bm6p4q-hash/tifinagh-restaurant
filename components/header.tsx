import Image from 'next/image'
import Link from 'next/link'
import { navItems } from '@/lib/restaurant-data'

function MessageCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

export function Header() {
  return (
    <header className="site-header">
      <input type="checkbox" id="nav-toggle" className="nav-toggle-input" aria-hidden="true" tabIndex={-1} />
      <Link href="/" className="brand">
        <Image
          className="brand-logo"
          src="/images/logo-tifinagh-detoure.webp"
          alt="Logo Tifinagh"
          width={92}
          height={92}
          sizes="92px"
          priority
        />
        <span>TIFINAGH</span>
      </Link>
      <nav className="main-nav" aria-label="Navigation principale">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link className="nav-cta" href="/reservation">
          <MessageCircleIcon />
          Réserver
        </Link>
      </nav>
      <label htmlFor="nav-toggle" className="menu-toggle">
        <span className="menu-toggle-open" aria-hidden="true">☰</span>
        <span className="menu-toggle-close" aria-hidden="true">✕</span>
        <span className="sr-only">Ouvrir ou fermer le menu</span>
      </label>
    </header>
  )
}
