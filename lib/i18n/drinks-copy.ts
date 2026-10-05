import type { Locale } from './config'
import type { Dictionary } from './types'

const drinksFr: Dictionary['drinks'] = {
  page: {
    eyebrow: 'Bar & bistrot',
    title: 'À boire chez Tifinagh',
    text:
      'Pressions, vins vivants, apéritifs et cocktails — le complément idéal de nos assiettes, en salle ou sur la terrasse ombragée.',
    bannerTitle: 'Le verre qui prolonge le repas',
    bannerText: 'Bières artisanales, spiritueux, softs et boissons chaudes — servis avec le même soin que nos plats.',
    bannerAlt: 'Ambiance conviviale au bar du bistrot Tifinagh, Montmartre',
    gridLead: 'Prix de la carte en salle — choisissez votre verre en toute transparence.',
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
    eyebrow: 'Bar & bistro',
    title: 'Drinks at Tifinagh',
    text:
      'Draft beer, natural wines, apéritifs and cocktails — the perfect match for our plates, inside or on the shaded terrace.',
    bannerTitle: 'The glass that extends the meal',
    bannerText: 'Craft beers, spirits, soft drinks and hot drinks — served with the same care as our kitchen.',
    bannerAlt: 'Warm bistro bar atmosphere at Tifinagh, Montmartre',
    gridLead: 'In-house menu prices — choose your drink with full transparency.',
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
    eyebrow: 'Bar y bistró',
    title: 'Para beber en Tifinagh',
    text:
      'Cervezas, vinos, aperitivos y cócteles — el maridaje perfecto con nuestros platos, en sala o en la terraza.',
    bannerTitle: 'La copa que prolonga la velada',
    bannerText: 'Cervezas artesanas, destilados y refrescos — servidos con el mismo cariño que la cocina.',
    bannerAlt: 'Ambiente de bar en el bistró Tifinagh, Montmartre',
    gridLead: 'Precios de carta en sala — elige con total claridad.',
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
    eyebrow: 'Bar & bistrot',
    title: 'Da bere da Tifinagh',
    text:
      'Birre, vini, aperitivi e cocktail — l’abbinamento ideale ai nostri piatti, in sala o in terrazza.',
    bannerTitle: 'Il calice che prolunga la serata',
    bannerText: 'Birre artigianali, distillati e soft drink — serviti con la stessa cura della cucina.',
    bannerAlt: 'Atmosfera calda al bar del bistrot Tifinagh, Montmartre',
    gridLead: 'Prezzi di sala — scegliete il vostro drink in tutta trasparenza.',
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
    eyebrow: '吧台与小馆',
    title: 'Tifinagh 饮品',
    text:
      '生啤、葡萄酒、开胃酒与鸡尾酒 — 搭配主菜的完美一杯，堂食或露台皆宜。',
    bannerTitle: '让晚餐延伸的那一杯',
    bannerText: '精酿啤酒、烈酒与热饮 — 与厨房同样用心呈现。',
    bannerAlt: '蒙马特 Tifinagh 小酒馆吧台氛围',
    gridLead: '堂食菜单价格 — 透明选择您的饮品。',
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
    eyebrow: 'Bar & Bistrot',
    title: 'Getränke bei Tifinagh',
    text:
      'Fassbier, Weine, Aperitifs und Cocktails — die ideale Begleitung zu unseren Tellern, drinnen oder auf der Terrasse.',
    bannerTitle: 'Das Glas, das den Abend verlängert',
    bannerText: 'Craft-Bier, Spirituosen und Heißgetränke — mit derselben Sorgfalt wie unsere Küche.',
    bannerAlt: 'Stimmung an der Bar im Bistrot Tifinagh, Montmartre',
    gridLead: 'Preise wie in der Saisonkarte — transparent wählen.',
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
    eyebrow: 'Bar & bistrô',
    title: 'Bebidas no Tifinagh',
    text:
      'Cervejas, vinhos, aperitivos e cocktails — o par perfeito para os nossos pratos, na sala ou no terraço.',
    bannerTitle: 'O copo que prolonga a noite',
    bannerText: 'Cervejas artesanais, destilados e refrescos — servidos com o mesmo carinho da cozinha.',
    bannerAlt: 'Ambiente acolhedor no bar do bistrô Tifinagh, Montmartre',
    gridLead: 'Preços da carta em sala — escolha com total transparência.',
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
    eyebrow: 'Бар и бистро',
    title: 'Напитки в Tifinagh',
    text:
      'Пиво, вина, аперитивы и коктейли — идеальное дополнение к нашим блюдам, в зале или на террасе.',
    bannerTitle: 'Бокал, который продлевает вечер',
    bannerText: 'Крафтовое пиво, крепкие напитки и горячие напитки — с той же заботой, что и кухня.',
    bannerAlt: 'Уютная атмосфера бара бистро Tifinagh, Монмартр',
    gridLead: 'Цены как в зале — выбирайте напиток открыто.',
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

const drinksJa: Dictionary['drinks'] = {
  page: {
    eyebrow: 'バー＆ビストロ',
    title: 'Tifinagh のドリンク',
    text:
      '生ビール、ナチュラルワイン、アペリティフ、カクテル — 店内でも日陰のテラスでも、お料理にぴったりの一杯。',
    bannerTitle: '食事を延ばす一杯',
    bannerText: 'クラフトビール、スピリッツ、ソフトドリンク、温かい飲み物 — キッチンと同じ気配りで。',
    bannerAlt: 'モンマルトル ビストロ Tifinagh のバーの雰囲気',
    gridLead: '店内メニュー価格 — 透明性のあるドリンク選び。',
    backEyebrow: 'フードメニュー',
    backTitle: '料理とデザート',
    backText: '恒常メニューの前菜、メイン、デザートをご覧ください。',
    backCta: '料理メニューを見る',
  },
  columns: { demi: 'デミ', pinte: 'パイント' },
  sections: {
    draftBeer: '生ビール',
    bottledBeer: '瓶ビール',
    softs: 'ソフトドリンク',
    aperitifs: 'アペリティフ',
    spirits: 'スピリッツ＆食後酒',
    cocktails: 'カクテル',
    hot: '温かい飲み物',
    waters: 'ミネラルウォーター 50 cl',
  },
}

const drinksKo: Dictionary['drinks'] = {
  page: {
    eyebrow: '바 & 비스트로',
    title: 'Tifinagh 음료',
    text:
      '생맥주, 내추럴 와인, 아페리티프, 칵테일 — 실내 또는 그늘진 테라스에서 요리와 함께 즐기세요.',
    bannerTitle: '식사를 이어 주는 한 잔',
    bannerText: '수제 맥주, 주류, 청량음료, 따뜻한 음료 — 주방과 같은 정성으로 제공합니다.',
    bannerAlt: '몽마르트르 비스트로 Tifinagh 바 분위기',
    gridLead: '홀 메뉴 가격 — 투명하게 음료를 선택하세요.',
    backEyebrow: '식사 메뉴',
    backTitle: '요리 & 디저트',
    backText: '상설 메뉴의 전채, 메인, 디저트를 확인하세요.',
    backCta: '식사 메뉴 보기',
  },
  columns: { demi: '데미', pinte: '파인트' },
  sections: {
    draftBeer: '생맥주',
    bottledBeer: '병맥주',
    softs: '청량음료',
    aperitifs: '아페리티프',
    spirits: '주류 & 디제스티프',
    cocktails: '칵테일',
    hot: '따뜻한 음료',
    waters: '생수 50 cl',
  },
}

const drinksAr: Dictionary['drinks'] = {
  page: {
    eyebrow: 'بار ومطعم حيّ',
    title: 'المشروبات في Tifinagh',
    text:
      'بيرة من الصنبور، نبيذ حيّ، aperitifs وكوكتيلات — الرفيق المثالي لأطباقنا، في القاعة أو على التراس الظليل.',
    bannerTitle: 'كأس يمدّد متعة الوجبة',
    bannerText: 'بيرة حرفية، مشروبات روحية، غازية وساخنة — تُقدَّم بنفس عناية مطبخنا.',
    bannerAlt: 'أجواء بار دافئة في مطعم Tifinagh بمونمارتر',
    gridLead: 'أسعار القائمة في القاعة — اختاروا مشروبكم بكل وضوح.',
    backEyebrow: 'قائمة الطعام',
    backTitle: 'أطباق وحلويات',
    backText: 'اطّلعوا على المقبلات والأطباق الرئيسية والحلويات من القائمة الدائمة.',
    backCta: 'عرض قائمة الأطباق',
  },
  columns: { demi: 'Demi', pinte: 'Pinte' },
  sections: {
    draftBeer: 'بيرة من الصنبور',
    bottledBeer: 'بيرة بالزجاجة',
    softs: 'مشروبات غازية',
    aperitifs: 'Aperitifs',
    spirits: 'مشروبات روحية وdigestifs',
    cocktails: 'Cocktails',
    hot: 'مشروبات ساخنة',
    waters: 'مياه 50 cl',
  },
}

const drinksSv: Dictionary['drinks'] = {
  page: {
    eyebrow: 'Bar & bistro',
    title: 'Dryck på Tifinagh',
    text:
      'Fatöl, viner, aperitifer och cocktails — perfekt till våra rätter, inne eller på terrassen.',
    bannerTitle: 'Glaset som förlänger kvällen',
    bannerText: 'Hantverksöl, sprit och varma drycker — serverade med samma omsorg som köket.',
    bannerAlt: 'Varm barstämning på Tifinagh-bistrot, Montmartre',
    gridLead: 'Priser som i matsalen — välj dryck med full transparens.',
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
    bannerTitle: 'Le verre qui prolonge le repas',
    bannerText: 'Bières, apéritifs, cocktails — servis au bistrot Tifinagh.',
    bannerAlt: 'Ambiance bar Tifinagh Montmartre',
    gridLead: 'Prix de la carte en salle.',
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
  ja: drinksJa,
  ko: drinksKo,
  ar: drinksAr,
  zgh: drinksZgh,
}
