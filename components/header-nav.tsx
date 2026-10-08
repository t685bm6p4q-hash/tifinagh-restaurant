'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeaderScrollShell } from '@/components/header-scroll-shell'
import { navItems } from '@/lib/restaurant-data'
import { isNavActive } from '@/lib/nav-active'
import { HeaderMenuToggle, NAV_TOGGLE_ID } from '@/components/header-menu-toggle'
import { LanguageSwitcher } from '@/components/language-switcher'
import { defaultLocale, type Locale } from '@/lib/i18n/config'
import { fr } from '@/lib/i18n/fr'
import { localeHref, stripLocalePrefix } from '@/lib/i18n/locale-path'
import type { Dictionary } from '@/lib/i18n/types'

function CalendarDaysIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function ReservationCta({
  dictionary,
  locale,
}: {
  dictionary: Dictionary
  locale: Locale
}) {
  const { pathname } = stripLocalePrefix(usePathname() ?? '/')
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
  dictionary,
  locale,
}: {
  dictionary: Dictionary
  locale: Locale
}) {
  const { pathname } = stripLocalePrefix(usePathname() ?? '/')
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
  locale = defaultLocale,
  dictionary = fr,
}: {
  locale?: Locale
  dictionary?: Dictionary
}) {
  const { pathname } = stripLocalePrefix(usePathname() ?? '/')

  return (
    <HeaderScrollShell>
      <input
        type="checkbox"
        id={NAV_TOGGLE_ID}
        className="nav-toggle-input"
        tabIndex={-1}
        aria-hidden="true"
      />
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
      <HeaderNav dictionary={dictionary} locale={locale} />
      <div className="header-tools">
        <HeaderMenuToggle
          menuButton={dictionary.nav.menuButton}
          toggleMenuLabel={dictionary.nav.toggleMenu}
        />
        <LanguageSwitcher locale={locale} dictionary={dictionary} pathname={pathname} />
        <ReservationCta dictionary={dictionary} locale={locale} />
      </div>
    </HeaderScrollShell>
  )
}
