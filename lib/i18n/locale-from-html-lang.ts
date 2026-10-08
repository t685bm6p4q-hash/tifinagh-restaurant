import { defaultLocale, isLocale, localeMeta, locales, type Locale } from './config'

/** Déduit la locale depuis `<html lang="…">` (bandeau cookies côté client). */
export function localeFromHtmlLang(htmlLang: string): Locale {
  const normalized = htmlLang.trim().toLowerCase()
  for (const code of locales) {
    if (localeMeta[code].htmlLang.toLowerCase() === normalized) return code
  }
  const primary = normalized.split('-')[0]
  if (primary && isLocale(primary)) return primary
  return defaultLocale
}
