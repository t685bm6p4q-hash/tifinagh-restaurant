import type { Metadata } from 'next'
import Image from 'next/image'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { cloudinaryImage } from '@/lib/cloudinary'
import { getI18n } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/i18n/page-metadata'

const photoPaths = [
  'v1787946633/489A2500_evy0js.jpg',
  'v1787946633/489A2498_znt3ml.jpg',
  'v1787938623/tifinagh-restaurant-pigalle-salle-restaurant_m5x7br.jpg',
  'v1787946632/489A2436_gqgbkp.jpg',
  'v1787946632/489A2437_gkrxlq.jpg',
  'v1787946633/489A2480_iggqgr.jpg',
  'v1787946633/489A2463_jt7lqc.jpg',
  'v1787946633/489A2475_u2q4on.jpg',
  'v1787946632/489A2472_bwfelb.jpg',
  'v1787946633/489A2441_yrctak.jpg',
  'v1787946632/489A2484_yckcxa.jpg',
] as const

const photoSizes = [
  { width: 615, height: 852 },
  { width: 615, height: 420 },
  { width: 615, height: 420 },
  { width: 615, height: 420 },
  { width: 615, height: 420 },
  { width: 615, height: 420 },
  { width: 615, height: 420 },
  { width: 615, height: 420 },
  { width: 615, height: 420 },
  { width: 615, height: 420 },
  { width: 615, height: 420 },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('galerie')
}

export default async function Galerie() {
  const { dictionary } = await getI18n()
  const g = dictionary.pages.gallery

  return (
    <>
      <Header />
      <main>
        <PageIntro eyebrow={g.introEyebrow} title={g.introTitle} text={g.introText} />
        <section className="gallery section">
          {photoPaths.map((path, index) => {
            const size = photoSizes[index] ?? photoSizes[0]
            return (
            <Image
              key={path}
              src={cloudinaryImage(path, 900)}
              alt={g.photoAlts[index] ?? ''}
              width={size.width}
              height={size.height}
              sizes="(max-width: 768px) 100vw, 615px"
              quality={60}
              loading="lazy"
            />
            )
          })}
        </section>
      </main>
      <Footer />
    </>
  )
}
