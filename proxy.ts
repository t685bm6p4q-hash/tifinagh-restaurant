import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  ADMIN_UPLOAD_TOKEN_HEADER,
  createAdminUploadToken,
  getAdminPassword,
  hasValidAdminSession,
  isAdminRateLimited,
  passwordFromRequestBasicAuth,
  recordAdminAuthFailure,
  safeEqual,
  setAdminAuthCookies,
} from '@/lib/admin-auth'
import { buildContentSecurityPolicy, createCspNonce } from '@/lib/csp'
import { canonicalHost } from '@/lib/seo'
import { defaultLocale, isLocale, localeCookieName, type Locale } from '@/lib/i18n/config'
import {
  adminLocaleRewritePath,
  isAdminInternalPath,
} from '@/lib/admin-proxy-routing'
import {
  cookieLocaleRedirectPath,
  resolveRequestLocale,
  stripLocalePrefix,
} from '@/lib/i18n/locale-path'

function withHtmlCsp(
  request: NextRequest,
  locale: Locale,
  applyHeaders?: (response: NextResponse) => void,
  requestHeaderPatch?: (headers: Headers) => void,
): NextResponse {
  const nonce = createCspNonce()
  const requestHeaders = new Headers(request.headers)
  requestHeaders.delete(ADMIN_UPLOAD_TOKEN_HEADER)
  requestHeaderPatch?.(requestHeaders)
  requestHeaders.set('x-nonce', nonce)
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

function withMarketingResponse(
  response: NextResponse,
  pathname: string,
  options?: { localeFromPath?: string | null; method?: string },
) {
  if (options?.localeFromPath) {
    syncLocalePathCookie(response, options.localeFromPath)
  }
  applyPublicHtmlEdgeCache(response, pathname, options?.method ?? 'GET')
  return response
}

function decorateAdminHtmlResponse(response: NextResponse, expectedPassword: string): NextResponse {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  response.headers.set('Cache-Control', 'no-store')
  setAdminAuthCookies(response, expectedPassword)
  return response
}

type AdminGateOk = { ok: true; expectedPassword: string }
type AdminGateFail = { ok: false; response: NextResponse }

function adminGate(request: NextRequest): AdminGateOk | AdminGateFail {
  const expected = getAdminPassword()
  if (!expected) {
    return {
      ok: false,
      response: new NextResponse(
        'Espace admin indisponible : configurez MENU_ADMIN_PASSWORD sur Vercel.',
        {
          status: 503,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
            'X-Robots-Tag': 'noindex, nofollow',
          },
        },
      ),
    }
  }

  if (hasValidAdminSession(request, expected)) {
    return { ok: true, expectedPassword: expected }
  }

  if (isAdminRateLimited(request)) {
    return {
      ok: false,
      response: new NextResponse('Trop de tentatives — réessayez dans 15 minutes.', {
        status: 429,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Retry-After': '900',
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }),
    }
  }

  const password = passwordFromRequestBasicAuth(request)
  if (password && safeEqual(password, expected)) {
    return { ok: true, expectedPassword: expected }
  }
  if (password) recordAdminAuthFailure(request)

  return {
    ok: false,
    response: new NextResponse('Authentification requise', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Tifinagh Admin", charset="UTF-8"',
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    }),
  }
}

function adminRequestHeaderPatch(expectedPassword: string) {
  return (headers: Headers) => {
    headers.set(ADMIN_UPLOAD_TOKEN_HEADER, createAdminUploadToken(expectedPassword))
  }
}

/**
 * Redirige vers www (évite la boucle Google apex ↔ www) et l'alias *.vercel.app.
 * Gate HTTP Basic Auth sur /admin/* avant tout rendu HTML.
 * Sans MENU_ADMIN_PASSWORD → 503 (fail-closed, jamais d'admin ouvert).
 * Rewrite locale + CSP nonce ; hint CDN sur le HTML marketing.
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
  const siteLocale = isAdminInternalPath(pathname)
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
      return withMarketingResponse(response, pathname, { localeFromPath, method: requestMethod })
    }
  }

  if (!isAdminInternalPath(pathname)) {
    const cookieRedirect = cookieLocaleRedirectPath(pathname, localeFromPath, localeCookie)
    if (cookieRedirect && cookieRedirect !== rawPathname) {
      const url = request.nextUrl.clone()
      url.pathname = cookieRedirect
      return NextResponse.redirect(url, 307)
    }
  }

  if (
    localeFromPath === defaultLocale &&
    rawPathname.startsWith(`/${defaultLocale}`) &&
    rawPathname !== pathname
  ) {
    const url = request.nextUrl.clone()
    url.pathname = pathname
    return NextResponse.redirect(url, 308)
  }

  if (isAdminInternalPath(pathname)) {
    const gate = adminGate(request)
    if (!gate.ok) return gate.response

    const routedPathname = adminLocaleRewritePath(pathname, defaultLocale)
    const patch = adminRequestHeaderPatch(gate.expectedPassword)

    if (routedPathname !== rawPathname) {
      const nonce = createCspNonce()
      const requestHeaders = new Headers(request.headers)
      requestHeaders.delete(ADMIN_UPLOAD_TOKEN_HEADER)
      patch(requestHeaders)
      requestHeaders.set('x-nonce', nonce)
      const url = request.nextUrl.clone()
      url.pathname = routedPathname
      const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
      response.headers.set('Content-Security-Policy', buildContentSecurityPolicy(nonce))
      decorateAdminHtmlResponse(response, gate.expectedPassword)
      return withMarketingResponse(response, pathname, { localeFromPath, method: requestMethod })
    }

    const response = withHtmlCsp(request, defaultLocale, undefined, patch)
    decorateAdminHtmlResponse(response, gate.expectedPassword)
    return withMarketingResponse(response, pathname, { localeFromPath, method: requestMethod })
  }

  const internalLocalePath = (locale: Locale, internalPath: string) => {
    const suffix = internalPath === '/' ? '' : internalPath
    return `/${locale}${suffix}`
  }

  const routedPathname =
    !localeFromPath
      ? internalLocalePath(siteLocale, pathname)
      : rawPathname

  if (routedPathname !== rawPathname) {
    const nonce = createCspNonce()
    const requestHeaders = new Headers(request.headers)
    requestHeaders.delete(ADMIN_UPLOAD_TOKEN_HEADER)
    requestHeaders.set('x-nonce', nonce)
    const url = request.nextUrl.clone()
    url.pathname = routedPathname
    const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
    response.headers.set('Content-Security-Policy', buildContentSecurityPolicy(nonce))
    return withMarketingResponse(response, pathname, { localeFromPath, method: requestMethod })
  }

  return withMarketingResponse(withHtmlCsp(request, siteLocale), pathname, {
    localeFromPath,
    method: requestMethod,
  })
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|fonts|analytics|favicon.ico|icon.webp|icon.png|apple-touch-icon.png|.*\\.(?:webp|png|jpg|jpeg|gif|svg|ico|pdf|js|mjs|woff2?)$).*)',
  ],
}
