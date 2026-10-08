import { cache } from 'react'
import { defaultLocale, type Locale } from './config'

/** Slot par requête React (pas de headers()) — rempli par app/[locale]/layout.tsx. */
const localeSlot = cache(() => ({ value: null as Locale | null }))

export function setRequestLocale(locale: Locale): void {
  localeSlot().value = locale
}

export function peekRequestLocale(): Locale | null {
  return localeSlot().value
}

export function getRequestLocale(): Locale {
  return localeSlot().value ?? defaultLocale
}
