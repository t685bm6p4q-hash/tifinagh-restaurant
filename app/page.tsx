import type { Metadata } from 'next'
import { HomeTemplate } from '@/src/components/templates/home-template'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('home')
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
        href="/images/hero-salle.webp"
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      <HomeTemplate />
    </>
  )
}
