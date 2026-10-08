import type { Metadata } from 'next'
import Image from 'next/image'
import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import {
  galleryPhotoPaths,
  galleryPhotoSize,
  galleryPhotoSrc,
  gallerySeoFileNameByPath,
} from '@/lib/gallery-data'
import { initPageI18n } from '@/lib/i18n'
import { metadataForLocalePage, type LocalePageParams } from '@/lib/i18n/metadata-for-locale-page'

export async function generateMetadata({ params }: LocalePageParams): Promise<Metadata> {
  return metadataForLocalePage(params, 'galerie')
}

export default async function Galerie({ params }: LocalePageParams) {
  const { dictionary } = await initPageI18n(params)
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
            const seoFileName = gallerySeoFileNameByPath[path]
            const alt = g.photoAlts[index] ?? ''
            return (
              <figure
                key={path}
                className={featured ? 'gallery-item gallery-item--featured' : 'gallery-item'}
                {...(seoFileName ? { 'data-seo-filename': seoFileName } : {})}
              >
                <Image
                  className="gallery-photo"
                  src={galleryPhotoSrc(path, index)}
                  alt={alt}
                  title={
                    seoFileName
                      ? seoFileName.replace(/\.jpe?g$/i, '').replace(/-/g, ' ')
                      : undefined
                  }
                  width={size.width}
                  height={size.height}
                  sizes="(max-width: 768px) 100vw, 615px"
                  unoptimized
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
