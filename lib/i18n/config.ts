export const locales = [
  'fr',
  'en',
  'es',
  'it',
  'zh',
  'de',
  'pt',
  'ru',
  'sv',
  'ja',
  'ko',
  'ar',
  'zgh',
] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export const localeCookieName = 'tifinagh-locale'

export const localeMeta: Record<
  Locale,
  { nativeLabel: string; htmlLang: string; short: string; flag: string; dir?: 'rtl' }
> = {
  fr: { nativeLabel: 'Français', htmlLang: 'fr', short: 'FR', flag: '🇫🇷' },
  en: { nativeLabel: 'English', htmlLang: 'en', short: 'EN', flag: '🇬🇧' },
  es: { nativeLabel: 'Español', htmlLang: 'es', short: 'ES', flag: '🇪🇸' },
  it: { nativeLabel: 'Italiano', htmlLang: 'it', short: 'IT', flag: '🇮🇹' },
  zh: { nativeLabel: '中文', htmlLang: 'zh-CN', short: 'ZH', flag: '🇨🇳' },
  de: { nativeLabel: 'Deutsch', htmlLang: 'de', short: 'DE', flag: '🇩🇪' },
  pt: { nativeLabel: 'Português', htmlLang: 'pt', short: 'PT', flag: '🇵🇹' },
  ru: { nativeLabel: 'Русский', htmlLang: 'ru', short: 'RU', flag: '🇷🇺' },
  sv: { nativeLabel: 'Svenska', htmlLang: 'sv', short: 'SV', flag: '🇸🇪' },
  ja: { nativeLabel: '日本語', htmlLang: 'ja', short: 'JA', flag: '🇯🇵' },
  ko: { nativeLabel: '한국어', htmlLang: 'ko', short: 'KO', flag: '🇰🇷' },
  ar: { nativeLabel: 'العربية', htmlLang: 'ar', short: 'AR', flag: '🇸🇦', dir: 'rtl' },
  zgh: { nativeLabel: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', htmlLang: 'zgh', short: 'ZGH', flag: '🇲🇦' },
}

export function localeDirection(locale: Locale): 'ltr' | 'rtl' {
  return localeMeta[locale].dir ?? 'ltr'
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value != null && (locales as readonly string[]).includes(value)
}
