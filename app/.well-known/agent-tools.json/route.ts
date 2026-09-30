import { buildAgentToolsOpenApi } from '@/lib/agent-discovery/agent-tools-openapi'

export const revalidate = 86400

export function GET() {
  const body = JSON.stringify(buildAgentToolsOpenApi(), null, 2)
  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
