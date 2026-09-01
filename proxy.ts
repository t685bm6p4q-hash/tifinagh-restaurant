import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAdminPassword, safeEqual } from '@/lib/admin-auth'

function withPathname(response: NextResponse, pathname: string) {
  response.headers.set('x-pathname', pathname)
  return response
}

/**
 * Gate HTTP Basic Auth sur /admin/* avant tout rendu HTML.
 * Sans MENU_ADMIN_PASSWORD → 503 (fail-closed, jamais d'admin ouvert).
 * Injecte x-pathname pour la nav active côté serveur (zero JS client).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

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

    const auth = request.headers.get('authorization')
    if (auth?.startsWith('Basic ')) {
      try {
        const decoded = atob(auth.slice(6))
        const colon = decoded.indexOf(':')
        const password = colon >= 0 ? decoded.slice(colon + 1) : ''
        if (safeEqual(password, expected)) {
          const response = NextResponse.next()
          response.headers.set('X-Robots-Tag', 'noindex, nofollow')
          response.headers.set('Cache-Control', 'no-store')
          return withPathname(response, pathname)
        }
      } catch {
        // Identifiants invalides → challenge ci-dessous.
      }
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
    '/((?!_next/static|_next/image|.*\\.(?:webp|png|jpg|jpeg|gif|svg|ico|pdf|txt|xml)$).*)',
  ],
}
