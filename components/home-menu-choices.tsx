import { CalendarDaysIcon, ChefHatIcon } from '@/components/icons'
import { LocalizedLink } from '@/components/localized-link'
import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/i18n/types'

export type HomeMenuChoicesCopy = Pick<
  Dictionary['home'],
  'menuChoicesHint' | 'menuChoiceDaily' | 'menuChoiceCarte'
>

type HomeMenuChoicesProps = {
  copy: HomeMenuChoicesCopy
  locale: Locale
  /** hero: sur fond sombre du bandeau ; banner: texte clair ; section: fond sombre de la preview */
  variant: 'banner' | 'section'
  showHint?: boolean
}

export function HomeMenuChoices({ copy, locale, variant, showHint = true }: HomeMenuChoicesProps) {
  return (
    <div className={`home-menu-choices home-menu-choices--${variant}`}>
      {showHint && copy.menuChoicesHint ? (
        <p className="home-menu-choices-hint">{copy.menuChoicesHint}</p>
      ) : null}
      <div className="home-menu-choices-buttons">
        <LocalizedLink
          className="home-menu-choice-btn home-menu-choice-btn--daily"
          href="/menu-du-jour"
          locale={locale}
          prefetch={false}
        >
          <CalendarDaysIcon size={17} aria-hidden="true" />
          {copy.menuChoiceDaily}
        </LocalizedLink>
        <LocalizedLink className="home-menu-choice-btn home-menu-choice-btn--carte" href="/carte" locale={locale} prefetch={false}>
          <ChefHatIcon size={17} aria-hidden="true" />
          {copy.menuChoiceCarte}
        </LocalizedLink>
      </div>
    </div>
  )
}
