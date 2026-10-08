export { defaultLocale, localeDirection, localeMeta } from './config'
export { fr } from './fr'
export type { Locale } from './config'
export type { Dictionary } from './types'
export { getDictionary } from './get-locale'
export { initPageI18n } from './page-i18n'
export { metadataForLocalePage, type LocalePageParams } from './metadata-for-locale-page'
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
