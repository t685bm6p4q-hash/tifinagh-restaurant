import { defaultLocale, isLocale, locales, type Locale } from './config'

const nonDefaultLocales = locales.filter((code) => code !== defaultLocale)

/** Préfixe URL /en, /de, … (le français reste sans préfixe). */
const localePrefixRe = new RegExp(
  `^/(${nonDefaultLocales.join('|')})(?=/|$)`,
)

export function stripLocalePrefix(pathname: string): {
  pathname: string
  localeFromPath: Locale | null
} {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const match = normalized.match(localePrefixRe)
  if (!match || !isLocale(match[1])) {
    return { pathname: normalized || '/', localeFromPath: null }
  }
  const localeFromPath = match[1]
  const rest = normalized.slice(match[0].length)
  const pathnameWithoutLocale = rest ? (rest.startsWith('/') ? rest : `/${rest}`) : '/'
  return { pathname: pathnameWithoutLocale, localeFromPath }
}

/** Chemin public pour une locale (SEO + cache CDN par URL). */
export function localeHref(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return normalized
  if (normalized === '/') return `/${locale}`
  return `/${locale}${normalized}`
}

export function isLocalePrefixedPath(pathname: string): boolean {
  return stripLocalePrefix(pathname).localeFromPath != null
}
