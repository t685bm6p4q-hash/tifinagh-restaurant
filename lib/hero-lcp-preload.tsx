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

/** CSS minimal hero — LCP peint sans attendre la feuille globale bloquante. */
export function HomeHeroCriticalCss() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html:
          '.hero{position:relative;overflow:hidden;background:#17211d;display:flex;align-items:center;min-height:620px;padding:80px 7vw}' +
          '.hero picture{position:absolute;inset:0;display:block;width:100%;height:100%;margin:0}' +
          '.hero-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}' +
          '@media(min-width:769px){.hero{min-height:650px;padding:110px 8vw}}',
      }}
    />
  )
}

export function HomeHeroLcpPreloadLinks() {
  return (
    <>
      <HomeHeroCriticalCss />
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
