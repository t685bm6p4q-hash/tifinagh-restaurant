/** Routage admin dans proxy.ts — fonctions pures testables sans dépendance Next. */

/**
 * Chemins admin publics (sans préfixe /en). Le proxy réécrit vers /{locale}/admin/…
 * L’auth Basic + cookies DOIT s’exécuter avant ce rewrite (régression oct. 2026).
 */
export function isAdminInternalPath(pathname: string): boolean {
  return pathname.startsWith('/admin')
}

/** Cible rewrite App Router pour une URL /admin/* (fr = préfixe interne Next). */
export function adminLocaleRewritePath(pathname: string, locale: string = 'fr'): string {
  const suffix = pathname === '/' ? '' : pathname
  return `/${locale}${suffix}`
}

/**
 * True si l’URL publique doit être réécrite avant le rendu (ex. /admin/menu-setup → /fr/admin/menu-setup).
 */
export function adminNeedsLocaleRewrite(rawPathname: string, pathname: string, locale: string = 'fr'): boolean {
  if (!isAdminInternalPath(pathname)) return false
  return adminLocaleRewritePath(pathname, locale) !== rawPathname
}

/**
 * Ordre requis dans proxy.ts : bloc `if (pathname.startsWith('/admin'))` avant le rewrite marketing générique.
 */
export function assertAdminProxyRoutingOrder(source: string): { ok: true } | { ok: false; reason: string } {
  const adminGateNeedle = 'if (isAdminInternalPath(pathname))'
  const marketingRewriteNeedle = 'const routedPathname =\n    !localeFromPath'

  const effectiveAdminIdx = source.indexOf(adminGateNeedle)
  const marketingIdx = source.indexOf(marketingRewriteNeedle)

  if (effectiveAdminIdx < 0) {
    return { ok: false, reason: 'Bloc admin introuvable dans proxy.ts (isAdminInternalPath)' }
  }

  if (marketingIdx < 0) {
    return { ok: false, reason: 'Bloc rewrite marketing introuvable' }
  }
  if (effectiveAdminIdx > marketingIdx) {
    return {
      ok: false,
      reason:
        'Régression : le rewrite locale marketing est placé AVANT le gate /admin — la page admin serait publique.',
    }
  }

  const gateCall = source.indexOf('const gate = adminGate(request)', effectiveAdminIdx)
  if (gateCall < 0 || gateCall > effectiveAdminIdx + 800) {
    return { ok: false, reason: 'adminGate() doit être appelé dans le bloc /admin' }
  }

  return { ok: true }
}
