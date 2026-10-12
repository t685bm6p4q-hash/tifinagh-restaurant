import { headers } from 'next/headers'
import { buildRestaurantJsonLdScriptHtml } from '@/lib/restaurant-json-ld'

/**
 * Données structurées Schema.org — hash CSP + nonce si le proxy en fournit un.
 */
export async function RestaurantSchema() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: buildRestaurantJsonLdScriptHtml() }}
    />
  )
}
