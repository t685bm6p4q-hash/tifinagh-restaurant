import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

/** À avancer à chaque modification réelle du contenu des pages éditoriales. */
const CONTENT_UPDATED_AT = new Date('2026-10-08')

/**
 * Pages publiques, hors espace admin et mentions legales (non indexees).
 * /menu-du-jour change chaque jour : pas de lastModified plutôt qu'une date inventée.
 */
const routes = [
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

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, daily }) => ({
    url: `${siteUrl}${path}`,
    ...(daily ? {} : { lastModified: CONTENT_UPDATED_AT }),
    changeFrequency: daily ? 'daily' : 'monthly',
    priority,
  }))
}
