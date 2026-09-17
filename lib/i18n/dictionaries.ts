import { de } from './de'
import { en } from './en'
import { es } from './es'
import { fr } from './fr'
import { it } from './it'
import { pt } from './pt'
import { ru } from './ru'
import { sv } from './sv'
import { zh } from './zh'
import { zgh } from './zgh'
import type { Locale } from './config'
import type { Dictionary } from './types'

export const dictionaries: Record<Locale, Dictionary> = {
  fr,
  en,
  es,
  it,
  zh,
  de,
  pt,
  ru,
  sv,
  zgh,
}
