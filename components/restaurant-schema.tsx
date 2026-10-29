import { buildRestaurantJsonLdScriptHtml } from '@/lib/restaurant-json-ld'

/**
 * Données structurées Schema.org — HTML stable (hash CSP admin, unsafe-inline marketing).
 */
export function RestaurantSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: buildRestaurantJsonLdScriptHtml() }}
    />
  )
}
