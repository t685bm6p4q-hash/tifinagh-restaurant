import type { Metadata } from 'next'
import Image from 'next/image'
import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import { galleryPhotoPaths, galleryPhotoSize, galleryPhotoSrc } from '@/lib/gallery-data'
import { getI18n } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('galerie')
}

export default async function Galerie() {
  const { dictionary } = await getI18n()
  const g = dictionary.pages.gallery

  return (
    <>
      <Header />
      <MainContent>
        <PageIntro eyebrow={g.introEyebrow} title={g.introTitle} text={g.introText} />
        <section className="gallery section" aria-label={g.introTitle}>
          {galleryPhotoPaths.map((path, index) => {
            const size = galleryPhotoSize(index)
            const featured = index === 0
            return (
              <figure
                key={path}
                className={featured ? 'gallery-item gallery-item--featured' : 'gallery-item'}
              >
                <Image
                  className="gallery-photo"
                  src={galleryPhotoSrc(path, index)}
                  alt={g.photoAlts[index] ?? ''}
                  width={size.width}
                  height={size.height}
                  sizes="(max-width: 768px) 100vw, 615px"
                  quality={60}
                  loading="lazy"
                />
              </figure>
            )
          })}
        </section>
      </MainContent>
      <Footer />
    </>
  )
}
