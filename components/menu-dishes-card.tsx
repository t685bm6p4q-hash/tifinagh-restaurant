import type { MenuDishLine } from '@/lib/menu-dishes-format'

type MenuDishesCardProps = {
  lines: MenuDishLine[]
}

export function MenuDishesCard({ lines }: MenuDishesCardProps) {
  const noteLines = lines.filter((line) => line.kind === 'note')
  const mainLines = lines.filter((line) => line.kind !== 'note')

  return (
    <div className="menu-dishes__card" role="document">
      {mainLines.map((line, index) => {
        const key = `${line.kind}-${index}-${line.text.slice(0, 24)}`
        if (line.kind === 'category') {
          return (
            <h3 className="menu-dishes__category" key={key}>
              {line.text}
            </h3>
          )
        }
        if (line.kind === 'price') {
          return (
            <p className="menu-dishes__price" key={key}>
              {line.text}
            </p>
          )
        }
        return (
          <p className="menu-dishes__dish" key={key}>
            {line.text}
          </p>
        )
      })}
      {noteLines.length > 0 ? (
        <footer className="menu-dishes__footnotes">
          {noteLines.map((line, index) => (
            <small className="menu-dishes__note" key={`note-${index}`}>
              {line.text}
            </small>
          ))}
        </footer>
      ) : null}
    </div>
  )
}
