export const locales = ['fr', 'en', 'es', 'it', 'zh'] as const

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
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value != null && (locales as readonly string[]).includes(value)
}
