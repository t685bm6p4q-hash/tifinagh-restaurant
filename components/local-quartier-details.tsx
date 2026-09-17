import {
  metroAccessStations,
  nearbyCinemas,
  nearbyTheatres,
} from '@/lib/restaurant-data'
import type { Dictionary } from '@/lib/i18n/types'

/** Blocs quartier partagés : Autour de nous + page Montmartre. */
export function LocalQuartierDetails({ dictionary }: { dictionary: Dictionary }) {
  const q = dictionary.pages.quartier

  return (
    <>
      {q.landmarks.map((landmark) => (
        <div key={landmark.title} className="local-spot">
          <h2>{landmark.title}</h2>
          <p>{landmark.text}</p>
        </div>
      ))}

      <h2>{q.theatresTitle}</h2>
      <p>{q.theatresIntro}</p>
      <ul className="local-venue-list">
        {nearbyTheatres.map((venue, index) => (
          <li key={venue.name}>
            <strong>{venue.name}</strong>
            {q.theatreNotes[index] ? <> ({q.theatreNotes[index]})</> : null}
          </li>
        ))}
      </ul>

      <h2>{q.cinemasTitle}</h2>
      <ul className="local-venue-list">
        {nearbyCinemas.map((venue, index) => (
          <li key={venue.name}>
            <strong>{venue.name}</strong>
            {q.cinemaNotes[index] ? <> — {q.cinemaNotes[index]}</> : null}
          </li>
        ))}
      </ul>

      <h2>{q.metroTitle}</h2>
      <ul className="footer-metro-list around-metro-list">
        {metroAccessStations.map((station) => {
          const metro = dictionary.metro[station.id]
          return (
            <li key={station.name}>
              <span className="footer-metro-emoji" aria-hidden="true">
                🚇
              </span>
              <span>
                <strong>{station.name}</strong> ({q.metroLinesPrefix}
                {metro.lines})
              </span>
            </li>
          )
        })}
      </ul>
    </>
  )
}
