import Link from 'next/link'

/** Bandeau info "ce soir" — CSS pur, hors hero, zero JS / zero image. */
export function TonightStrip() {
  return (
    <div className="tonight-strip" role="status">
      <p>
        <span className="tonight-strip-strong">Ouvert ce soir</span>
        <span className="tonight-strip-sep" aria-hidden="true">·</span>
        Service dès 19h
        <span className="tonight-strip-sep" aria-hidden="true">·</span>
        <Link href="/menu-du-jour">Menu du jour à jour</Link>
      </p>
    </div>
  )
}
