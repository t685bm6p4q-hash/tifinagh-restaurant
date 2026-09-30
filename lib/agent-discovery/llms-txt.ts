import { HOME_SEO_DESCRIPTION } from '@/lib/i18n/home-seo-description'
import { seoPagePaths } from '@/lib/i18n/page-metadata'
import {
  onlineBookingUrl,
  phoneDisplay,
  reservationWhatsAppFormHref,
  whatsappNumber,
} from '@/lib/restaurant-data'
import { restaurant, siteUrl } from '@/lib/seo'

const PAGE_LABELS: Record<keyof typeof seoPagePaths, string> = {
  home: 'Accueil',
  carte: 'Carte (plats)',
  carteBoissons: 'Carte des boissons',
  menuDuJour: 'Menu du jour',
  contact: 'Contact & horaires',
  mentionsLegales: 'Mentions légales',
  galerie: 'Galerie photos',
  privatisation: 'Privatisation & événements',
  autourDeNous: 'Autour de nous (quartier)',
  reservation: 'Réservation',
  restaurantMontmartre: 'Restaurant Montmartre (SEO local)',
  restaurantPigalle: 'Restaurant Pigalle (SEO local)',
  restaurantPlaceDeClichy: 'Restaurant Place de Clichy (SEO local)',
}

export function buildLlmsTxt(): string {
  const lines: string[] = [
    `# ${restaurant.name}`,
    '',
    `> ${HOME_SEO_DESCRIPTION}`,
    '',
    `${restaurant.description}`,
    '',
    `Adresse : ${restaurant.streetAddress}, ${restaurant.postalCode} ${restaurant.city}. Téléphone : ${phoneDisplay}.`,
    '',
    '## Pages principales',
  ]

  for (const [id, path] of Object.entries(seoPagePaths)) {
    const label = PAGE_LABELS[id as keyof typeof seoPagePaths]
    lines.push(`- [${label}](${new URL(path, siteUrl).href})`)
  }

  lines.push(
    '',
    '## Réservation',
    `- **En ligne (recommandé)** : [uReserve](${onlineBookingUrl('fr')}) — confirmation enregistrée.`,
    `- **Téléphone** : ${phoneDisplay} (\`tel:+33142942240\`).`,
    `- **WhatsApp** : +${whatsappNumber} — [formulaire sur le site](${new URL(reservationWhatsAppFormHref, siteUrl).href}) (l’utilisateur doit envoyer le message dans WhatsApp).`,
    '',
    '## Menus',
    `- [Menu du jour (PDF/API)](${new URL('/api/menu-pdf', siteUrl).href})`,
    `- [Carte des plats](${new URL('/carte', siteUrl).href})`,
    `- [Carte des boissons](${new URL('/carte/boissons', siteUrl).href})`,
    '',
    '## Découverte agentique',
    `- [ai-catalog.json](${new URL('/.well-known/ai-catalog.json', siteUrl).href}) (ARD / AI Catalog)`,
    `- [agent-tools OpenAPI](${new URL('/.well-known/agent-tools.json', siteUrl).href})`,
    '',
    '## Optional',
    `- [Sitemap](${new URL('/sitemap.xml', siteUrl).href})`,
    `- [robots.txt](${new URL('/robots.txt', siteUrl).href})`,
  )

  return `${lines.join('\n')}\n`
}
