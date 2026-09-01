import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAdminPassword, safeEqual } from '@/lib/admin-auth'

/**
 * Gate HTTP Basic Auth sur /admin/* avant tout rendu HTML.
 * Sans MENU_ADMIN_PASSWORD → 503 (fail-closed, jamais d'admin ouvert).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

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
        return response
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

export const config = {
  matcher: ['/admin/:path*'],
}
