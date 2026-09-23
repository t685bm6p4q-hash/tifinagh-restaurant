import type { DrinkSectionId } from '@/lib/drinks-data'
import type { Dictionary } from '@/lib/i18n/types'

export type LocalizedDrinkSection =
  | {
      id: DrinkSectionId
      kind: 'draft'
      title: string
      items: Array<{
        name: string
        subtitle?: string
        demi?: string
        pinte?: string
      }>
    }
  | {
      id: DrinkSectionId
      kind: 'simple'
      title: string
      items: Array<{ name: string; subtitle?: string; price: string }>
    }

type DrinksMenuGridProps = {
  sections: LocalizedDrinkSection[]
  columns: Dictionary['drinks']['columns']
}

export function DrinksMenuGrid({ sections, columns }: DrinksMenuGridProps) {
  return (
    <div className="drinks-grid">
      {sections.map((section) => (
        <article
          key={section.id}
          className={`drinks-card drinks-card--${section.id}`}
          aria-labelledby={`drinks-${section.id}`}
        >
          <h2 id={`drinks-${section.id}`} className="drinks-card-title">
            {section.title}
          </h2>
          {section.kind === 'draft' ? (
            <div className="drinks-table drinks-table--draft">
              <div className="drinks-row drinks-row--head" aria-hidden="true">
                <span className="drinks-cell drinks-cell--name" />
                <span className="drinks-cell drinks-cell--price">{columns.demi}</span>
                <span className="drinks-cell drinks-cell--price">{columns.pinte}</span>
              </div>
              <ul className="drinks-list">
                {section.items.map((item) => (
                  <li className="drinks-row" key={item.name}>
                    <span className="drinks-cell drinks-cell--name">
                      <strong>{item.name}</strong>
                      {item.subtitle ? (
                        <span className="drinks-subtitle">{item.subtitle}</span>
                      ) : null}
                    </span>
                    <span className="drinks-cell drinks-cell--price">{item.demi ?? '—'}</span>
                    <span className="drinks-cell drinks-cell--price">{item.pinte ?? '—'}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="drinks-list">
              {section.items.map((item) => (
                <li className="drinks-row drinks-row--simple" key={item.name}>
                  <span className="drinks-cell drinks-cell--name">
                    <strong>{item.name}</strong>
                    {item.subtitle ? <span className="drinks-subtitle">{item.subtitle}</span> : null}
                  </span>
                  <span className="drinks-cell drinks-cell--price">{item.price}</span>
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  )
}
