import { bindPageLocale } from '@/lib/i18n/bind-page-locale'
import { getDictionary } from '@/lib/i18n/get-locale'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/types'
import type { LocalePageParams } from '@/lib/i18n/metadata-for-locale-page'

/** Locale + dictionnaire depuis le segment URL (SSG/ISR sûr). */
export async function initPageI18n(params: LocalePageParams['params']): Promise<{
  locale: Locale
  dictionary: Dictionary
}> {
  const locale = bindPageLocale((await params).locale)
  return { locale, dictionary: getDictionary(locale) }
}
