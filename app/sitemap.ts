import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n/config'
import {
  absoluteLocalizedUrl,
  languageAlternatesForPath,
} from '@/lib/i18n/language-alternates'
import { publicSitemapRoutes } from '@/lib/i18n/public-sitemap-routes'

/** À avancer à chaque modification réelle du contenu des pages éditoriales. */
/** Bump après changement éditorial (voir docs/OPERATIONS.md). */
const CONTENT_UPDATED_AT = new Date('2026-10-08T18:00:00.000Z')

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const { path, priority, daily } of publicSitemapRoutes) {
    const alternates = { languages: languageAlternatesForPath(path) }
    for (const locale of locales) {
      entries.push({
        url: absoluteLocalizedUrl(path, locale),
        ...(daily ? {} : { lastModified: CONTENT_UPDATED_AT }),
        changeFrequency: daily ? 'daily' : 'monthly',
        priority,
        alternates,
      })
    }
  }

  return entries
}
