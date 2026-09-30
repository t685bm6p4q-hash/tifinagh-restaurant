/** En-têtes d’intégration iframe — uniquement pour le PDF (pas sur les images : évite les Issues Chrome CSP). */
export function applyMenuEmbedHeaders(headers: Headers, contentType: string): void {
  if (contentType.startsWith('image/')) return
  if (contentType !== 'application/pdf' && !contentType.includes('pdf')) return

  headers.set('X-Frame-Options', 'SAMEORIGIN')
  headers.set('Content-Security-Policy', "default-src 'none'; frame-ancestors 'self'")
}
