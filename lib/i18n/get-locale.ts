import { cache } from 'react'
import { defaultLocale, type Locale } from './config'
import { dictionaries } from './dictionaries'
import { peekRequestLocale } from './request-locale'
import type { Dictionary } from './types'

/** Locale courante (segment `[locale]` — pas de `headers()` sur le chemin marketing). */
export function resolveLocale(): Locale {
  return peekRequestLocale() ?? defaultLocale
}

export const getLocale = cache(async (): Promise<Locale> => resolveLocale())

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export const getI18n = cache(async () => {
  const locale = resolveLocale()
  return { locale, dictionary: getDictionary(locale) }
})
