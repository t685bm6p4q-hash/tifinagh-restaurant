import { defaultLocale, isLocale, type Locale } from './config'
import { setRequestLocale } from './request-locale'

/** À appeler en tête de `generateMetadata` / pages sous `app/[locale]/…`. */
export function bindPageLocale(raw: string | undefined | null): Locale {
  const locale = raw && isLocale(raw) ? raw : defaultLocale
  setRequestLocale(locale)
  return locale
}
