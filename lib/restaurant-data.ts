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

export const menuSections = [
  { title: 'Entrées', items: [
    { name: 'Foie gras maison', description: 'Confiture de figue et toasts', price: '17 €' },
    { name: "Soupe à l'oignon franc-comtoise", description: 'Au comté', price: '9,50 €' },
    { name: 'Cassolette d’escargots de Bourgogne', description: 'En persillade, douzaine', price: '17 €' },
  ]},
  { title: 'Plats', items: [
    { name: 'Confit de canard maison', description: 'Pommes sarladaises', price: '21,50 €' },
    { name: 'Joue de bœuf braisée à la bourguignonne', description: 'Pommes au lard et champignons', price: '23 €' },
    { name: 'Salade landaise', description: 'Foie gras maison, gésiers de volaille, magret de canard fumé', price: '24 €' },
    { name: 'Croque-monsieur au comté et jambon blanc', description: 'Accompagné d’une petite salade fraîche', price: '13 €' },
    { name: 'Entrecôte de bœuf 300 g, origine France', description: 'Sauce poivre, frites maison', price: '34 €' },
  ]},
  { title: 'Desserts', items: [
    { name: 'Crème brûlée vanille Bourbon', description: '', price: '9 €' },
    { name: 'Tarte Tatin', description: '', price: '9,50 €' },
    { name: 'Brownie aux noix et boule vanille', description: '', price: '10 €' },
    { name: 'Café gourmand', description: '', price: '10 €' },
  ]},
]

export type Testimonial = { quote: string; author: string }

export const testimonials: Testimonial[] = [
  { quote: 'Endroit très calme, excellent accueil, cuisine de grande qualité, ce restaurant coche toutes les cases, bravo à toute l’équipe !', author: 'Bertrand V.' },
  { quote: 'Nous venons de quitter le restaurant, tout était très bien, le service était rapide et aimable, l’ambiance très agréable.', author: 'Vale P.' },
  { quote: 'L’emplacement nous fait oublier que nous sommes dans Paris de par son calme, zéro bruit de voiture. Un service hyper agréable plein de sourires et un menu entrée + plat à 16€50 et 18€50 en ajoutant le dessert. C’est très bon, avec une touche d’originalité dans toutes les assiettes. Une adresse à garder.', author: 'Celine L.' },
]

export function whatsappLink(message = 'Bonjour, je souhaite réserver une table chez Tifinagh Montmartre.') {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

export type MetroStation = {
  name: string
  lines: string
  note: string
}

export const nearbyMetroStations: MetroStation[] = [
  { name: 'Place de Clichy', lines: '2 et 13', note: 'à quelques minutes à pied' },
  { name: 'Blanche', lines: '2', note: 'très proche, au pied de Montmartre' },
  { name: 'Pigalle', lines: '2 et 12', note: 'à deux pas' },
  { name: 'La Fourche', lines: '13', note: 'également très accessible' },
  { name: 'Abbesses', lines: '12', note: 'à proximité en grimpant vers le cœur de Montmartre' },
]

export const localSeoLinks = [
  { href: '/restaurant-montmartre', label: 'Restaurant Montmartre' },
  { href: '/restaurant-pigalle', label: 'Restaurant à Pigalle' },
  { href: '/restaurant-place-de-clichy', label: 'Restaurant Place de Clichy' },
] as const

export const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/carte', label: 'La carte' },
  { href: '/menu-du-jour', label: 'Menu du jour' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/privatisation', label: 'Privatisation' },
  { href: '/autour-de-nous', label: 'Autour de nous' },
  { href: '/contact', label: 'Contact' },
]
