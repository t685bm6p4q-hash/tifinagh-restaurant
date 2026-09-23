import type { Locale } from './config'
import type { Dictionary } from './types'

const drinksFr: Dictionary['drinks'] = {
  page: {
    eyebrow: 'À boire',
    title: 'Carte des boissons',
    text:
      'Bières pression et bouteille, softs, apéritifs, cocktails et boissons chaudes — servis au bistrot comme sur notre carte en salle, au cœur de Montmartre.',
    backEyebrow: 'La carte',
    backTitle: 'Plats & desserts',
    backText: 'Retrouvez nos entrées, plats et desserts de la carte permanente.',
    backCta: 'Voir la carte des plats',
  },
  columns: { demi: 'Demi', pinte: 'Pinte' },
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

const drinksEn: Dictionary['drinks'] = {
  page: {
    eyebrow: 'To drink',
    title: 'Drinks menu',
    text:
      'Draft and bottled beers, soft drinks, apéritifs, cocktails and hot drinks — served at our Montmartre bistro, just like on the menu in the dining room.',
    backEyebrow: 'Food menu',
    backTitle: 'Dishes & desserts',
    backText: 'See our starters, mains and desserts from the permanent à la carte.',
    backCta: 'View food menu',
  },
  columns: { demi: 'Demi', pinte: 'Pinte' },
  sections: {
    draftBeer: 'Draft beers',
    bottledBeer: 'Bottled beers',
    softs: 'Soft drinks',
    aperitifs: 'Apéritifs',
    spirits: 'Spirits & digestifs',
    cocktails: 'Cocktails',
    hot: 'Hot drinks',
    waters: 'Waters 50 cl',
  },
}

const drinksEs: Dictionary['drinks'] = {
  page: {
    eyebrow: 'Para beber',
    title: 'Carta de bebidas',
    text:
      'Cervezas de barril y botella, refrescos, aperitivos, cócteles y bebidas calientes — como en nuestra carta de sala, en Montmartre.',
    backEyebrow: 'La carta',
    backTitle: 'Platos y postres',
    backText: 'Entrantes, platos principales y postres de la carta permanente.',
    backCta: 'Ver la carta de platos',
  },
  columns: { demi: 'Demi', pinte: 'Pinta' },
  sections: {
    draftBeer: 'Cervezas de barril',
    bottledBeer: 'Cervezas de botella',
    softs: 'Refrescos',
    aperitifs: 'Aperitivos',
    spirits: 'Licores y digestivos',
    cocktails: 'Cócteles',
    hot: 'Bebidas calientes',
    waters: 'Aguas 50 cl',
  },
}

const drinksIt: Dictionary['drinks'] = {
  page: {
    eyebrow: 'Da bere',
    title: 'Carta delle bevande',
    text:
      'Birre alla spina e in bottiglia, soft drink, aperitivi, cocktail e bevande calde — come in sala, al nostro bistrot a Montmartre.',
    backEyebrow: 'La carta',
    backTitle: 'Piatti e dessert',
    backText: 'Antipasti, piatti e dessert della carta permanente.',
    backCta: 'Vedi la carta dei piatti',
  },
  columns: { demi: 'Demi', pinte: 'Pinta' },
  sections: {
    draftBeer: 'Birre alla spina',
    bottledBeer: 'Birre in bottiglia',
    softs: 'Soft drink',
    aperitifs: 'Aperitivi',
    spirits: 'Alcolici e digestivi',
    cocktails: 'Cocktail',
    hot: 'Bevande calde',
    waters: 'Acque 50 cl',
  },
}

const drinksZh: Dictionary['drinks'] = {
  page: {
    eyebrow: '饮品',
    title: '饮品单',
    text:
      '生啤与瓶装啤酒、软饮、开胃酒、鸡尾酒与热饮 — 蒙马特小酒馆堂食同款。',
    backEyebrow: '菜品',
    backTitle: '主菜与甜点',
    backText: '查看固定菜单上的前菜、主菜与甜点。',
    backCta: '查看菜品菜单',
  },
  columns: { demi: '半杯', pinte: '品脱' },
  sections: {
    draftBeer: '生啤',
    bottledBeer: '瓶装啤酒',
    softs: '软饮',
    aperitifs: '开胃酒',
    spirits: '烈酒与餐后酒',
    cocktails: '鸡尾酒',
    hot: '热饮',
    waters: '矿泉水 50 cl',
  },
}

const drinksDe: Dictionary['drinks'] = {
  page: {
    eyebrow: 'Getränke',
    title: 'Getränkekarte',
    text:
      'Biere vom Fass und aus der Flasche, Softdrinks, Aperitifs, Cocktails und Heißgetränke — wie in unserem Bistrot in Montmartre.',
    backEyebrow: 'Speisekarte',
    backTitle: 'Gerichte & Desserts',
    backText: 'Vorspeisen, Hauptgerichte und Desserts von der Dauerkarte.',
    backCta: 'Zur Speisekarte',
  },
  columns: { demi: 'Demi', pinte: 'Pinte' },
  sections: {
    draftBeer: 'Biere vom Fass',
    bottledBeer: 'Flaschenbiere',
    softs: 'Softdrinks',
    aperitifs: 'Aperitifs',
    spirits: 'Spirituosen & Digestifs',
    cocktails: 'Cocktails',
    hot: 'Heißgetränke',
    waters: 'Wasser 50 cl',
  },
}

const drinksPt: Dictionary['drinks'] = {
  page: {
    eyebrow: 'Para beber',
    title: 'Carta de bebidas',
    text:
      'Cervejas de pressão e garrafa, refrigerantes, aperitivos, cocktails e bebidas quentes — como na sala, no nosso bistrô em Montmartre.',
    backEyebrow: 'A carta',
    backTitle: 'Pratos e sobremesas',
    backText: 'Entradas, pratos e sobremesas da carta permanente.',
    backCta: 'Ver carta de pratos',
  },
  columns: { demi: 'Demi', pinte: 'Pinta' },
  sections: {
    draftBeer: 'Cervejas de pressão',
    bottledBeer: 'Cervejas de garrafa',
    softs: 'Refrigerantes',
    aperitifs: 'Aperitivos',
    spirits: 'Destilados e digestivos',
    cocktails: 'Cocktails',
    hot: 'Bebidas quentes',
    waters: 'Águas 50 cl',
  },
}

const drinksRu: Dictionary['drinks'] = {
  page: {
    eyebrow: 'Напитки',
    title: 'Карта напитков',
    text:
      'Разливное и бутылочное пиво, безалкогольные напитки, аперитивы, коктейли и горячие напитки — как в зале нашего бистро в Монмартре.',
    backEyebrow: 'Меню',
    backTitle: 'Блюда и десерты',
    backText: 'Закуски, основные блюда и десерты из постоянной карты.',
    backCta: 'К карте блюд',
  },
  columns: { demi: 'Demi', pinte: 'Pinte' },
  sections: {
    draftBeer: 'Разливное пиво',
    bottledBeer: 'Бутылочное пиво',
    softs: 'Безалкогольные',
    aperitifs: 'Аперитивы',
    spirits: 'Крепкие и дижестивы',
    cocktails: 'Коктейли',
    hot: 'Горячие напитки',
    waters: 'Вода 50 cl',
  },
}

const drinksSv: Dictionary['drinks'] = {
  page: {
    eyebrow: 'Dryck',
    title: 'Dryckesmeny',
    text:
      'Fat- och flasköl, läsk, aperitifer, cocktails och varma drycker — som på menyn i vårt Montmartre-bistro.',
    backEyebrow: 'Matmeny',
    backTitle: 'Rätter & desserter',
    backText: 'Förrätter, huvudrätter och desserter från den fasta menyn.',
    backCta: 'Se matmenyn',
  },
  columns: { demi: 'Demi', pinte: 'Pint' },
  sections: {
    draftBeer: 'Fatöl',
    bottledBeer: 'Flasköl',
    softs: 'Läsk',
    aperitifs: 'Aperitifer',
    spirits: 'Sprit & digestifer',
    cocktails: 'Cocktails',
    hot: 'Varma drycker',
    waters: 'Vatten 50 cl',
  },
}

/** Tamazight : libellés de page traduits ; noms de produits en français (carte en salle). */
const drinksZgh: Dictionary['drinks'] = {
  page: {
    eyebrow: 'ⴰⵙⵙⵓ',
    title: 'ⵜⴰⵎⵓⵔⵜ ⵏ ⵉⵙⵙⵓⵏ',
    text:
      'ⵉⵙⵙⵓⵏ ⵏ ⵓⵙⵙⵓ — ⴱⵉⵢⵔⴰ, ⵙⵓⴼⵜ, ⴰⵡⵔⵉⵜⵉⴼ, ⴽⵓⴽⵜⵉⵍ ⴷ ⵉⵙⵙⵓⵏ ⵉⵎⵙⵙⴰⵏ ⴳ Tifinagh Montmartre.',
    backEyebrow: 'ⵜⴰⵎⵓⵔⵜ',
    backTitle: 'ⵉⵛⵛⴰⵏ ⴷ ⵉⵖⵓⵎⵎⴰⵏ',
    backText: 'ⵙⴽⵏ ⵉⵣⵡⴰⵔⵏ, ⵉⵛⵛⴰⵏ ⴷ ⵉⵖⵓⵎⵎⴰⵏ ⵏ ⵜⴰⵎⵓⵔⵜ ⵜⴰⵎⴰⵜⴰⵢⵜ.',
    backCta: 'ⵜⴰⵎⵓⵔⵜ ⵏ ⵉⵛⵛⴰⵏ',
  },
  columns: { demi: 'Demi', pinte: 'Pinte' },
  sections: drinksFr.sections,
}

export const drinksByLocale: Record<Locale, Dictionary['drinks']> = {
  fr: drinksFr,
  en: drinksEn,
  es: drinksEs,
  it: drinksIt,
  zh: drinksZh,
  de: drinksDe,
  pt: drinksPt,
  ru: drinksRu,
  sv: drinksSv,
  zgh: drinksZgh,
}

/** @deprecated Préférer `drinksByLocale[locale]` */
export const drinksCopy = drinksFr
