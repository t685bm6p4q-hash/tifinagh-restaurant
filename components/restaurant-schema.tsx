import { restaurant, siteUrl } from '@/lib/seo'

/**
 * Donnees structurees Schema.org : indique a Google qu'il s'agit d'un
 * restaurant de cuisine traditionnelle francaise, avec adresse et horaires.
 */
export function RestaurantSchema() {
  const restaurantSchema = {
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
    acceptsReservations: 'True',
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
        closes: restaurant.openingHours.closes,
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
  }

  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: restaurant.name,
    publisher: { '@id': `${siteUrl}/#restaurant` },
    inLanguage: ['fr', 'en', 'es', 'it', 'zh', 'de', 'pt', 'ru', 'sv'],
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [restaurantSchema, websiteSchema],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
