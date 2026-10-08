import { buildRestaurantJsonLdScriptHtml } from '@/lib/restaurant-json-ld'

/**
 * Données structurées Schema.org — contenu stable, sans nonce (compatible ISR).
 */
export function RestaurantSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: buildRestaurantJsonLdScriptHtml() }}
    />
  )
}
