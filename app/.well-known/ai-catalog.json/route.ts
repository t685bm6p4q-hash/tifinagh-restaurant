import { buildAiCatalog } from '@/lib/agent-discovery/ai-catalog'

export const revalidate = 3600

export function GET() {
  const body = JSON.stringify(buildAiCatalog(), null, 2)
  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
