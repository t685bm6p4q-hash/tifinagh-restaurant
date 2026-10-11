/**
 * Chemins hors arbre `[locale]` : pas de rewrite `/fr/…` ni de redirect cookie locale.
 * (Découverte agents, robots, sitemap — routes à la racine `app/`.)
 */
export function isMarketingPublicPath(pathname: string): boolean {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (path === '/robots.txt' || path === '/llms.txt' || path === '/sitemap.xml') return true
  if (path.startsWith('/.well-known/')) return true
  return false
}
