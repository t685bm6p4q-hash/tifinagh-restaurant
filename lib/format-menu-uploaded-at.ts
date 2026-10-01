/** Etag Vercel Blob (32 hex) — pas une date ; ne doit pas apparaître dans l’admin. */
function looksLikeMenuBlobEtag(value: string): boolean {
  return /^[a-f0-9]{32}$/i.test(value)
}

/**
 * Date/heure de mise en ligne pour l’admin.
 * Toujours passer `uploadedAt` du statut menu, jamais `revision` (cache / etag).
 */
export function formatMenuUploadedAt(uploadedAt: string | null): string {
  if (!uploadedAt || looksLikeMenuBlobEtag(uploadedAt)) return '—'
  const asDate = new Date(uploadedAt)
  if (Number.isNaN(asDate.getTime())) return '—'
  return asDate.toLocaleString('fr-FR', {
    timeZone: 'Europe/Paris',
    dateStyle: 'short',
    timeStyle: 'short',
  })
}
