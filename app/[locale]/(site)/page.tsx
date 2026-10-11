import type { Metadata } from 'next'
import { HomeHeroLcpPreloadLinks, preloadHomeHeroLcp } from '@/lib/hero-lcp-preload'
import { HomeTemplate } from '@/src/components/templates/home-template'
import { initPageI18n, metadataForLocalePage, type LocalePageParams } from '@/lib/i18n'

export async function generateMetadata({ params }: LocalePageParams): Promise<Metadata> {
  return metadataForLocalePage(params, 'home')
}

export default async function Home({ params }: LocalePageParams) {
  preloadHomeHeroLcp()

  const { locale, dictionary } = await initPageI18n(params)
  return (
    <>
      <HomeHeroLcpPreloadLinks />
      <HomeTemplate locale={locale} dictionary={dictionary} />
    </>
  )
}
