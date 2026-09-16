import Link from 'next/link'
import { getI18n } from '@/lib/i18n'

/** Bandeau info — CSS pur, hors hero, zero JS / zero image. */
export async function TonightStrip() {
  const { dictionary } = await getI18n()

  return (
    <div className="tonight-strip" role="status">
      <p>
        <span className="tonight-strip-strong">{dictionary.hours.openToday}</span>
        <span className="tonight-strip-sep" aria-hidden="true">·</span>
        {dictionary.hours.hours}
        <span className="tonight-strip-sep" aria-hidden="true">·</span>
        <Link href="/menu-du-jour" prefetch={false}>{dictionary.home.tonightMenu}</Link>
      </p>
    </div>
  )
}
