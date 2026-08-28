import { MenuItem, type MenuItemData } from '../molecules/menu-item'

export function MenuSection({ title, items }: { title: string; items: MenuItemData[] }) {
  return <section className="menu-group" aria-labelledby={`menu-${title}`}><h2 id={`menu-${title}`}>{title}</h2>{items.map((item) => <MenuItem key={item.name} item={item} />)}</section>
}
