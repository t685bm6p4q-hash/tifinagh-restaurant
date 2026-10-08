import { cache } from 'react'
import { cookies, headers } from 'next/headers'
import { defaultLocale, isLocale, localeCookieName, type Locale } from './config'
import { dictionaries } from './dictionaries'
import type { Dictionary } from './types'

export const getLocale = cache(async (): Promise<Locale> => {
  const headerStore = await headers()
  const fromPath = headerStore.get('x-locale')
  if (isLocale(fromPath)) return fromPath

  const cookieStore = await cookies()
  const fromCookie = cookieStore.get(localeCookieName)?.value
  if (isLocale(fromCookie)) return fromCookie
  return defaultLocale
})

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export const getI18n = cache(async () => {
  const locale = await getLocale()
  return { locale, dictionary: getDictionary(locale) }
})
