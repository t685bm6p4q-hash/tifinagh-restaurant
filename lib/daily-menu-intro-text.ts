import { formatMenuUpdatedDateLong } from '@/lib/format-menu-uploaded-at'
import { localeMeta, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/types'
import { getMenuStorageStatus } from '@/lib/menu-kind'
import { menuDayVariantForLocale } from '@/lib/menu-pdf'

function localeTagForMenuDate(locale: Locale): string {
  if (locale === 'zgh') return 'fr-FR'
  return localeMeta[locale].htmlLang
}

/** Horodatage du fichier menu réellement affiché (FR si EN absent). */
export async function resolveDailyMenuIntroUploadedAt(locale: Locale): Promise<string | null> {
  const variant = menuDayVariantForLocale(locale)
  const primary = await getMenuStorageStatus(variant)
  if (primary.exists && primary.uploadedAt) return primary.uploadedAt

  if (variant === 'en') {
    const fr = await getMenuStorageStatus('fr')
    if (fr.exists && fr.uploadedAt) return fr.uploadedAt
  }

  return null
}

export function buildDailyMenuIntroText(
  copy: Pick<Dictionary['dailyMenuPage'], 'introText' | 'introTextUpdated'>,
  uploadedAt: string | null,
  locale: Locale,
): string {
  const dateLabel = formatMenuUpdatedDateLong(uploadedAt, localeTagForMenuDate(locale))
  if (!dateLabel) return copy.introText
  return copy.introTextUpdated.replace('{date}', dateLabel)
}

export async function resolveDailyMenuIntroText(
  locale: Locale,
  copy: Dictionary['dailyMenuPage'],
): Promise<string> {
  const uploadedAt = await resolveDailyMenuIntroUploadedAt(locale)
  return buildDailyMenuIntroText(copy, uploadedAt, locale)
}
