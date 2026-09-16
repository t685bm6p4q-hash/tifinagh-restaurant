import { en } from './en'
import { es } from './es'
import { fr } from './fr'
import { it } from './it'
import { zh } from './zh'
import type { Locale } from './config'
import type { Dictionary } from './types'

export const dictionaries: Record<Locale, Dictionary> = {
  fr,
  en,
  es,
  it,
  zh,
}
