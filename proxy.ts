import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  getAdminPassword,
  hasValidAdminSession,
  passwordFromRequestBasicAuth,
  safeEqual,
  setAdminSessionCookie,
} from '@/lib/admin-auth'
import { canonicalHost } from '@/lib/seo'

function withPathname(response: NextResponse, pathname: string) {
  response.headers.set('x-pathname', pathname)
  response.headers.set('Vary', 'Cookie')
  return response
}

/**
 * Redirige vers www (évite la boucle Google apex ↔ www) et l'alias *.vercel.app.
 * Gate HTTP Basic Auth sur /admin/* avant tout rendu HTML.
 * Sans MENU_ADMIN_PASSWORD → 503 (fail-closed, jamais d'admin ouvert).
 * Injecte x-pathname pour la nav active côté serveur (zero JS client).
 */
function requestHost(request: NextRequest): string {
  const [hostname] = (request.headers.get('host') ?? '').split(':')
  return (hostname ?? '').toLowerCase()
}

function isLocalHost(host: string): boolean {
  return host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0'
}

function canonicalRedirect(request: NextRequest, status: 301 | 308) {
  const url = request.nextUrl.clone()
  url.protocol = 'https:'
  url.hostname = canonicalHost
  url.port = ''
  return NextResponse.redirect(url, status)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = requestHost(request)

  if (!isLocalHost(host) && host !== canonicalHost) {
    if (host === 'tifinagh.fr') {
      return canonicalRedirect(request, 308)
    }
    if (host.endsWith('.vercel.app') && process.env.VERCEL_ENV === 'production') {
      return canonicalRedirect(request, 301)
    }
    if (host.endsWith('.vercel.app')) {
      const response = NextResponse.next()
      response.headers.set('X-Robots-Tag', 'noindex, nofollow')
      return withPathname(response, pathname)
    }
  }

  if (pathname.startsWith('/admin')) {
    const expected = getAdminPassword()
    if (!expected) {
      return new NextResponse(
        'Espace admin indisponible : configurez MENU_ADMIN_PASSWORD sur Vercel.',
        {
          status: 503,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
            'X-Robots-Tag': 'noindex, nofollow',
          },
        },
      )
    }

    if (hasValidAdminSession(request, expected)) {
      const response = NextResponse.next()
      response.headers.set('X-Robots-Tag', 'noindex, nofollow')
      response.headers.set('Cache-Control', 'no-store')
      return withPathname(response, pathname)
    }

    const password = passwordFromRequestBasicAuth(request)
    if (password && safeEqual(password, expected)) {
      const response = NextResponse.next()
      response.headers.set('X-Robots-Tag', 'noindex, nofollow')
      response.headers.set('Cache-Control', 'no-store')
      setAdminSessionCookie(response, expected)
      return withPathname(response, pathname)
    }

    return new NextResponse('Authentification requise', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Tifinagh Admin", charset="UTF-8"',
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }

  return withPathname(NextResponse.next(), pathname)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|.*\\.(?:webp|png|jpg|jpeg|gif|svg|ico|pdf)$).*)',
  ],
}
