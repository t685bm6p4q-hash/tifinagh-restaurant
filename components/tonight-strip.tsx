'use client'

import { LocalizedLink } from '@/components/localized-link'
import { useSiteDictionary, useSiteLocale } from '@/lib/i18n/site-locale'

/** Bandeau info — CSS pur, hors hero, zero JS / zero image. */
export function TonightStrip() {
  const locale = useSiteLocale()
  const dictionary = useSiteDictionary()

  return (
    <div className="tonight-strip" role="status">
      <p>
        <span className="tonight-strip-strong">{dictionary.hours.openToday}</span>
        <span className="tonight-strip-sep" aria-hidden="true">·</span>
        {dictionary.hours.hours}
        <span className="tonight-strip-sep" aria-hidden="true">·</span>
        <LocalizedLink href="/menu-du-jour" locale={locale} prefetch={false}>
          {dictionary.home.tonightMenu}
        </LocalizedLink>
      </p>
    </div>
  )
}
