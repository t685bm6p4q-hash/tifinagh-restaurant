'use client'

import { HeaderShell } from '@/components/header-nav'
import { useSiteDictionary, useSiteLocale } from '@/lib/i18n/site-locale'

export function Header() {
  const locale = useSiteLocale()
  const dictionary = useSiteDictionary()
  return <HeaderShell locale={locale} dictionary={dictionary} />
}
