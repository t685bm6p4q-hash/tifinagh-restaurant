/** Fenêtre glissante par IP — évite le scraping massif du menu via /api/menu-pdf. */
function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || request.headers.get('x-real-ip')?.trim() || 'unknown'
}

const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 240
const MAX_TRACKED_CLIENTS = 2000

const hits = new Map<string, { count: number; resetAt: number }>()

export function isMenuPdfRateLimited(request: Request): boolean {
  const key = clientKey(request)
  const now = Date.now()
  const entry = hits.get(key)
  if (!entry || entry.resetAt <= now) {
    if (hits.size >= MAX_TRACKED_CLIENTS) {
      for (const [k, v] of hits) {
        if (v.resetAt <= now) hits.delete(k)
      }
      if (hits.size >= MAX_TRACKED_CLIENTS) hits.clear()
    }
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > MAX_REQUESTS_PER_WINDOW
}
