import { onlineBookingUrl, reservationWhatsAppFormHref } from '@/lib/restaurant-data'
import { restaurant, siteUrl } from '@/lib/seo'

const CATALOG_SPEC_VERSION = '1.0'
const UPDATED_AT = '2026-10-01T00:00:00.000Z'

export type AiCatalogManifest = {
  specVersion: string
  host: {
    name: string
    url: string
    documentationUrl: string
  }
  entries: AiCatalogEntry[]
}

export type AiCatalogEntry = {
  identifier: string
  displayName: string
  description: string
  type: string
  url: string
  tags: string[]
  representativeQueries: string[]
  updatedAt: string
}

export function buildAiCatalog(): AiCatalogManifest {
  const bookingUrl = onlineBookingUrl('fr')
  const reservationPage = new URL('/reservation', siteUrl).href
  const whatsappForm = new URL(reservationWhatsAppFormHref, siteUrl).href
  const menuPdf = new URL('/api/menu-pdf', siteUrl).href
  const llmsTxt = new URL('/llms.txt', siteUrl).href
  const agentTools = new URL('/.well-known/agent-tools.json', siteUrl).href

  return {
    specVersion: CATALOG_SPEC_VERSION,
    host: {
      name: restaurant.name,
      url: siteUrl,
      documentationUrl: new URL('/mentions-legales', siteUrl).href,
    },
    entries: [
      {
        identifier: 'urn:air:www.tifinagh.fr:service:online-booking',
        displayName: 'Réservation en ligne (uReserve)',
        description:
          'Réserver une table avec confirmation enregistrée. Canal recommandé pour les créneaux à date fixe.',
        type: 'application/link+json',
        url: bookingUrl,
        tags: ['reservation', 'booking', 'ureserve'],
        representativeQueries: [
          'Réserver une table pour deux demain à 12h30',
          'Book a table for tonight at 8pm',
        ],
        updatedAt: UPDATED_AT,
      },
      {
        identifier: 'urn:air:www.tifinagh.fr:action:whatsapp-reservation',
        displayName: 'Demande de réservation via WhatsApp',
        description:
          'Prépare un message WhatsApp structuré (nom, téléphone, date, heure, couverts). L’utilisateur doit envoyer le message dans WhatsApp pour confirmer.',
        type: 'application/vnd.oai.openapi+json',
        url: agentTools,
        tags: ['reservation', 'whatsapp', 'messaging'],
        representativeQueries: [
          'Envoyer une demande de réservation par WhatsApp',
          'Prepare a WhatsApp message to book a table',
        ],
        updatedAt: UPDATED_AT,
      },
      {
        identifier: 'urn:air:www.tifinagh.fr:page:reservation',
        displayName: 'Page réservation',
        description: 'Téléphone, réservation en ligne uReserve et formulaire WhatsApp.',
        type: 'text/html',
        url: reservationPage,
        tags: ['reservation', 'contact'],
        representativeQueries: [
          'Comment réserver au restaurant Tifinagh ?',
          'What are the booking options at Tifinagh?',
        ],
        updatedAt: UPDATED_AT,
      },
      {
        identifier: 'urn:air:www.tifinagh.fr:resource:menu-du-jour',
        displayName: 'Menu du jour (PDF)',
        description: 'Menu du jour mis à jour chaque matin (PDF ou image).',
        type: 'application/pdf',
        url: menuPdf,
        tags: ['menu', 'food'],
        representativeQueries: [
          'Quel est le menu du jour chez Tifinagh ?',
          'Show today’s set menu at Tifinagh',
        ],
        updatedAt: UPDATED_AT,
      },
      {
        identifier: 'urn:air:www.tifinagh.fr:doc:llms-txt',
        displayName: 'Index llms.txt',
        description: 'Carte des pages publiques pour assistants IA.',
        type: 'text/plain',
        url: llmsTxt,
        tags: ['documentation', 'llms'],
        representativeQueries: [
          'What public pages does tifinagh.fr expose?',
          'Liste des ressources du site Tifinagh',
        ],
        updatedAt: UPDATED_AT,
      },
      {
        identifier: 'urn:air:www.tifinagh.fr:page:whatsapp-form',
        displayName: 'Formulaire WhatsApp réservation',
        description: 'Ancre du formulaire de demande de réservation WhatsApp sur le site.',
        type: 'text/html',
        url: whatsappForm,
        tags: ['reservation', 'whatsapp', 'form'],
        representativeQueries: [
          'Ouvrir le formulaire WhatsApp pour réserver',
          'Fill the WhatsApp reservation form',
        ],
        updatedAt: UPDATED_AT,
      },
    ],
  }
}
