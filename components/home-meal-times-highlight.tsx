import { LocalizedLink } from '@/components/localized-link'
import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/i18n/types'

type HomeMealTimesCopy = Pick<
  Dictionary['home'],
  'mealTimesTitle' | 'mealTimesLunch' | 'mealTimesEvening' | 'mealTimesCta'
>

export function HomeMealTimesHighlight({
  copy,
  locale,
}: {
  copy: HomeMealTimesCopy
  locale: Locale
}) {
  return (
    <div className="hero-meal-times" aria-label={copy.mealTimesTitle}>
      <p className="hero-meal-times-title">{copy.mealTimesTitle}</p>
      <ul className="hero-meal-times-list">
        <li className="hero-meal-times-item hero-meal-times-item--lunch">{copy.mealTimesLunch}</li>
        <li className="hero-meal-times-item hero-meal-times-item--evening">{copy.mealTimesEvening}</li>
      </ul>
      <LocalizedLink className="hero-meal-times-link" href="/menu-du-jour" locale={locale} prefetch={false}>
        {copy.mealTimesCta}
      </LocalizedLink>
    </div>
  )
}
