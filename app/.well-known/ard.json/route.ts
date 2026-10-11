import { buildAiCatalog } from '@/lib/agent-discovery/ai-catalog'

export const revalidate = 3600

/** Alias ARD v0.91 — même manifeste que `ai-catalog.json`. */
export function GET() {
  const body = JSON.stringify(buildAiCatalog(), null, 2)
  return new Response(body, {
    headers: {
      'Content-Type': 'application/ai-catalog+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
