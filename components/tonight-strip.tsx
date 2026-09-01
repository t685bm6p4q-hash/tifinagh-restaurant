import Link from 'next/link'
import { restaurant } from '@/lib/seo'

/** Bandeau info — CSS pur, hors hero, zero JS / zero image. */
export function TonightStrip() {
  return (
    <div className="tonight-strip" role="status">
      <p>
        <span className="tonight-strip-strong">Ouvert aujourd&apos;hui</span>
        <span className="tonight-strip-sep" aria-hidden="true">·</span>
        {restaurant.openingHours.labelHours}
        <span className="tonight-strip-sep" aria-hidden="true">·</span>
        <Link href="/menu-du-jour" prefetch={false}>Menu du jour à jour</Link>
      </p>
    </div>
  )
}
