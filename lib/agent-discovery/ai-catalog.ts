import { siteUrl } from '@/lib/seo'

const CATALOG_SPEC_VERSION = '1.0'
const UPDATED_AT = '2026-10-01T00:00:00.000Z'

export type AiCatalogManifest = {
  specVersion: string
  host: {
    displayName: string
    identifier?: string
    documentationUrl?: string
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
  const mcpServerCard = new URL('/.well-known/mcp-server-card.json', siteUrl).href

  return {
    specVersion: CATALOG_SPEC_VERSION,
    host: {
      displayName: 'Le Tifinagh',
      identifier: 'did:web:www.tifinagh.fr',
      documentationUrl: new URL('/mentions-legales', siteUrl).href,
    },
    entries: [
      {
        identifier: 'urn:air:www.tifinagh.fr:server:webmcp',
        displayName: 'Réservation WebMCP',
        description:
          'Outils navigateur prepare_whatsapp_reservation et book_table_online (uReserve et WhatsApp). Pages HTML, menus PDF et index complet : voir /llms.txt.',
        type: 'application/mcp-server-card+json',
        url: mcpServerCard,
        tags: [
          'reservation',
          'whatsapp',
          'booking',
          'ureserve',
          'pigalle',
          'moulin-rouge',
          'group-dining',
          'avant-spectacle',
          'après-spectacle',
          'calme',
          'La Cigale',
          'ouvert tard',
        ],
        representativeQueries: [
          'Où trouver un restaurant calme près de Montmartre sans touristes ?',
          'Où dîner tard après un concert à La Cigale ?',
          'Restaurant avant spectacle Place de Clichy ouvert jusqu’à minuit',
        ],
        updatedAt: UPDATED_AT,
      },
    ],
  }
}
