import { serializeJsonLd } from '@/lib/json-ld'
import { restaurant, siteUrl } from '@/lib/seo'

/** JSON-LD Restaurant stable (sans headers/nonce) — hash CSP possible côté proxy si besoin. */
export function buildRestaurantJsonLdScriptHtml(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Restaurant',
        '@id': `${siteUrl}/#restaurant`,
        name: restaurant.name,
        alternateName: ['Tifinagh', 'Le Tifinagh', 'Tifinagh Paris', 'Restaurant Tifinagh'],
        description: restaurant.description,
        url: siteUrl,
        telephone: restaurant.telephone,
        image: restaurant.image,
        logo: `${siteUrl}/icon.png`,
        servesCuisine: restaurant.cuisine,
        priceRange: restaurant.priceRange,
        maximumAttendeeCapacity: restaurant.maximumAttendeeCapacity,
        currenciesAccepted: 'EUR',
        acceptsReservations: true,
        potentialAction: {
          '@type': 'ReserveAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/reservation`,
            actionPlatform: [
              'http://schema.org/DesktopWebPlatform',
              'http://schema.org/MobileWebPlatform',
            ],
          },
          result: {
            '@type': 'Reservation',
            name: 'Réservation de table',
          },
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: restaurant.streetAddress,
          postalCode: restaurant.postalCode,
          addressLocality: restaurant.city,
          addressCountry: restaurant.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: restaurant.openingHours.days,
            opens: restaurant.openingHours.opens,
            closes: restaurant.openingHours.closesSchema,
          },
        ],
        hasMenu: [
          {
            '@type': 'Menu',
            name: 'Carte des plats',
            url: `${siteUrl}/carte`,
          },
          {
            '@type': 'Menu',
            name: 'Carte des boissons',
            url: `${siteUrl}/carte/boissons`,
          },
          {
            '@type': 'Menu',
            name: 'Menu du jour',
            url: `${siteUrl}/menu-du-jour`,
          },
        ],
        sameAs: restaurant.social,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: restaurant.name,
        publisher: { '@id': `${siteUrl}/#restaurant` },
        inLanguage: ['fr', 'en', 'es', 'it', 'zh', 'de', 'pt', 'ru', 'sv', 'ja', 'ko', 'ar', 'zgh'],
      },
    ],
  }
  return serializeJsonLd(schema)
}
