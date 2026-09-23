import type { Locale } from './config'

export type A11yCopy = {
  skipToContent: string
  breadcrumbNav: string
}

const copy: Record<Locale, A11yCopy> = {
  fr: { skipToContent: 'Aller au contenu principal', breadcrumbNav: "Fil d'Ariane" },
  en: { skipToContent: 'Skip to main content', breadcrumbNav: 'Breadcrumb' },
  es: { skipToContent: 'Ir al contenido principal', breadcrumbNav: 'Ruta de navegación' },
  it: { skipToContent: 'Vai al contenuto principale', breadcrumbNav: 'Percorso di navigazione' },
  zh: { skipToContent: '跳到主要内容', breadcrumbNav: '面包屑导航' },
  de: { skipToContent: 'Zum Hauptinhalt springen', breadcrumbNav: 'Brotkrumen-Navigation' },
  pt: { skipToContent: 'Ir para o conteúdo principal', breadcrumbNav: 'Navegação estrutural' },
  ru: { skipToContent: 'Перейти к основному содержанию', breadcrumbNav: 'Навигационная цепочка' },
  sv: { skipToContent: 'Hoppa till huvudinnehåll', breadcrumbNav: 'Brödsmulor' },
  zgh: { skipToContent: 'Aller au contenu principal', breadcrumbNav: "Fil d'Ariane" },
}

export function getA11yCopy(locale: Locale): A11yCopy {
  return copy[locale]
}
