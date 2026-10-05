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

/**
 * Date/heure de mise en ligne pour l’admin.
 * Toujours passer `uploadedAt` du statut menu, jamais `revision` (cache / etag).
 */
export function formatMenuUploadedAt(uploadedAt: string | null): string {
  const asDate = parseMenuUploadedInstant(uploadedAt)
  if (!asDate) return '—'
  return asDate.toLocaleString('fr-FR', {
    timeZone: 'Europe/Paris',
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

/** Date « naturelle » pour la page menu (ex. lundi 5 octobre), fuseau Paris. */
export function formatMenuUpdatedDateLong(
  uploadedAt: string | null,
  localeTag: string,
): string | null {
  const asDate = parseMenuUploadedInstant(uploadedAt)
  if (!asDate) return null
  const formatted = asDate.toLocaleDateString(localeTag, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/Paris',
  })
  if (localeTag.startsWith('fr')) {
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  }
  return formatted
}
