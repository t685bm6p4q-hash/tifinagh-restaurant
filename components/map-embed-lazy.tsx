'use client'

import { useState } from 'react'

type MapEmbedLazyProps = {
  embedUrl: string
  iframeTitle: string
  loadLabel: string
  previewAlt: string
}

export function MapEmbedLazy({
  embedUrl,
  iframeTitle,
  loadLabel,
  previewAlt,
}: MapEmbedLazyProps) {
  const [showEmbed, setShowEmbed] = useState(false)

  if (showEmbed) {
    return (
      <iframe
        className="map-section-iframe"
        title={iframeTitle}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }

  return (
    <button
      type="button"
      className="map-embed-facade"
      onClick={() => setShowEmbed(true)}
      aria-label={loadLabel}
    >
      <picture>
        <source srcSet="/images/map-preview.avif" type="image/avif" />
        <img
          className="map-static-image"
          src="/images/map-preview.webp"
          alt={previewAlt}
          width={768}
          height={432}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <span className="map-embed-facade-label">{loadLabel}</span>
      <span className="map-embed-facade-osm" aria-hidden="true">© OpenStreetMap</span>
    </button>
  )
}
