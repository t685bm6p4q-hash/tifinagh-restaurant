import { siteUrl } from '@/lib/seo'

/** Carte MCP (WebMCP côté navigateur — pas de endpoint HTTP distant). */
export function buildMcpServerCard(): Record<string, unknown> {
  return {
    $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
    name: 'fr.tifinagh/web',
    version: '1.0.0',
    description:
      'Outils WebMCP sur tifinagh.fr : prepare_whatsapp_reservation et book_table_online (voir pages avec JavaScript).',
    websiteUrl: siteUrl,
  }
}
