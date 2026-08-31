import { HomeTemplate } from '@/src/components/templates/home-template'

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/hero-salle-640.webp"
        fetchPriority="high"
        media="(max-width: 768px)"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero-salle.webp"
        fetchPriority="high"
        media="(min-width: 769px)"
      />
      <HomeTemplate />
    </>
  )
}
