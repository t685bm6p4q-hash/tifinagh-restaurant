import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

/** Pages publiques, hors espace admin et mentions legales (non indexees). */
const routes = [
  { path: '/', priority: 1 },
  { path: '/carte', priority: 0.9 },
  { path: '/menu-du-jour', priority: 0.8 },
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
  const lastModified = new Date()

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === '/menu-du-jour' ? 'daily' : 'monthly',
    priority,
  }))
}
