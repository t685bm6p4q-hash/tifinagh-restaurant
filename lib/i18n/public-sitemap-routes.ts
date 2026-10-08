/** Pages indexables (hors admin, mentions légales). */
export type PublicSitemapRoute = {
  path: string
  priority: number
  /** Menu du jour : pas de lastModified figé. */
  daily?: boolean
}

export const publicSitemapRoutes: PublicSitemapRoute[] = [
  { path: '/', priority: 1 },
  { path: '/carte', priority: 0.9 },
  { path: '/carte/boissons', priority: 0.85 },
  { path: '/menu-du-jour', priority: 0.8, daily: true },
  { path: '/galerie', priority: 0.7 },
  { path: '/privatisation', priority: 0.7 },
  { path: '/reservation', priority: 0.8 },
  { path: '/contact', priority: 0.6 },
  { path: '/autour-de-nous', priority: 0.65 },
  { path: '/restaurant-montmartre', priority: 0.7 },
  { path: '/restaurant-pigalle', priority: 0.65 },
  { path: '/restaurant-place-de-clichy', priority: 0.65 },
]
