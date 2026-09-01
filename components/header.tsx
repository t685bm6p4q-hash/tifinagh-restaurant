import Link from 'next/link'
import { MainNav } from '@/components/main-nav'

export function Header() {
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
      <MainNav />
      <label htmlFor="nav-toggle" className="menu-toggle">
        <span className="menu-toggle-open" aria-hidden="true">☰</span>
        <span className="menu-toggle-close" aria-hidden="true">✕</span>
        <span className="sr-only">Ouvrir ou fermer le menu</span>
      </label>
    </header>
  )
}
