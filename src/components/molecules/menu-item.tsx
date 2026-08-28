export type MenuItemData = { name: string; description?: string; price: string }

export function MenuItem({ item }: { item: MenuItemData }) {
  return <article className="menu-item"><div><strong>{item.name}</strong>{item.description && <span>{item.description}</span>}</div><b>{item.price}</b></article>
}
