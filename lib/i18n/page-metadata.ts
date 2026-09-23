import type { Metadata } from 'next'
import { localeMeta, type Locale } from './config'
import { getDictionary, getLocale } from './get-locale'
import type { Dictionary, SeoPageCopy } from './types'
import { restaurant, siteUrl } from '@/lib/seo'

export type SeoPageId = keyof Dictionary['seo']['pages']

export const seoPagePaths: Record<SeoPageId, string> = {
  home: '/',
  carte: '/carte',
  carteBoissons: '/carte/boissons',
  menuDuJour: '/menu-du-jour',
  contact: '/contact',
  mentionsLegales: '/mentions-legales',
  galerie: '/galerie',
  privatisation: '/privatisation',
  autourDeNous: '/autour-de-nous',
  reservation: '/reservation',
  restaurantMontmartre: '/restaurant-montmartre',
  restaurantPigalle: '/restaurant-pigalle',
  restaurantPlaceDeClichy: '/restaurant-place-de-clichy',
}

const openGraphLocale: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_GB',
  es: 'es_ES',
  it: 'it_IT',
  zh: 'zh_CN',
  de: 'de_DE',
  pt: 'pt_PT',
  ru: 'ru_RU',
  sv: 'sv_SE',
  zgh: 'fr_FR',
}

/** Textes SEO alignés sur le contenu visible (i18n) quand la page est traduite. */
export function resolvePageSeo(
  dictionary: Dictionary,
  pageId: SeoPageId,
): SeoPageCopy {
  switch (pageId) {
    case 'carte':
      return { title: dictionary.carte.title, description: dictionary.carte.text }
    case 'contact':
      return { title: dictionary.contact.title, description: dictionary.contact.text }
    case 'autourDeNous':
      return {
        title: dictionary.pages.around.introTitle,
        description: dictionary.pages.around.introText,
      }
    case 'galerie':
      return {
        title: dictionary.pages.gallery.introTitle,
        description: dictionary.pages.gallery.introText,
      }
    case 'privatisation':
      return {
        title: dictionary.pages.privatisation.introTitle,
        description: dictionary.pages.privatisation.introText,
      }
    case 'menuDuJour':
      return {
        title: dictionary.dailyMenuPage.introTitle,
        description: dictionary.dailyMenuPage.introText,
      }
    case 'restaurantMontmartre':
      return {
        title: dictionary.pages.montmartre.introTitle,
        description: dictionary.pages.montmartre.introText,
      }
    case 'restaurantPigalle':
      return {
        title: dictionary.pages.pigalle.introTitle,
        description: dictionary.pages.pigalle.introText,
      }
    case 'restaurantPlaceDeClichy':
      return {
        title: dictionary.pages.clichy.introTitle,
        description: dictionary.pages.clichy.introText,
      }
    case 'home':
      return {
        title: dictionary.seo.pages.home.title,
        description: dictionary.seo.pages.home.description,
      }
    case 'carteBoissons':
      return {
        title: dictionary.drinks.page.title,
        description: dictionary.drinks.page.text,
      }
    case 'reservation':
      return {
        title: dictionary.reservationPage.introTitle,
        description: dictionary.reservationPage.introText,
      }
    default:
      return dictionary.seo.pages[pageId]
  }
}

export function formatDocumentTitle(
  dictionary: Dictionary,
  pageId: SeoPageId,
): string {
  const page = resolvePageSeo(dictionary, pageId)
  if (pageId === 'home') return page.title
  const template = dictionary.seo.site.titleTemplate
  return template.replace('%s', page.title)
}

function buildSocialMetadata(
  locale: Locale,
  page: SeoPageCopy,
  canonical: string,
  documentTitle: string,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const url = new URL(canonical, siteUrl).href
  return {
    openGraph: {
      type: 'website',
      locale: openGraphLocale[locale],
      url,
      siteName: restaurant.name,
      title: documentTitle,
      description: page.description,
      images: [{ url: restaurant.image, width: 1200, height: 630, alt: dictionaryOgImageAlt(locale) }],
    },
    twitter: {
      card: 'summary_large_image',
      title: documentTitle,
      description: page.description,
      images: [restaurant.image],
    },
  }
}

function dictionaryOgImageAlt(locale: Locale): string {
  return getDictionary(locale).seo.site.ogImageAlt
}

export async function buildSiteMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const dictionary = getDictionary(locale)
  const site = dictionary.seo.site

  return {
    metadataBase: new URL(siteUrl),
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
        { url: '/icon.png', type: 'image/png', sizes: '192x192' },
      ],
      shortcut: '/favicon.ico',
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    title: {
      default: site.defaultTitle,
      template: site.titleTemplate,
    },
    description: site.description,
    keywords: site.keywords,
    alternates: { canonical: siteUrl },
    openGraph: {
      type: 'website',
      locale: openGraphLocale[locale],
      url: siteUrl,
      siteName: restaurant.name,
      title: site.defaultTitle,
      description: site.ogDescription,
      images: [{ url: restaurant.image, width: 1200, height: 630, alt: site.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: site.twitterTitle,
      description: site.twitterDescription,
      images: [restaurant.image],
    },
    robots:
      process.env.VERCEL_ENV === 'preview'
        ? { index: false, follow: false }
        : {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
          },
  }
}

export async function buildPageMetadata(
  pageId: SeoPageId,
  extra?: Metadata,
): Promise<Metadata> {
  const locale = await getLocale()
  const dictionary = getDictionary(locale)
  const page = resolvePageSeo(dictionary, pageId)
  const canonicalPath = seoPagePaths[pageId]
  const canonical = new URL(canonicalPath, siteUrl).href
  const documentTitle = formatDocumentTitle(dictionary, pageId)
  const fallbackSeo = dictionary.seo.pages[pageId]

  const metadata: Metadata = {
    description: page.description,
    alternates: { canonical },
    ...(fallbackSeo.keywords ? { keywords: fallbackSeo.keywords } : {}),
    ...buildSocialMetadata(locale, page, canonical, documentTitle),
    ...extra,
  }

  if (pageId === 'home') {
    metadata.title = { absolute: page.title }
  } else {
    metadata.title = page.title
  }

  return metadata
}
