import { headers } from 'next/headers'
import {
  createAdminUploadToken,
  getAdminPassword,
  isAdminAuthorized,
} from '@/lib/admin-auth'

/** Émis au rendu de la page admin (cookie ou Basic Auth présents). */
export async function mintAdminMenuUploadToken(): Promise<string | null> {
  const expected = getAdminPassword()
  if (!expected) return null

  const h = await headers()
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
