/** Etag Vercel Blob (32 hex) — pas une date ; ne doit pas apparaître dans l’admin. */
export function looksLikeMenuBlobEtag(value: string): boolean {
  return /^[a-f0-9]{32}$/i.test(value)
}

function parseMenuUploadedInstant(uploadedAt: string | null): Date | null {
  if (!uploadedAt || looksLikeMenuBlobEtag(uploadedAt)) return null
  const asDate = new Date(uploadedAt)
  if (Number.isNaN(asDate.getTime())) return null
  return asDate
}

const PARIS_TZ = 'Europe/Paris'

function localePrefix(localeTag: string): string {
  return localeTag.split('-')[0]?.toLowerCase() ?? localeTag.toLowerCase()
}

/** Connecteur date → heure (24 h, fuseau Paris) selon la langue. */
function menuUpdatedTimeConnector(localeTag: string): string {
  const lang = localePrefix(localeTag)
  switch (lang) {
    case 'fr':
      return ' à '
    case 'en':
      return ' at '
    case 'de':
      return ' um '
    case 'es':
      return ' a las '
    case 'it':
      return ' alle '
    case 'pt':
      return ' às '
    case 'ru':
      return ' в '
    case 'sv':
      return ' kl. '
    case 'zh':
      return ' '
    case 'ja':
      return ' '
    case 'ko':
      return ' '
    case 'ar':
      return ' في '
    default:
      return ' at '
  }
}

function formatMenuTimeParis24h(date: Date, localeTag: string): string {
  const lang = localePrefix(localeTag)
  if (lang === 'fr' || localeTag === 'zgh') {
    const parts = new Intl.DateTimeFormat('fr-FR', {
      timeZone: PARIS_TZ,
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(date)
    const hour = parts.find((p) => p.type === 'hour')?.value ?? ''
    const minute = parts.find((p) => p.type === 'minute')?.value ?? ''
    return `${hour}h${minute}`
  }

  return date.toLocaleTimeString(localeTag, {
    timeZone: PARIS_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

/**
 * Date/heure de mise en ligne pour l’admin.
 * Toujours passer `uploadedAt` du statut menu, jamais `revision` (cache / etag).
 */
export function formatMenuUploadedAt(uploadedAt: string | null): string {
  const asDate = parseMenuUploadedInstant(uploadedAt)
  if (!asDate) return '—'
  return asDate.toLocaleString('fr-FR', {
    timeZone: PARIS_TZ,
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

/**
 * Date + heure « naturelles » pour l’intro menu (ex. lundi 5 octobre à 11h30), fuseau Paris.
 */
export function formatMenuUpdatedDateLong(
  uploadedAt: string | null,
  localeTag: string,
): string | null {
  const asDate = parseMenuUploadedInstant(uploadedAt)
  if (!asDate) return null

  const datePart = asDate.toLocaleDateString(localeTag, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: PARIS_TZ,
  })

  const timePart = formatMenuTimeParis24h(asDate, localeTag)
  const connector = menuUpdatedTimeConnector(localeTag)
  const combined = `${datePart}${connector}${timePart}`

  if (localeTag.startsWith('fr') || localeTag === 'zgh') {
    return combined.charAt(0).toUpperCase() + combined.slice(1)
  }

  return combined
}
