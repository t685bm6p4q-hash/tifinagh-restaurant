import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

/** Miroir de lib/i18n/locale-path.ts pour node --test (résolution ESM sans bundler). */
const defaultLocale = 'fr'
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
const nonDefaultLocales = locales.filter((code) => code !== defaultLocale)
const localePrefixRe = new RegExp(`^/(${nonDefaultLocales.join('|')})(?=/|$)`)

function isLocale(value) {
  return value != null && locales.includes(value)
}

function stripLocalePrefix(pathname) {
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

function localeHref(path, locale) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return normalized
  if (normalized === '/') return `/${locale}`
  return `/${locale}${normalized}`
}

function cookieLocaleRedirectPath(internalPath, localeFromPath, cookieValue) {
  if (localeFromPath) return null
  if (!isLocale(cookieValue) || cookieValue === defaultLocale) return null
  return localeHref(internalPath, cookieValue)
}

function resolveRequestLocale(localeFromPath, cookieValue) {
  if (localeFromPath) return localeFromPath
  if (isLocale(cookieValue)) return cookieValue
  return defaultLocale
}

describe('resolveRequestLocale', () => {
  it('priorise le préfixe URL puis le cookie puis fr', () => {
    assert.equal(resolveRequestLocale('en', 'de'), 'en')
    assert.equal(resolveRequestLocale(null, 'de'), 'de')
    assert.equal(resolveRequestLocale(null, undefined), 'fr')
    assert.equal(resolveRequestLocale(null, 'fr'), 'fr')
  })
})

describe('cookieLocaleRedirectPath', () => {
  it('redirige vers /en quand le cookie est anglais', () => {
    assert.equal(cookieLocaleRedirectPath('/carte', null, 'en'), '/en/carte')
    assert.equal(cookieLocaleRedirectPath('/', null, 'en'), '/en')
  })

  it('ne redirige pas le français ni une URL déjà préfixée', () => {
    assert.equal(cookieLocaleRedirectPath('/carte', null, 'fr'), null)
    assert.equal(cookieLocaleRedirectPath('/carte', null, undefined), null)
    assert.equal(cookieLocaleRedirectPath('/carte', 'en', 'de'), null)
  })
})

describe('stripLocalePrefix', () => {
  it('laisse le français sans préfixe', () => {
    assert.deepEqual(stripLocalePrefix('/carte'), {
      pathname: '/carte',
      localeFromPath: null,
    })
  })

  it('extrait /en et le chemin interne', () => {
    assert.deepEqual(stripLocalePrefix('/en/menu-du-jour'), {
      pathname: '/menu-du-jour',
      localeFromPath: 'en',
    })
  })

  it('gère la racine localisée', () => {
    assert.deepEqual(stripLocalePrefix('/de'), {
      pathname: '/',
      localeFromPath: 'de',
    })
  })
})

describe('localeHref', () => {
  it('ne préfixe pas le français', () => {
    assert.equal(localeHref('/carte', 'fr'), '/carte')
    assert.equal(localeHref('/', 'fr'), '/')
  })

  it('préfixe les autres langues', () => {
    assert.equal(localeHref('/carte', 'en'), '/en/carte')
    assert.equal(localeHref('/', 'en'), '/en')
  })
})
