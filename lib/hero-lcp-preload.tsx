import { preload } from 'react-dom'

const HERO_LCP_LINKS = [
  {
    href: '/images/hero-salle-480.avif',
    media: '(max-width: 768px)',
  },
  {
    href: '/images/hero-salle-640.avif',
    media: '(min-width: 769px)',
  },
] as const

/** Hint React + `<link rel="preload">` — accueil uniquement, avant le reste du rendu. */
export function preloadHomeHeroLcp(): void {
  for (const { href } of HERO_LCP_LINKS) {
    preload(href, {
      as: 'image',
      fetchPriority: 'high',
      type: 'image/avif',
    })
  }
}

export function HomeHeroLcpPreloadLinks() {
  return (
    <>
      {HERO_LCP_LINKS.map(({ href, media }) => (
        <link
          key={href}
          rel="preload"
          as="image"
          href={href}
          type="image/avif"
          media={media}
          fetchPriority="high"
        />
      ))}
    </>
  )
}
