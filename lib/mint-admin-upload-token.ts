import { headers } from 'next/headers'
import {
  ADMIN_UPLOAD_TOKEN_HEADER,
  createAdminUploadToken,
  getAdminPassword,
  isAdminAuthorized,
  verifyAdminUploadToken,
} from '@/lib/admin-auth'

/** Émis au rendu de la page admin (cookie, Basic Auth ou en-tête interne proxy). */
export async function mintAdminMenuUploadToken(): Promise<string | null> {
  const expected = getAdminPassword()
  if (!expected) return null

  const h = await headers()
  const fromProxy = h.get(ADMIN_UPLOAD_TOKEN_HEADER)?.trim()
  if (fromProxy && verifyAdminUploadToken(fromProxy, expected)) {
    return fromProxy
  }

  const request = new Request('https://www.tifinagh.fr/admin/menu-setup', {
    headers: {
      cookie: h.get('cookie') ?? '',
      authorization: h.get('authorization') ?? '',
      'x-forwarded-for': h.get('x-forwarded-for') ?? '',
    },
  })

  if (!isAdminAuthorized(request)) return null
  return createAdminUploadToken(expected)
}
