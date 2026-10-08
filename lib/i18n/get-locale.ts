import { type Locale } from './config'
import { dictionaries } from './dictionaries'
import type { Dictionary } from './types'

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
