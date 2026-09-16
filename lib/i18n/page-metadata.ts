import type { Metadata } from 'next'
import { localeMeta, type Locale } from './config'
import { getDictionary, getLocale } from './get-locale'
import type { Dictionary } from './types'
import { restaurant, siteUrl } from '@/lib/seo'

export type SeoPageId = keyof Dictionary['seo']['pages']

export const seoPagePaths: Record<SeoPageId, string> = {
  home: '/',
  carte: '/carte',
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
}

export function formatDocumentTitle(
  dictionary: Dictionary,
  pageId: SeoPageId,
): string {
  const page = dictionary.seo.pages[pageId]
  if (pageId === 'home') return page.title
  const template = dictionary.seo.site.titleTemplate
  return template.replace('%s', page.title)
}

export async function buildSiteMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const dictionary = getDictionary(locale)
  const site = dictionary.seo.site

  return {
    metadataBase: new URL(siteUrl),
    icons: {
      icon: [{ url: '/icon.webp', type: 'image/webp' }],
      shortcut: ['/icon.webp'],
    },
    title: {
      default: site.defaultTitle,
      template: site.titleTemplate,
    },
    description: site.description,
    keywords: site.keywords,
    alternates: { canonical: '/' },
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
    robots: {
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
  const page = dictionary.seo.pages[pageId]
  const canonical = seoPagePaths[pageId]

  const metadata: Metadata = {
    description: page.description,
    alternates: { canonical },
    ...(page.keywords ? { keywords: page.keywords } : {}),
    ...extra,
  }

  if (pageId === 'home') {
    metadata.title = { absolute: page.title }
  } else {
    metadata.title = page.title
  }

  return metadata
}
