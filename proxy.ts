import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  getAdminPassword,
  hasValidAdminSession,
  isAdminRateLimited,
  passwordFromRequestBasicAuth,
  recordAdminAuthFailure,
  safeEqual,
  setAdminSessionCookie,
} from '@/lib/admin-auth'
import { buildContentSecurityPolicy, createCspNonce } from '@/lib/csp'
import { canonicalHost } from '@/lib/seo'
import { defaultLocale, isLocale, localeCookieName, type Locale } from '@/lib/i18n/config'
import {
  cookieLocaleRedirectPath,
  resolveRequestLocale,
  stripLocalePrefix,
} from '@/lib/i18n/locale-path'

function withHtmlCsp(
  request: NextRequest,
  locale: Locale,
  applyHeaders?: (response: NextResponse) => void,
): NextResponse {
  const nonce = createCspNonce()
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('x-locale', locale)
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  response.headers.set('Content-Security-Policy', buildContentSecurityPolicy(nonce))
  applyHeaders?.(response)
  return response
}

function syncLocalePathCookie(response: NextResponse, localeFromPath: string | null | undefined) {
  if (!localeFromPath || !isLocale(localeFromPath)) return
  response.cookies.set(localeCookieName, localeFromPath, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}

/** Pages marketing : hint CDN (locale = URL /en/… ; menu et admin restent frais). */
const PUBLIC_HTML_EDGE_CACHE =
  'public, s-maxage=3600, stale-while-revalidate=86400'

function applyPublicHtmlEdgeCache(
  response: NextResponse,
  pathname: string,
  method: string,
) {
  if (method !== 'GET' && method !== 'HEAD') return
  if (pathname.startsWith('/admin') || pathname === '/menu-du-jour') return
  response.headers.set('CDN-Cache-Control', PUBLIC_HTML_EDGE_CACHE)
  response.headers.set('Vercel-CDN-Cache-Control', PUBLIC_HTML_EDGE_CACHE)
}

function withPathname(
  response: NextResponse,
  pathname: string,
  options?: { localeFromPath?: string | null; method?: string },
) {
  response.headers.set('x-pathname', pathname)
  if (options?.localeFromPath) {
    syncLocalePathCookie(response, options.localeFromPath)
  }
  applyPublicHtmlEdgeCache(response, pathname, options?.method ?? 'GET')
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
  const requestMethod = request.method
  const { pathname: rawPathname } = request.nextUrl
  const { pathname, localeFromPath } = stripLocalePrefix(rawPathname)
  const localeCookie = request.cookies.get(localeCookieName)?.value
  const siteLocale = pathname.startsWith('/admin')
    ? defaultLocale
    : resolveRequestLocale(localeFromPath, localeCookie)
  const host = requestHost(request)

  if (!isLocalHost(host) && host !== canonicalHost) {
    if (host === 'tifinagh.fr') {
      return canonicalRedirect(request, 308)
    }
    if (host.endsWith('.vercel.app') && process.env.VERCEL_ENV === 'production') {
      return canonicalRedirect(request, 301)
    }
    if (host.endsWith('.vercel.app')) {
      const response = withHtmlCsp(request, siteLocale, (r) => {
        r.headers.set('X-Robots-Tag', 'noindex, nofollow')
      })
      return withPathname(response, pathname, { localeFromPath, method: requestMethod })
    }
  }

  if (!pathname.startsWith('/admin')) {
    const cookieRedirect = cookieLocaleRedirectPath(pathname, localeFromPath, localeCookie)
    if (cookieRedirect && cookieRedirect !== rawPathname) {
      const url = request.nextUrl.clone()
      url.pathname = cookieRedirect
      return NextResponse.redirect(url, 307)
    }
  }

  if (localeFromPath && rawPathname !== pathname) {
    const nonce = createCspNonce()
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-nonce', nonce)
    requestHeaders.set('x-locale', siteLocale)
    const url = request.nextUrl.clone()
    url.pathname = pathname
    const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
    response.headers.set('Content-Security-Policy', buildContentSecurityPolicy(nonce))
    return withPathname(response, pathname, { localeFromPath, method: requestMethod })
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
      const response = withHtmlCsp(request, defaultLocale, (r) => {
        r.headers.set('X-Robots-Tag', 'noindex, nofollow')
        r.headers.set('Cache-Control', 'no-store')
      })
      return withPathname(response, pathname, { localeFromPath, method: requestMethod })
    }

    if (isAdminRateLimited(request)) {
      return new NextResponse('Trop de tentatives — réessayez dans 15 minutes.', {
        status: 429,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Retry-After': '900',
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      })
    }

    const password = passwordFromRequestBasicAuth(request)
    if (password && safeEqual(password, expected)) {
      const response = withHtmlCsp(request, defaultLocale, (r) => {
        r.headers.set('X-Robots-Tag', 'noindex, nofollow')
        r.headers.set('Cache-Control', 'no-store')
      })
      setAdminSessionCookie(response, expected)
      return withPathname(response, pathname, { localeFromPath, method: requestMethod })
    }
    if (password) recordAdminAuthFailure(request)

    return new NextResponse('Authentification requise', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Tifinagh Admin", charset="UTF-8"',
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }

  return withPathname(withHtmlCsp(request, siteLocale), pathname, {
    localeFromPath,
    method: requestMethod,
  })
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|fonts|analytics|favicon.ico|icon.webp|icon.png|apple-touch-icon.png|.*\\.(?:webp|png|jpg|jpeg|gif|svg|ico|pdf|js|mjs|woff2?)$).*)',
  ],
}
