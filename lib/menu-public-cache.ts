import { revalidateTag } from 'next/cache'

/** Tag partagé : bytes menu Blob, kind/statut dérivés, variantes /api/menu-pdf. */
export const MENU_PUBLIC_CACHE_TAG = 'menu-public'

export function revalidateMenuPublicCache(): void {
  revalidateTag(MENU_PUBLIC_CACHE_TAG, 'max')
}
