import { defaultLocale, isLocale, type Locale } from './config'

/** Valide la locale du segment URL (`app/[locale]/…`). */
export function bindPageLocale(raw: string | undefined | null): Locale {
  return raw && isLocale(raw) ? raw : defaultLocale
}
