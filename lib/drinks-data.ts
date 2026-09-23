export type DrinkSectionId =
  | 'draftBeer'
  | 'bottledBeer'
  | 'softs'
  | 'aperitifs'
  | 'spirits'
  | 'cocktails'
  | 'hot'
  | 'waters'

export type DrinkItemSimple = {
  id: string
  name: string
  price: string
  subtitle?: string
}

export type DrinkItemDraft = {
  id: string
  name: string
  subtitle?: string
  demi?: string
  pinte?: string
}

export type DrinkSectionDraft = {
  id: DrinkSectionId
  kind: 'draft'
  items: DrinkItemDraft[]
}

export type DrinkSectionSimple = {
  id: DrinkSectionId
  kind: 'simple'
  items: DrinkItemSimple[]
}

export type DrinkSection = DrinkSectionDraft | DrinkSectionSimple

export const drinkSections: DrinkSection[] = [
  {
    id: 'draftBeer',
    kind: 'draft',
    items: [
      { id: 'meteor', name: 'Météor', subtitle: 'Blonde', demi: '3 €', pinte: '5 €' },
      { id: 'lagunitas', name: 'Lagunitas IPA', demi: '4,5 €', pinte: '7,5 €' },
      { id: 'moment', name: 'Bières du moment' },
    ],
  },
  {
    id: 'bottledBeer',
    kind: 'simple',
    items: [
      { id: 'chimay', name: 'Chimay', price: '7,5 €' },
      { id: 'duvel', name: 'Duvel', price: '7,5 €' },
      { id: 'chouffe', name: 'Chouffe', price: '7,5 €' },
      { id: 'heineken', name: 'Heineken', price: '5,5 €' },
      { id: 'delirium', name: 'Delirium Tremens', price: '8 €' },
      { id: 'corona', name: 'Corona', price: '6,5 €' },
      { id: 'desperados', name: 'Desperados', price: '6 €' },
      { id: 'naBeer', name: 'Sans alcool', price: '5,5 €' },
    ],
  },
  {
    id: 'softs',
    kind: 'simple',
    items: [
      { id: 'coca', name: 'Coca-Cola', price: '5,5 €' },
      { id: 'orangina', name: 'Orangina', price: '5,5 €' },
      { id: 'gingerBeer', name: 'Ginger Beer', price: '6 €' },
      { id: 'iceTea', name: 'Ice Tea', price: '5,5 €' },
      { id: 'limonade', name: 'Limonade', price: '5 €' },
      { id: 'perrier', name: 'Perrier', price: '6 €' },
      { id: 'schweppes', name: 'Schweppes', price: '5,5 €' },
      { id: 'jusFruits', name: 'Jus de fruits', price: '5,5 €' },
      { id: 'fruitsPresses', name: 'Fruits pressés', price: '7 €' },
    ],
  },
  {
    id: 'aperitifs',
    kind: 'simple',
    items: [
      { id: 'ricard', name: 'Ricard, Pastis', price: '4,5 €' },
      { id: 'cidre', name: 'Cidre brut', price: '5,5 €' },
      { id: 'pineau', name: 'Pineau des Charentes', price: '6 €' },
      { id: 'mandarine', name: 'Mandarine Napoléon', price: '6 €' },
      { id: 'kir', name: 'Kir', price: '6 €' },
      { id: 'kirRoyal', name: 'Kir Royal', price: '10 €' },
      { id: 'campari', name: 'Campari', price: '5,5 €' },
      { id: 'americano', name: 'Americano', price: '7,5 €' },
      { id: 'suze', name: 'Suze', price: '6 €' },
      { id: 'martini', name: 'Martini', price: '5,5 €' },
      { id: 'guignolet', name: 'Guignolet', price: '6,5 €' },
    ],
  },
  {
    id: 'spirits',
    kind: 'simple',
    items: [
      { id: 'chartreuse', name: 'Chartreuse verte', price: '7 €' },
      { id: 'bushmills', name: 'Bushmills', price: '7,5 €' },
      { id: 'diplomatico', name: 'Diplomatico rhum', price: '9 €' },
      { id: 'aberlour', name: 'Aberlour', price: '9 €' },
      { id: 'talisker', name: 'Talisker', price: '10 €' },
      { id: 'jack', name: "Jack Daniel's", price: '7,5 €' },
      { id: 'greyGoose', name: 'Vodka Grey Goose', price: '9 €' },
      { id: 'cognac', name: 'Cognac VSOP', price: '10 €' },
      { id: 'armagnac', name: 'Armagnac', price: '8 €' },
      { id: 'calvados', name: 'Calvados', price: '7 €' },
      { id: 'eauxVie', name: 'Poire, Framboise', price: '8 €' },
    ],
  },
  {
    id: 'cocktails',
    kind: 'simple',
    items: [
      { id: 'spritz', name: 'Spritz', price: '7 €' },
      { id: 'cosmo', name: 'Cosmopolitan', price: '8 €' },
      { id: 'mojito', name: 'Mojito', price: '8 €' },
      { id: 'mule', name: 'Moscow Mule', price: '8 €' },
      { id: 'stGermain', name: 'St-Germain Spritz', price: '7,5 €' },
      { id: 'caipirinha', name: 'Caipirinha', price: '7,5 €' },
      { id: 'ginTonic', name: 'Gin Tonic', price: '8 €' },
      { id: 'pina', name: 'Piña Colada', price: '8 €' },
    ],
  },
  {
    id: 'hot',
    kind: 'simple',
    items: [
      { id: 'cafe', name: 'Café, Décafé', price: '2,4 €' },
      { id: 'double', name: 'Café double', price: '3,8 €' },
      { id: 'creme', name: 'Café crème', price: '5,5 €' },
      { id: 'cappuccino', name: 'Cappuccino', price: '7 €' },
      { id: 'chocolat', name: 'Chocolat chaud', price: '5 €' },
      { id: 'viennois', name: 'Café viennois', price: '5,5 €' },
      { id: 'the', name: 'Thé infusion', price: '6 €' },
    ],
  },
  {
    id: 'waters',
    kind: 'simple',
    items: [
      { id: 'badoit', name: 'Badoit', price: '6 €' },
      { id: 'evian', name: 'Evian', price: '6 €' },
      { id: 'pellegrino', name: 'San Pellegrino', price: '6 €' },
    ],
  },
]
