import { defaultLocale, localeMeta, locales, type Locale } from './config'
import { localeHref } from './locale-path'
import { siteUrl } from '@/lib/seo'

/** Code hreflang (BCP 47) pour une locale du site. */
export function hreflangForLocale(locale: Locale): string {
  return localeMeta[locale].htmlLang
}

export function absoluteLocalizedUrl(path: string, locale: Locale): string {
  return new URL(localeHref(path, locale), siteUrl).href
}

/**
 * Cluster hreflang pour une page (chemin interne sans préfixe).
 * Inclut x-default → français (URL sans préfixe).
 */
export function languageAlternatesForPath(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[hreflangForLocale(locale)] = absoluteLocalizedUrl(path, locale)
  }
  languages['x-default'] = absoluteLocalizedUrl(path, defaultLocale)
  return languages
}
