/**
 * Auth admin partagée (API upload + proxy Basic Auth).
 * Fail-closed : sans MENU_ADMIN_PASSWORD, tout accès est refusé.
 */

export function getAdminPassword(): string | null {
  const value = process.env.MENU_ADMIN_PASSWORD?.trim()
  return value ? value : null
}

/** Comparaison en temps constant pour limiter les fuites de timing. */
export function safeEqual(a: string, b: string): boolean {
  const max = Math.max(a.length, b.length)
  let mismatch = a.length === b.length ? 0 : 1
  for (let i = 0; i < max; i++) {
    const ca = i < a.length ? a.charCodeAt(i) : 0
    const cb = i < b.length ? b.charCodeAt(i) : 0
    mismatch |= ca ^ cb
  }
  return mismatch === 0
}

function passwordFromBasicAuth(header: string | null): string | null {
  if (!header?.startsWith('Basic ')) return null
  try {
    const decoded = atob(header.slice(6))
    const colon = decoded.indexOf(':')
    if (colon < 0) return null
    return decoded.slice(colon + 1)
  } catch {
    return null
  }
}

/** True uniquement si le mot de passe env est défini ET fourni correctement. */
export function isAdminAuthorized(request: Request): boolean {
  const expected = getAdminPassword()
  if (!expected) return false

  const fromCustom = request.headers.get('x-menu-admin-password')
  if (fromCustom && safeEqual(fromCustom, expected)) return true

  const fromBasic = passwordFromBasicAuth(request.headers.get('authorization'))
  if (fromBasic && safeEqual(fromBasic, expected)) return true

  return false
}
