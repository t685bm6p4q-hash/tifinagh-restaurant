import type { Dictionary } from '@/lib/i18n/types'

type MenuDayPricingCopy = Pick<
  Dictionary['dailyMenuPage'],
  | 'pricingTitle'
  | 'pricingDishesHint'
  | 'pricingLunchLabel'
  | 'pricingEveningLabel'
  | 'pricingHomemadeNote'
  | 'lunchFormulaTwoCourse'
  | 'lunchFormulaTwoCoursePrice'
  | 'lunchFormulaThreeCourse'
  | 'lunchFormulaThreeCoursePrice'
  | 'eveningFormulaDetail'
  | 'eveningFormulaPrice'
>

export function MenuDayServicePricing({ copy }: { copy: MenuDayPricingCopy }) {
  return (
    <aside className="menu-jour-service-pricing" aria-labelledby="menu-jour-pricing-title">
      <h2 id="menu-jour-pricing-title" className="menu-jour-service-pricing-title">
        {copy.pricingTitle}
      </h2>
      <div className="menu-jour-service-card menu-jour-service-card--unified">
        <p className="menu-jour-service-card__hint">{copy.pricingDishesHint}</p>
        <dl className="menu-jour-service-rates">
          <div className="menu-jour-service-rates__row">
            <dt className="menu-jour-service-rates__label">{copy.pricingLunchLabel}</dt>
            <dd className="menu-jour-service-rates__value">
              <span>
                {copy.lunchFormulaTwoCourse}{' '}
                <strong>{copy.lunchFormulaTwoCoursePrice}</strong>
              </span>
              <span className="menu-jour-service-rates__sep" aria-hidden="true">
                |
              </span>
              <span>
                {copy.lunchFormulaThreeCourse}{' '}
                <strong>{copy.lunchFormulaThreeCoursePrice}</strong>
              </span>
            </dd>
          </div>
          <div className="menu-jour-service-rates__row">
            <dt className="menu-jour-service-rates__label">{copy.pricingEveningLabel}</dt>
            <dd className="menu-jour-service-rates__value menu-jour-service-rates__value--evening">
              <span>
                {copy.eveningFormulaDetail}{' '}
                <strong>{copy.eveningFormulaPrice}</strong>
              </span>
            </dd>
          </div>
        </dl>
        <p className="menu-jour-service-card__footnote">{copy.pricingHomemadeNote}</p>
      </div>
    </aside>
  )
}
