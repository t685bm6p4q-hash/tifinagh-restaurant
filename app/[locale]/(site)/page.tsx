import type { Metadata } from 'next'
import { HomeTemplate } from '@/src/components/templates/home-template'
import { initPageI18n, metadataForLocalePage, type LocalePageParams } from '@/lib/i18n'

export async function generateMetadata({ params }: LocalePageParams): Promise<Metadata> {
  return metadataForLocalePage(params, 'home')
}

export default async function Home({ params }: LocalePageParams) {
  const { locale, dictionary } = await initPageI18n(params)
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/hero-salle-480.avif"
        type="image/avif"
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero-salle-640.avif"
        type="image/avif"
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      <HomeTemplate locale={locale} dictionary={dictionary} />
    </>
  )
}
