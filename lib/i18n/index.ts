export { defaultLocale, localeDirection, localeMeta } from './config'
export { fr } from './fr'
export type { Locale } from './config'
export type { Dictionary } from './types'
export { getDictionary, getI18n, resolveLocale } from './get-locale'
export { initPageI18n } from './page-i18n'
export {
  localizeDrinks,
  localizeMenu,
  localizeMetro,
  localizeSeoLinks,
  localizeTestimonials,
} from './localize'
export { buildPageMetadata, buildSiteMetadata } from './page-metadata'
export { cookieLocaleRedirectPath, localeHref, stripLocalePrefix } from './locale-path'
export { languageAlternatesForPath, absoluteLocalizedUrl } from './language-alternates'
export { getUxExtra } from './ux-extra-copy'
