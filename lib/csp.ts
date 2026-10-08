/** Politique CSP pages HTML (sans unsafe-inline sur les scripts). */
export function buildContentSecurityPolicy(nonce: string): string {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "form-action 'self' https://wa.me https://api.whatsapp.com https://booking.ureserve.co",
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "img-src 'self' data: blob: https://res.cloudinary.com https://*.googleapis.com https://*.gstatic.com https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com https://connect.facebook.net",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://connect.facebook.net`,
    "script-src-attr 'none'",
    "worker-src 'self' blob:",
    "connect-src 'self' https://wa.me https://api.whatsapp.com https://*.public.blob.vercel-storage.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://www.facebook.com https://connect.facebook.net https://graph.facebook.com",
    'upgrade-insecure-requests',
  ].join('; ')
}

export function createCspNonce(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}
