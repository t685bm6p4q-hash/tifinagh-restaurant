import { cloudinaryGalleryImage } from '@/lib/cloudinary'

export const GALLERY_STANDARD = { width: 615, height: 420 } as const
export const GALLERY_FEATURED = { width: 615, height: 852 } as const

/** Ordre harmonisé : salle / plats / ambiance / boissons (25 visuels). */
export const galleryPhotoPaths: readonly string[] = [
  'v1787938623/tifinagh-restaurant-pigalle-salle-restaurant_m5x7br.jpg',
  'v1790243521/confit-de-canard_dt0ycb.jpg',
  'v1787946633/489A2500_evy0js.jpg',
  'v1790243567/salade-landaise_kgr8i5.jpg',
  'v1787946633/489A2498_znt3ml.jpg',
  'v1790243560/joue-de-beuf_hhc6k5.jpg',
  'v1787946632/489A2436_gqgbkp.jpg',
  'v1790243565/piece-de-boeuf-frites-maison_secchu.jpg',
  'v1787946632/489A2437_gkrxlq.jpg',
  'v1790243541/esccargot_x5u5ow.jpg',
  'v1787946633/489A2480_iggqgr.jpg',
  'v1790243561/soupe-a-loignon-fois_gras_p1u7oi.jpg',
  'v1787946633/489A2463_jt7lqc.jpg',
  'v1790243563/plat-shakshuka-oeuf-frais_pqnukr.jpg',
  'v1787946633/489A2475_u2q4on.jpg',
  'v1790243520/plat-viande-sauce-pure%CC%81e_kmlk20.jpg',
  'v1787946632/489A2472_bwfelb.jpg',
  'v1790243526/pain-perdu-sardine_l0o2hb.jpg',
  'v1787946633/489A2441_yrctak.jpg',
  'v1790243533/pana-cota-fruits-rouges_ix4i4q.jpg',
  'v1787946632/489A2484_yckcxa.jpg',
  'v1790243518/fraise-marine%CC%81-basilic-speculosJPG_kas009.jpg',
  'v1790243337/spritz-tifinagh-resraurant-paris-pas-chere_qsr014.jpg',
  'v1790243337/chartreuse-tifinagh-restaurant-paris-18-pigalle_buf9ep.jpg',
  'v1790243336/mojito-tifinagh-restaurant-paris-boisson-pas_chere_wtp5x9.jpg',
]

export const galleryAltsFr: readonly string[] = [
  'Salle du restaurant Tifinagh à Montmartre, banquettes rouges et bois',
  'Confit de canard maison servi au restaurant Tifinagh',
  'Terrasse Tifinagh à Montmartre avec parasols rouges le soir',
  'Salade landaise au restaurant Tifinagh Montmartre',
  'Façade du restaurant Tifinagh, parasols et lumière chaude',
  'Joue de bœuf braisée, plat du restaurant Tifinagh',
  'Salle privée Tifinagh, intérieur rouge et élégant',
  'Pièce de bœuf et frites maison chez Tifinagh',
  'Espace privatisation Tifinagh, nappes vichy et tables en bois',
  'Cassolette d’escargots de Bourgogne au restaurant Tifinagh',
  'Ambiance conviviale sur la terrasse Tifinagh le soir',
  'Soupe à l’oignon et foie gras, entrée Tifinagh',
  'Plat betteraves, poire et fromage blanc — cuisine Tifinagh',
  'Shakshuka et œuf frais, plat Tifinagh',
  'Terrasse Tifinagh avec clients sous parasol rouge',
  'Plat de viande, sauce et purée au restaurant Tifinagh',
  'Plat gastronomique, sauce safran et piment rouge',
  'Pain perdu et sardine, suggestion du chef Tifinagh',
  'Salle privatisation pour événement à Montmartre',
  'Panna cotta aux fruits rouges, dessert Tifinagh',
  'Poisson et asperges, assiette fine au restaurant Tifinagh',
  'Fraise marinée au basilic et spéculoos, dessert Tifinagh',
  'Spritz au bar du restaurant Tifinagh à Paris',
  'Chartreuse cocktail au restaurant Tifinagh Pigalle',
  'Mojito servi au restaurant Tifinagh Montmartre',
]

export const galleryAltsEn: readonly string[] = [
  'Tifinagh dining room in Montmartre — red banquettes and wood',
  'House duck confit at Tifinagh restaurant',
  'Tifinagh terrace in Montmartre with red parasols at night',
  'Landes salad at Tifinagh Montmartre',
  'Tifinagh restaurant façade with parasols and warm light',
  'Braised beef cheek — Tifinagh main course',
  'Tifinagh private dining room, elegant red interior',
  'Beef steak with homemade fries at Tifinagh',
  'Tifinagh private hire space with bistro check tablecloths',
  'Burgundy snails cassolette at Tifinagh',
  'Convivial evening on the Tifinagh terrace',
  'French onion soup and foie gras starter',
  'Beetroot, pear and fresh cheese — Tifinagh signature',
  'Shakshuka with fresh egg at Tifinagh',
  'Guests on the Tifinagh terrace under a red parasol',
  'Meat dish with sauce and mash at Tifinagh',
  'Gourmet plate with saffron sauce and chilli',
  'French toast with sardine — chef’s suggestion',
  'Private event room at Tifinagh Montmartre',
  'Red berry panna cotta dessert',
  'Fish with asparagus — fine plating at Tifinagh',
  'Strawberries with basil and speculoos dessert',
  'Spritz at Tifinagh bar in Paris',
  'Chartreuse cocktail at Tifinagh Pigalle',
  'Mojito served at Tifinagh Montmartre',
]

export function galleryPhotoSize(index: number): { width: number; height: number } {
  return index === 0 ? GALLERY_FEATURED : GALLERY_STANDARD
}

export function galleryPhotoSrc(path: string, index: number): string {
  const size = galleryPhotoSize(index)
  return cloudinaryGalleryImage(path, size.width, size.height)
}
