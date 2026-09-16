'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { isLocale, localeCookieName } from './config'

export async function setLocaleAction(formData: FormData) {
  const locale = formData.get('locale')
  if (typeof locale !== 'string' || !isLocale(locale)) return

  const store = await cookies()
  store.set(localeCookieName, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  revalidatePath('/', 'layout')
}
