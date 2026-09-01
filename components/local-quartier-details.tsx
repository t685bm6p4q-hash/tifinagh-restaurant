import {
  metroAccessStations,
  nearbyCinemas,
  nearbyTheatres,
  quartierLandmarks,
} from '@/lib/restaurant-data'

/** Blocs quartier partagés : Autour de nous + page Montmartre. */
export function LocalQuartierDetails() {
  return (
    <>
      {quartierLandmarks.map((landmark) => (
        <div key={landmark.title} className="local-spot">
          <h2>{landmark.title}</h2>
          <p>{landmark.text}</p>
        </div>
      ))}

      <h2>Théâtres &amp; salles de spectacle (avant / après spectacle)</h2>
      <p>
        Idéalement situé pour un dîner rapide avant le rideau ou un repas convivial après la
        représentation (service continu &amp; ouverture jusqu&apos;à minuit)&nbsp;:
      </p>
      <ul className="local-venue-list">
        {nearbyTheatres.map((venue) => (
          <li key={venue.name}>
            <strong>{venue.name}</strong>
            {venue.note ? <> ({venue.note})</> : null}
          </li>
        ))}
      </ul>

      <h2>Cinémas à proximité</h2>
      <ul className="local-venue-list">
        {nearbyCinemas.map((venue) => (
          <li key={venue.name}>
            <strong>{venue.name}</strong>
            {venue.note ? <> — {venue.note}</> : null}
          </li>
        ))}
      </ul>

      <h2>Accessibilité métro</h2>
      <ul className="footer-metro-list around-metro-list">
        {metroAccessStations.map((station) => (
          <li key={station.name}>
            <span className="footer-metro-emoji" aria-hidden="true">
              🚇
            </span>
            <span>
              <strong>{station.name}</strong> (lignes {station.lines})
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
