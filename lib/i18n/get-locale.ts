import { cache } from 'react'
import { defaultLocale, type Locale } from './config'
import { dictionaries } from './dictionaries'
import { peekRequestLocale } from './request-locale'
import type { Dictionary } from './types'

/** Locale fixée par `setRequestLocale` / `bindPageLocale` (layouts + pages). */
export function resolveLocale(): Locale {
  return peekRequestLocale() ?? defaultLocale
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export function getI18n(): { locale: Locale; dictionary: Dictionary } {
  const locale = resolveLocale()
  return { locale, dictionary: getDictionary(locale) }
}

export const getLocale = cache(async (): Promise<Locale> => resolveLocale())
