import { buildMcpServerCard } from '@/lib/agent-discovery/mcp-server-card'

export const revalidate = 3600

export function GET() {
  const body = JSON.stringify(buildMcpServerCard(), null, 2)
  return new Response(body, {
    headers: {
      'Content-Type': 'application/mcp-server-card+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
