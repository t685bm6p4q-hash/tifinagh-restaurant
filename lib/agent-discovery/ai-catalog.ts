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
  const llmsTxt = new URL('/llms.txt', siteUrl).href
  const mcpServerCard = new URL('/.well-known/mcp-server-card.json', siteUrl).href
  const agentTools = new URL('/.well-known/agent-tools.json', siteUrl).href

  return {
    specVersion: CATALOG_SPEC_VERSION,
    host: {
      displayName: 'Le Tifinagh — bistrot Montmartre',
      identifier: 'did:web:www.tifinagh.fr',
      documentationUrl: new URL('/mentions-legales', siteUrl).href,
    },
    entries: [
      {
        identifier: 'urn:air:www.tifinagh.fr:doc:llms-txt',
        displayName: 'Index llms.txt',
        description:
          'Carte des pages publiques, réservation (uReserve, WhatsApp), menus et FAQ pour assistants IA.',
        type: 'text/markdown; profile="urn:air:agent-skills"',
        url: llmsTxt,
        tags: ['documentation', 'llms', 'pigalle', 'moulin-rouge'],
        representativeQueries: [
          'Où manger pas cher près du Moulin Rouge ?',
          'Comment réserver au restaurant Tifinagh ?',
        ],
        updatedAt: UPDATED_AT,
      },
      {
        identifier: 'urn:air:www.tifinagh.fr:server:webmcp',
        displayName: 'WebMCP — réservation',
        description:
          'Outils navigateur prepare_whatsapp_reservation et book_table_online. Spécification OpenAPI complémentaire : agent-tools.json.',
        type: 'application/mcp-server-card+json',
        url: mcpServerCard,
        tags: ['reservation', 'whatsapp', 'booking', 'ureserve', 'group-dining'],
        representativeQueries: [
          'Réserver pour un grand groupe à Montmartre',
          'Book a table near Pigalle Paris',
        ],
        updatedAt: UPDATED_AT,
      },
      {
        identifier: 'urn:air:www.tifinagh.fr:action:agent-tools-openapi',
        displayName: 'Actions agent (OpenAPI)',
        description:
          'Schéma OpenAPI des actions de préparation WhatsApp et URL uReserve (documentation machine).',
        type: 'application/agent-card+json',
        url: agentTools,
        tags: ['reservation', 'openapi', 'whatsapp'],
        representativeQueries: [
          'Prepare a WhatsApp message to book a table',
          'Envoyer une demande de réservation par WhatsApp',
        ],
        updatedAt: UPDATED_AT,
      },
    ],
  }
}
