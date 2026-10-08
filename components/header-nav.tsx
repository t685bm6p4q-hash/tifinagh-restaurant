import Link from 'next/link'
import { HeaderScrollShell } from '@/components/header-scroll-shell'
import { navItems } from '@/lib/restaurant-data'
import { isNavActive } from '@/lib/nav-active'
import { LanguageSwitcher } from '@/components/language-switcher'
import { defaultLocale, fr, localeHref, type Dictionary, type Locale } from '@/lib/i18n'

function CalendarDaysIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg className="menu-toggle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseMenuIcon() {
  return (
    <svg className="menu-toggle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

function ReservationCta({
  pathname,
  dictionary,
  locale,
}: {
  pathname: string
  dictionary: Dictionary
  locale: Locale
}) {
  const active = pathname === '/reservation'
  return (
    <Link
      className={`nav-cta${active ? ' nav-active' : ''}`}
      href={localeHref('/reservation', locale)}
      prefetch={false}
      aria-current={active ? 'page' : undefined}
    >
      <CalendarDaysIcon />
      {dictionary.nav.book}
    </Link>
  )
}

function HeaderNav({
  pathname,
  dictionary,
  locale,
}: {
  pathname: string
  dictionary: Dictionary
  locale: Locale
}) {
  return (
    <nav id="main-nav" className="main-nav" aria-label={dictionary.nav.ariaMain}>
      {navItems.map((item) => {
        const active = isNavActive(pathname, item.href)
        const className = [
          item.key === 'home' ? 'nav-home' : null,
          item.key === 'reservation' ? 'nav-reservation' : null,
          item.key === 'drinks' ? 'nav-drinks' : null,
          item.key === 'carte' ? 'nav-carte' : null,
          item.href === '/menu-du-jour' ? 'nav-menu-jour' : null,
          active ? 'nav-active' : null,
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <Link
            key={item.href}
            href={localeHref(item.href, locale)}
            prefetch={false}
            className={className || undefined}
            aria-current={active ? 'page' : undefined}
          >
            {dictionary.nav[item.key]}
          </Link>
        )
      })}
    </nav>
  )
}

export function HeaderShell({
  pathname,
  locale = defaultLocale,
  dictionary = fr,
}: {
  pathname: string
  locale?: Locale
  dictionary?: Dictionary
}) {
  return (
    <HeaderScrollShell>
      <input type="checkbox" id="nav-toggle" className="nav-toggle-input" aria-controls="main-nav" />
      <Link href={localeHref('/', locale)} className="brand" prefetch={false}>
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
      <HeaderNav pathname={pathname} dictionary={dictionary} locale={locale} />
      <div className="header-tools">
        <label htmlFor="nav-toggle" className="menu-toggle">
          <span className="menu-toggle-open" aria-hidden="true">
            <span className="menu-toggle-label">{dictionary.nav.menuButton}</span>
            <MenuIcon />
          </span>
          <span className="menu-toggle-close" aria-hidden="true">
            <CloseMenuIcon />
          </span>
          <span className="sr-only">{dictionary.nav.toggleMenu}</span>
        </label>
        <LanguageSwitcher locale={locale} dictionary={dictionary} pathname={pathname} />
        <ReservationCta pathname={pathname} dictionary={dictionary} locale={locale} />
      </div>
    </HeaderScrollShell>
  )
}
