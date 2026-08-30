import { HomeTemplate } from '@/src/components/templates/home-template'

export default function Home() {
  return (
    <>
      <link rel="preload" as="image" href="/images/hero-salle.webp" fetchPriority="high" />
      <HomeTemplate />
    </>
  )
}
