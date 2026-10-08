import type { Metadata } from 'next'
import { HomeTemplate } from '@/src/components/templates/home-template'
import { metadataForLocalePage, type LocalePageParams } from '@/lib/i18n/metadata-for-locale-page'

export async function generateMetadata({ params }: LocalePageParams): Promise<Metadata> {
  return metadataForLocalePage(params, 'home')
}

export default function Home() {
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
      <HomeTemplate />
    </>
  )
}
