import type { Dictionary } from './types'

/** Textes carte boissons — titres de sections en français (noms de produits inchangés). */
export const drinksCopy: Dictionary['drinks'] = {
  page: {
    eyebrow: 'À boire',
    title: 'Carte des boissons',
    text:
      'Bières pression et bouteille, softs, apéritifs, cocktails et boissons chaudes — servis au bistrot comme sur notre carte en salle.',
    backEyebrow: 'La carte',
    backTitle: 'Plats & desserts',
    backText: 'Retrouvez nos entrées, plats et desserts de la carte permanente.',
    backCta: 'Voir la carte des plats',
  },
  columns: {
    demi: 'Demi',
    pinte: 'Pinte',
  },
  sections: {
    draftBeer: 'Bières pression',
    bottledBeer: 'Bières bouteille',
    softs: 'Softs',
    aperitifs: 'Apéritifs',
    spirits: 'Alcools & digestifs',
    cocktails: 'Cocktails',
    hot: 'Boissons chaudes',
    waters: 'Eaux 50 cl',
  },
}
