import { siteUrl } from '@/lib/seo'

export function GET() {
  if (process.env.VERCEL_ENV === 'preview') {
    return new Response('User-Agent: *\nDisallow: /\n', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const aiCatalogUrl = new URL('/.well-known/ai-catalog.json', siteUrl).href
  const ardUrl = new URL('/.well-known/ard.json', siteUrl).href

  const body = [
    'User-Agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /admin',
    '',
    `Sitemap: ${new URL('/sitemap.xml', siteUrl).href}`,
    `Agentmap: ${aiCatalogUrl}`,
    `Agentmap: ${ardUrl}`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
