import type { Dictionary } from '@/lib/i18n/types'

type MenuDayPricingCopy = Pick<
  Dictionary['dailyMenuPage'],
  | 'pricingTitle'
  | 'lunchServiceTitle'
  | 'lunchServiceNote'
  | 'lunchFormulaTwoCourse'
  | 'lunchFormulaTwoCoursePrice'
  | 'lunchFormulaThreeCourse'
  | 'lunchFormulaThreeCoursePrice'
  | 'eveningServiceTitle'
  | 'eveningFormulaDetail'
  | 'eveningFormulaPrice'
  | 'eveningFormulaPromo'
>

export function MenuDayServicePricing({ copy }: { copy: MenuDayPricingCopy }) {
  return (
    <aside className="menu-jour-service-pricing" aria-labelledby="menu-jour-pricing-title">
      <h2 id="menu-jour-pricing-title" className="menu-jour-service-pricing-title">
        {copy.pricingTitle}
      </h2>
      <div className="menu-jour-service-pricing-grid">
        <div className="menu-jour-service-card menu-jour-service-card--lunch">
          <h3>{copy.lunchServiceTitle}</h3>
          <p className="menu-jour-service-note">{copy.lunchServiceNote}</p>
          <ul className="menu-jour-service-formulas">
            <li>
              <span>{copy.lunchFormulaTwoCourse}</span>
              <strong>{copy.lunchFormulaTwoCoursePrice}</strong>
            </li>
            <li>
              <span>{copy.lunchFormulaThreeCourse}</span>
              <strong>{copy.lunchFormulaThreeCoursePrice}</strong>
            </li>
          </ul>
        </div>
        <div className="menu-jour-service-card menu-jour-service-card--evening">
          <h3>{copy.eveningServiceTitle}</h3>
          <p className="menu-jour-service-evening-detail">{copy.eveningFormulaDetail}</p>
          <p className="menu-jour-service-evening-price">{copy.eveningFormulaPrice}</p>
          <p className="menu-jour-service-evening-promo">{copy.eveningFormulaPromo}</p>
        </div>
      </div>
    </aside>
  )
}
