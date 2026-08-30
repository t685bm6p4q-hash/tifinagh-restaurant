import { restaurant, siteUrl } from '@/lib/seo'

/**
 * Donnees structurees Schema.org : indique a Google qu'il s'agit d'un
 * restaurant de cuisine traditionnelle francaise, avec adresse et horaires.
 */
export function RestaurantSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${siteUrl}/#restaurant`,
    name: restaurant.name,
    description: restaurant.description,
    url: siteUrl,
    telephone: restaurant.telephone,
    image: restaurant.image,
    servesCuisine: restaurant.cuisine,
    priceRange: restaurant.priceRange,
    currenciesAccepted: 'EUR',
    acceptsReservations: 'True',
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
    hasMenu: `${siteUrl}/carte`,
    sameAs: restaurant.social,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
