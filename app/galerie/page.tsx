import Image from 'next/image'
import { Header, Footer, PageIntro } from '@/components/site-shell'

const photos = [
  {
    src: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946633/489A2500_evy0js.jpg',
    alt: 'Terrasse Tifinagh Montmartre avec parasols rouges la nuit',
    width: 1400,
    height: 900,
  },
  {
    src: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946633/489A2498_znt3ml.jpg',
    alt: 'Façade restaurant Tifinagh montmartre avec parasols et lumière chaude',
    width: 1400,
    height: 900,
  },
  {
    src: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787938623/tifinagh-restaurant-pigalle-salle-restaurant_m5x7br.jpg',
    alt: 'Salle restaurant Tifinagh Montmartre avec décoration rouge et bois',
    width: 1400,
    height: 900,
  },
  {
    src: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946632/489A2436_gqgbkp.jpg',
    alt: 'Salle restaurant privée Tifinagh rouge intérieur élégant',
    width: 1200,
    height: 900,
  },
  {
    src: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946632/489A2437_gkrxlq.jpg',
    alt: 'Salle privatisation Tifinagh avec tables nappe vichy bistro',
    width: 1200,
    height: 900,
  },
  {
    src: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946633/489A2480_iggqgr.jpg',
    alt: 'Ambiance conviviale terrasse Tifinagh Montmartre le soir',
    width: 1200,
    height: 900,
  },
  {
    src: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946633/489A2463_jt7lqc.jpg',
    alt: 'Plat signature Tifinagh betteraves poire et fromage blanc',
    width: 1200,
    height: 900,
  },
  {
    src: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946633/489A2475_u2q4on.jpg',
    alt: 'Terrasse Tifinagh avec clients parasol rouge Montmartre',
    width: 1200,
    height: 900,
  },
  {
    src: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946632/489A2472_bwfelb.jpg',
    alt: 'Plat gastronomique Tifinagh avec sauce safran et piment rouge',
    width: 1200,
    height: 900,
  },
  {
    src: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946633/489A2441_yrctak.jpg',
    alt: 'Salle privatisation événement Tifinagh Montmartre restaurant privé',
    width: 1200,
    height: 900,
  },
  {
    src: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/f_webp,q_auto/v1787946632/489A2484_yckcxa.jpg',
    alt: 'Plat poisson asperges décoration fine restaurant Tifinagh',
    width: 1200,
    height: 900,
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
              priority={index < 3}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
