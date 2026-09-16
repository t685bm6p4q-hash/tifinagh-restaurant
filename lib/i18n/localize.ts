import type { Dictionary } from './types'
import {
  localSeoLinks,
  menuSections,
  nearbyMetroStations,
  testimonials,
  type Testimonial,
} from '@/lib/restaurant-data'

type MenuCopy = { name: string; description: string }

export function localizeMenu(dictionary: Dictionary) {
  return menuSections.map((section) => {
    const translated = dictionary.menu[section.id]
    const items = translated.items as Record<string, MenuCopy>
    return {
      title: translated.title,
      items: section.items.map((item) => {
        const copy = items[item.id]
        return {
          name: copy?.name ?? item.name,
          description: copy?.description ?? item.description,
          price: item.price,
        }
      }),
    }
  })
}

export function localizeTestimonials(dictionary: Dictionary): Testimonial[] {
  return testimonials.map((item) => ({
    id: item.id,
    author: item.author,
    quote: dictionary.home.quotes[item.id],
  }))
}

export function localizeMetro(dictionary: Dictionary) {
  return nearbyMetroStations.map((station) => {
    const copy = dictionary.metro[station.id]
    return {
      name: station.name,
      lines: copy.lines,
      note: copy.note,
    }
  })
}

export function localizeSeoLinks(dictionary: Dictionary) {
  return localSeoLinks.map((link) => ({
    href: link.href,
    label: dictionary.localLinks[link.key],
  }))
}
