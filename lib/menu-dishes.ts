import { get, put } from '@vercel/blob'
import { unstable_noStore as noStore } from 'next/cache'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { isBlobConfigured, type MenuDayVariant } from '@/lib/menu-pdf'
import { normalizeMenuDishesText, type MenuDishesTexts } from '@/lib/menu-dishes-format'

/** Hors du préfixe `menu-du-jour` listé par getMenuStorageOverview. */
const MENU_DISHES_PATHNAME = 'menu-plats-du-jour.json'

const EMPTY: MenuDishesTexts = { fr: '', en: '' }

function parseStored(raw: string): MenuDishesTexts {
  try {
    const data: unknown = JSON.parse(raw)
    if (!data || typeof data !== 'object') return EMPTY
    const record = data as Record<string, unknown>
    return {
      fr: normalizeMenuDishesText(record.fr) ?? '',
      en: normalizeMenuDishesText(record.en) ?? '',
    }
  } catch {
    return EMPTY
  }
}

export async function getMenuDishes(): Promise<MenuDishesTexts> {
  noStore()
  try {
    if (isBlobConfigured()) {
      const result = await get(MENU_DISHES_PATHNAME, { access: 'public', useCache: false })
      if (!result || result.statusCode !== 200 || !result.stream) return EMPTY
      return parseStored(await new Response(result.stream).text())
    }
    return parseStored(await readFile(path.join(process.cwd(), 'public', MENU_DISHES_PATHNAME), 'utf8'))
  } catch {
    return EMPTY
  }
}

export async function saveMenuDishes(variant: MenuDayVariant, text: string): Promise<MenuDishesTexts> {
  const current = await getMenuDishes()
  const next: MenuDishesTexts = { ...current, [variant]: text }
  const body = JSON.stringify(next)

  if (isBlobConfigured()) {
    await put(MENU_DISHES_PATHNAME, body, {
      access: 'public',
      contentType: 'application/json; charset=utf-8',
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    })
  } else {
    await writeFile(path.join(process.cwd(), 'public', MENU_DISHES_PATHNAME), body, 'utf8')
  }

  return next
}
