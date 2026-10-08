import { createContext } from 'react'
import { defaultLocale, type Locale } from './config'

/** Locale du segment `app/[locale]` — fiable en SSG ISR. */
export const LocaleContext = createContext<Locale>(defaultLocale)
