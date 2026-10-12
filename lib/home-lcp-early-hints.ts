import type { NextResponse } from 'next/server'

export function isHomeMarketingPath(pathname: string): boolean {
  return pathname === '/'
}

/** Preload HTTP Link — déclenché avant le HTML (accueil uniquement). */
export function appendHomeHeroEarlyHints(response: NextResponse): void {
  const hints = [
    '</images/hero-salle-480.avif>; rel=preload; as=image; type=image/avif; fetchpriority=high',
    '</images/hero-salle-640.avif>; rel=preload; as=image; type=image/avif; fetchpriority=high',
  ]
  for (const value of hints) {
    response.headers.append('Link', value)
  }
}
