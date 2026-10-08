import Link from 'next/link'
import { CalendarDaysIcon, ChefHatIcon } from '@/components/icons'
import type { Dictionary } from '@/lib/i18n/types'

export type HomeMenuChoicesCopy = Pick<
  Dictionary['home'],
  'menuChoicesHint' | 'menuChoiceDaily' | 'menuChoiceCarte'
>

type HomeMenuChoicesProps = {
  copy: HomeMenuChoicesCopy
  /** hero: sur fond sombre du bandeau ; banner: texte clair ; section: fond sombre de la preview */
  variant: 'banner' | 'section'
  showHint?: boolean
}

export function HomeMenuChoices({ copy, variant, showHint = true }: HomeMenuChoicesProps) {
  return (
    <div className={`home-menu-choices home-menu-choices--${variant}`}>
      {showHint && copy.menuChoicesHint ? (
        <p className="home-menu-choices-hint">{copy.menuChoicesHint}</p>
      ) : null}
      <div className="home-menu-choices-buttons">
        <Link
          className="home-menu-choice-btn home-menu-choice-btn--daily"
          href="/menu-du-jour"
          prefetch={false}
        >
          <CalendarDaysIcon size={17} aria-hidden="true" />
          {copy.menuChoiceDaily}
        </Link>
        <Link className="home-menu-choice-btn home-menu-choice-btn--carte" href="/carte" prefetch={false}>
          <ChefHatIcon size={17} aria-hidden="true" />
          {copy.menuChoiceCarte}
        </Link>
      </div>
    </div>
  )
}
