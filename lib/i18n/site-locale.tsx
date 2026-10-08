'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { defaultLocale, type Locale } from './config'
import { getDictionary } from './get-locale'
import type { Dictionary } from './types'

/** Locale du segment URL — source de vérité pour le shell (SSG/ISR). */
const SiteLocaleContext = createContext<Locale>(defaultLocale)

export function SiteLocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: ReactNode
}) {
  return <SiteLocaleContext.Provider value={locale}>{children}</SiteLocaleContext.Provider>
}

export function useSiteLocale(): Locale {
  return useContext(SiteLocaleContext)
}

export function useSiteDictionary(): Dictionary {
  return getDictionary(useSiteLocale())
}
