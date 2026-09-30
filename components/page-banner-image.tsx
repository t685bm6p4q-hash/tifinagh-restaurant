/** Bannière page — candidat LCP : pas de lazy, priorité haute. */
export function PageBannerImage({
  src,
  srcSet,
  alt,
  width = 1600,
  height = 420,
  sizes = '100vw',
}: {
  src: string
  srcSet: string
  alt: string
  width?: number
  height?: number
  sizes?: string
}) {
  return (
    <img
      className="page-banner__image"
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      fetchPriority="high"
    />
  )
}
