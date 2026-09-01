export function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  if (href === '/autour-de-nous') {
    return pathname === href || pathname.startsWith('/restaurant-')
  }
  return pathname === href
}
