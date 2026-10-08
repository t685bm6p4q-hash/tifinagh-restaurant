import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

const siteUrl = 'https://www.tifinagh.fr'
const locales = [
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
]
const defaultLocale = 'fr'
const localeMeta = {
  fr: { htmlLang: 'fr' },
  en: { htmlLang: 'en' },
  es: { htmlLang: 'es' },
  it: { htmlLang: 'it' },
  zh: { htmlLang: 'zh-CN' },
  de: { htmlLang: 'de' },
  pt: { htmlLang: 'pt' },
  ru: { htmlLang: 'ru' },
  sv: { htmlLang: 'sv' },
  ja: { htmlLang: 'ja' },
  ko: { htmlLang: 'ko' },
  ar: { htmlLang: 'ar' },
  zgh: { htmlLang: 'zgh' },
}

function localeHref(path, locale) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return normalized
  if (normalized === '/') return `/${locale}`
  return `/${locale}${normalized}`
}

function absoluteLocalizedUrl(path, locale) {
  return new URL(localeHref(path, locale), siteUrl).href
}

function languageAlternatesForPath(path) {
  const languages = {}
  for (const locale of locales) {
    languages[localeMeta[locale].htmlLang] = absoluteLocalizedUrl(path, locale)
  }
  languages['x-default'] = absoluteLocalizedUrl(path, defaultLocale)
  return languages
}

describe('languageAlternatesForPath', () => {
  it('expose 13 langues + x-default', () => {
    const alt = languageAlternatesForPath('/carte')
    assert.equal(Object.keys(alt).length, 14)
    assert.ok(alt['x-default'])
  })

  it('fr sans préfixe, en avec /en', () => {
    const alt = languageAlternatesForPath('/carte')
    assert.equal(alt.fr, `${siteUrl}/carte`)
    assert.equal(alt.en, `${siteUrl}/en/carte`)
    assert.equal(alt['x-default'], alt.fr)
  })

  it('utilise zh-CN comme hreflang', () => {
    const alt = languageAlternatesForPath('/')
    assert.equal(alt['zh-CN'], `${siteUrl}/zh`)
  })
})
