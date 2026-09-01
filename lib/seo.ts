/**
 * Source unique des donnees SEO et des informations d'etablissement.
 * Passer NEXT_PUBLIC_SITE_URL en variable d'environnement lors de la mise
 * en place du nom de domaine definitif.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tifinagh-restaurant-seven.vercel.app'

export const restaurant = {
  name: 'Tifinagh Montmartre',
  legalName: 'Tifinagh',
  description:
    'Restaurant et bistrot traditionnel français à Montmartre : cuisine française faite maison, produits frais de saison, terrasse et ambiance de bistrot de quartier.',
  cuisine: 'Cuisine traditionnelle française, Bistrot',
  telephone: '+33142942240',
  streetAddress: '17 avenue Rachel',
  postalCode: '75018',
  city: 'Paris',
  country: 'FR',
  latitude: 48.885128,
  longitude: 2.331444,
  priceRange: '€€',
  /** Capacite max privatisation totale (couverts). */
  maximumAttendeeCapacity: 40,
  /** Horaires : tous les jours 10h – 00h (coherent partout). */
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const,
    opens: '10:00',
    closes: '00:00',
    labelDays: 'Du lundi au dimanche',
    labelHours: '10h – 00h',
    labelFull: 'Ouvert tous les jours · 10h – 00h',
  },
  image: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/v1787938428/489A1930_p9tklu.jpg',
  social: [
    'https://instagram.com/tifinagh_restaurant',
    'https://facebook.com/profile.php?id=100068081029708',
    'https://www.pagesjaunes.fr/pros/08679356',
  ],
} as const

export const defaultKeywords = [
  'restaurant traditionnel',
  'cuisine française',
  'bistrot',
  'bistrot Montmartre',
  'fait maison',
  'restaurant Montmartre',
  'restaurant Paris 18',
  'Tifinagh',
]
