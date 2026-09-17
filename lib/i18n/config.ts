export const locales = ['fr', 'en', 'es', 'it', 'zh', 'de', 'pt', 'ru', 'sv', 'zgh'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export const localeCookieName = 'tifinagh-locale'

export const localeMeta: Record<
  Locale,
  { nativeLabel: string; htmlLang: string; short: string }
> = {
  fr: { nativeLabel: 'Français', htmlLang: 'fr', short: 'FR' },
  en: { nativeLabel: 'English', htmlLang: 'en', short: 'EN' },
  es: { nativeLabel: 'Español', htmlLang: 'es', short: 'ES' },
  it: { nativeLabel: 'Italiano', htmlLang: 'it', short: 'IT' },
  zh: { nativeLabel: '中文', htmlLang: 'zh-CN', short: 'ZH' },
  de: { nativeLabel: 'Deutsch', htmlLang: 'de', short: 'DE' },
  pt: { nativeLabel: 'Português', htmlLang: 'pt', short: 'PT' },
  ru: { nativeLabel: 'Русский', htmlLang: 'ru', short: 'RU' },
  sv: { nativeLabel: 'Svenska', htmlLang: 'sv', short: 'SV' },
  zgh: { nativeLabel: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', htmlLang: 'zgh', short: 'ZGH' },
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value != null && (locales as readonly string[]).includes(value)
}
