export const whatsappNumber = '33679045460'

/** Lien Google Reserve (Réservation via Google Maps). */
export const googleReserveUrl =
  'https://www.google.com/maps/reserve/v/dine/c/aSAIKaVSmBM'

/** Fiche Google Maps / avis. */
export const googleMapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Tifinagh+17+Avenue+Rachel+75018+Paris'

/** Presence Google (recherche locale). */
export const googleSearchUrl = 'https://www.google.com/search?q=tifinagh+restaurant'

/** Fiche PagesJaunes. */
export const pagesJaunesUrl = 'https://www.pagesjaunes.fr/pros/08679356'

export const phoneTel = 'tel:+33142942240'
export const phoneDisplay = '01 42 94 22 40'

export type MenuSectionId = 'starters' | 'mains' | 'desserts'

export const menuSections = [
  { id: 'starters' as const, title: 'Entrées', items: [
    { id: 'foieGras', name: 'Foie gras maison', description: 'Confiture de figue et toasts', price: '17 €' },
    { id: 'onionSoup', name: "Soupe à l'oignon franc-comtoise", description: 'Au comté', price: '9,50 €' },
    { id: 'snails', name: 'Cassolette d’escargots de Bourgogne', description: 'En persillade, douzaine', price: '17 €' },
  ]},
  { id: 'mains' as const, title: 'Plats', items: [
    { id: 'duckConfit', name: 'Confit de canard maison', description: 'Pommes sarladaises', price: '21,50 €' },
    { id: 'beefCheek', name: 'Joue de bœuf braisée à la bourguignonne', description: 'Pommes au lard et champignons', price: '23 €' },
    { id: 'landaiseSalad', name: 'Salade landaise', description: 'Foie gras maison, gésiers de volaille, magret de canard fumé', price: '24 €' },
    { id: 'croqueMonsieur', name: 'Croque-monsieur au comté et jambon blanc', description: 'Accompagné d’une petite salade fraîche', price: '13 €' },
    { id: 'entrecote', name: 'Entrecôte de bœuf 300 g, origine France', description: 'Sauce poivre, frites maison', price: '34 €' },
  ]},
  { id: 'desserts' as const, title: 'Desserts', items: [
    { id: 'cremeBrulee', name: 'Crème brûlée vanille Bourbon', description: '', price: '9 €' },
    { id: 'tarteTatin', name: 'Tarte Tatin', description: '', price: '9,50 €' },
    { id: 'brownie', name: 'Brownie aux noix et boule vanille', description: '', price: '10 €' },
    { id: 'cafeGourmand', name: 'Café gourmand', description: '', price: '10 €' },
  ]},
]

export type TestimonialId = 'bertrand' | 'vale' | 'celine'
export type Testimonial = { id: TestimonialId; quote: string; author: string }

export const testimonials: Testimonial[] = [
  { id: 'bertrand', quote: 'Endroit très calme, excellent accueil, cuisine de grande qualité, ce restaurant coche toutes les cases, bravo à toute l’équipe !', author: 'Bertrand V.' },
  { id: 'vale', quote: 'Nous venons de quitter le restaurant, tout était très bien, le service était rapide et aimable, l’ambiance très agréable.', author: 'Vale P.' },
  { id: 'celine', quote: 'L’emplacement nous fait oublier que nous sommes dans Paris de par son calme, zéro bruit de voiture. Un service hyper agréable plein de sourires et un menu entrée + plat à 16€50 et 18€50 en ajoutant le dessert. C’est très bon, avec une touche d’originalité dans toutes les assiettes. Une adresse à garder.', author: 'Celine L.' },
]

export function whatsappLink(message = 'Bonjour, je souhaite réserver une table chez Tifinagh Montmartre.') {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

export type MetroId = 'clichy' | 'blanche' | 'pigalle' | 'fourche' | 'abbesses'

export type MetroStation = {
  id: MetroId
  name: string
  lines: string
  note: string
}

export const nearbyMetroStations: MetroStation[] = [
  { id: 'clichy', name: 'Place de Clichy', lines: '2 et 13', note: 'à quelques minutes à pied' },
  { id: 'blanche', name: 'Blanche', lines: '2', note: 'très proche, au pied de Montmartre' },
  { id: 'pigalle', name: 'Pigalle', lines: '2 et 12', note: 'à deux pas' },
  { id: 'fourche', name: 'La Fourche', lines: '13', note: 'également très accessible' },
  { id: 'abbesses', name: 'Abbesses', lines: '12', note: 'à proximité en grimpant vers le cœur de Montmartre' },
]

/** Métros mis en avant (accès direct au restaurant). */
export const metroAccessStations: MetroStation[] = [
  { id: 'clichy', name: 'Place de Clichy', lines: '2 et 13', note: '' },
  { id: 'blanche', name: 'Blanche', lines: '2', note: '' },
  { id: 'pigalle', name: 'Pigalle', lines: '2 et 12', note: '' },
  { id: 'fourche', name: 'La Fourche', lines: '13', note: '' },
]

export type LocalVenue = { name: string; note: string }

export const quartierLandmarks = [
  {
    title: 'Cimetière de Montmartre',
    text: "Niché juste sur l'avenue Rachel, au niveau de l'accès au cimetière : la halte idéale pour une pause calme et gourmande.",
  },
  {
    title: 'Montmartre & Sacré-Cœur',
    text: 'Au pied de la butte Montmartre, préservé du tumulte touristique direct.',
  },
] as const

export const nearbyTheatres: LocalVenue[] = [
  { name: 'Théâtre des Deux Ânes', note: 'à 3 min à pied sur le boulevard de Clichy' },
  { name: "Théâtre de l'Européen", note: 'à 5 min à pied, rue Biot / Place de Clichy' },
  { name: "Théâtre de l'Œuvre", note: 'rue de Clichy' },
  { name: 'La Cigale & Le Trianon', note: 'boulevard de Rochechouart' },
  { name: "Théâtre de l'Atelier", note: 'place Charles Dullin' },
]

export const nearbyCinemas: LocalVenue[] = [
  { name: 'Pathé Wepler', note: 'Place de Clichy' },
  { name: 'Cinéma des Cinéastes', note: 'Avenue de Clichy' },
]

export type LocalLinkKey = 'montmartre' | 'pigalle' | 'clichy'

export const localSeoLinks = [
  { href: '/restaurant-montmartre', key: 'montmartre' as const, label: 'Restaurant Montmartre' },
  { href: '/restaurant-pigalle', key: 'pigalle' as const, label: 'Restaurant à Pigalle' },
  { href: '/restaurant-place-de-clichy', key: 'clichy' as const, label: 'Restaurant Place de Clichy' },
] as const

export type NavKey =
  | 'home'
  | 'carte'
  | 'dailyMenu'
  | 'gallery'
  | 'privatisation'
  | 'around'
  | 'reservation'
  | 'contact'

export const navItems: { href: string; key: NavKey; label: string }[] = [
  { href: '/', key: 'home', label: 'Accueil' },
  { href: '/carte', key: 'carte', label: 'La carte' },
  { href: '/menu-du-jour', key: 'dailyMenu', label: 'Menu du jour' },
  { href: '/galerie', key: 'gallery', label: 'Galerie' },
  { href: '/privatisation', key: 'privatisation', label: 'Privatisation' },
  { href: '/autour-de-nous', key: 'around', label: 'Autour de nous' },
  { href: '/reservation', key: 'reservation', label: 'Réservation' },
  { href: '/contact', key: 'contact', label: 'Contact' },
]
