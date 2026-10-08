import type { Metadata } from 'next'
import type { Locale } from './config'
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
  ja: 'ja_JP',
  ko: 'ko_KR',
  ar: 'ar_SA',
  zgh: 'fr_FR',
}

function formatDocumentTitle(dictionary: Dictionary, pageId: SeoPageId): string {
  const page = dictionary.seo.pages[pageId]
  if (pageId === 'home') return page.title
  return dictionary.seo.site.titleTemplate.replace('%s', page.title)
}

function buildSocialMetadata(
  locale: Locale,
  page: SeoPageCopy,
  canonical: string,
  documentTitle: string,
  imageAlt: string,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type: 'website',
      locale: openGraphLocale[locale],
      url: canonical,
      siteName: restaurant.name,
      title: documentTitle,
      description: page.description,
      images: [{ ...restaurant.ogImage, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: documentTitle,
      description: page.description,
      images: [restaurant.ogImage.url],
    },
  }
}

/**
 * Pas de `alternates.languages` : la langue est choisie par cookie sur une URL unique,
 * des hreflang pointant tous vers la même URL seraient ignorés (ou contradictoires) par Google.
 */
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
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale[locale],
      url: siteUrl,
      siteName: restaurant.name,
      title: site.defaultTitle,
      description: site.ogDescription,
      images: [{ ...restaurant.ogImage, alt: site.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: site.twitterTitle,
      description: site.twitterDescription,
      images: [restaurant.ogImage.url],
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
  options?: { description?: string },
): Promise<Metadata> {
  const locale = await getLocale()
  const dictionary = getDictionary(locale)
  const page = dictionary.seo.pages[pageId]
  const description = options?.description ?? page.description
  const canonical = new URL(seoPagePaths[pageId], siteUrl).href
  const documentTitle = formatDocumentTitle(dictionary, pageId)

  return {
    title: pageId === 'home' ? { absolute: page.title } : page.title,
    description,
    alternates: { canonical },
    ...(page.keywords ? { keywords: page.keywords } : {}),
    ...buildSocialMetadata(
      locale,
      { ...page, description },
      canonical,
      documentTitle,
      dictionary.seo.site.ogImageAlt,
    ),
    ...extra,
  }
}
