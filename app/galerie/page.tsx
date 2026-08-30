import type { Metadata } from 'next'
import Image from 'next/image'
import { Header, Footer, PageIntro } from '@/components/site-shell'
import { cloudinaryImage } from '@/lib/cloudinary'

export const metadata: Metadata = {
  title: 'Galerie photos — salle et terrasse',
  description:
    'Photos de notre bistrot à Montmartre : terrasse aux parasols rouges, salle chaleureuse et assiettes de cuisine française préparées maison.',
  alternates: { canonical: '/galerie' },
}

const photos = [
  {
    src: cloudinaryImage('v1787946633/489A2500_evy0js.jpg', 900),
    alt: 'Terrasse Tifinagh Montmartre avec parasols rouges la nuit',
    width: 615,
    height: 852,
  },
  {
    src: cloudinaryImage('v1787946633/489A2498_znt3ml.jpg', 900),
    alt: 'Façade restaurant Tifinagh montmartre avec parasols et lumière chaude',
    width: 615,
    height: 420,
  },
  {
    src: cloudinaryImage('v1787938623/tifinagh-restaurant-pigalle-salle-restaurant_m5x7br.jpg', 900),
    alt: 'Salle restaurant Tifinagh Montmartre avec décoration rouge et bois',
    width: 615,
    height: 420,
  },
  {
    src: cloudinaryImage('v1787946632/489A2436_gqgbkp.jpg', 900),
    alt: 'Salle restaurant privée Tifinagh rouge intérieur élégant',
    width: 615,
    height: 420,
  },
  {
    src: cloudinaryImage('v1787946632/489A2437_gkrxlq.jpg', 900),
    alt: 'Salle privatisation Tifinagh avec tables nappe vichy bistro',
    width: 615,
    height: 420,
  },
  {
    src: cloudinaryImage('v1787946633/489A2480_iggqgr.jpg', 900),
    alt: 'Ambiance conviviale terrasse Tifinagh Montmartre le soir',
    width: 615,
    height: 420,
  },
  {
    src: cloudinaryImage('v1787946633/489A2463_jt7lqc.jpg', 900),
    alt: 'Plat signature Tifinagh betteraves poire et fromage blanc',
    width: 615,
    height: 420,
  },
  {
    src: cloudinaryImage('v1787946633/489A2475_u2q4on.jpg', 900),
    alt: 'Terrasse Tifinagh avec clients parasol rouge Montmartre',
    width: 615,
    height: 420,
  },
  {
    src: cloudinaryImage('v1787946632/489A2472_bwfelb.jpg', 900),
    alt: 'Plat gastronomique Tifinagh avec sauce safran et piment rouge',
    width: 615,
    height: 420,
  },
  {
    src: cloudinaryImage('v1787946633/489A2441_yrctak.jpg', 900),
    alt: 'Salle privatisation événement Tifinagh Montmartre restaurant privé',
    width: 615,
    height: 420,
  },
  {
    src: cloudinaryImage('v1787946632/489A2484_yckcxa.jpg', 900),
    alt: 'Plat poisson asperges décoration fine restaurant Tifinagh',
    width: 615,
    height: 420,
  },
]

export default function Galerie() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="L'atmosphère"
          title="Galerie"
          text="Quelques instants de vie chez Tifinagh, entre assiettes généreuses et lumières douces."
        />
        <section className="gallery section">
          {photos.map((photo, index) => (
            <Image
              key={index}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 768px) 100vw, 615px"
              quality={60}
              loading="lazy"
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
