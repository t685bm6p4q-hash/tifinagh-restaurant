export { defaultLocale, isLocale, localeMeta, locales, localeCookieName } from './config'
export type { Locale } from './config'
export type { Dictionary } from './types'
export { dictionaries } from './dictionaries'
export { getDictionary, getI18n, getLocale } from './get-locale'
export { setLocaleAction } from './actions'
export {
  localizeDrinks,
  localizeMenu,
  localizeMetro,
  localizeSeoLinks,
  localizeTestimonials,
} from './localize'
export { buildPageMetadata, buildSiteMetadata, formatDocumentTitle, resolvePageSeo, seoPagePaths } from './page-metadata'
export type { SeoPageId } from './page-metadata'
export { fr } from './fr'
