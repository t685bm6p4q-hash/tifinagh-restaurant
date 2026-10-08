import { cache } from 'react'
import { headers } from 'next/headers'
import { defaultLocale, isLocale, type Locale } from './config'
import { dictionaries } from './dictionaries'
import type { Dictionary } from './types'

export const getLocale = cache(async (): Promise<Locale> => {
  const fromRequest = (await headers()).get('x-locale')
  if (isLocale(fromRequest)) return fromRequest
  return defaultLocale
})

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export const getI18n = cache(async () => {
  const locale = await getLocale()
  return { locale, dictionary: getDictionary(locale) }
})
