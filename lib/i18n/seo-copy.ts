import type { Locale } from './config'
import type { Dictionary } from './types'

const seoFr: Dictionary['seo'] = {
  site: {
    defaultTitle: 'Tifinagh | Restaurant & Bistrot Traditionnel Français à Montmartre',
    titleTemplate: '%s | Tifinagh',
    description:
      'Découvrez le restaurant Tifinagh à Montmartre : cuisine traditionnelle française, plats faits maison, produits frais et ambiance bistrot authentique.',
    ogDescription:
      'Cuisine traditionnelle française, plats faits maison et ambiance bistrot au pied de Montmartre.',
    twitterTitle: 'Tifinagh | Restaurant & Bistrot Traditionnel Français',
    twitterDescription:
      'Cuisine traditionnelle française, plats faits maison et ambiance bistrot au pied de Montmartre.',
    ogImageAlt: 'Salle du restaurant Tifinagh',
    keywords: [
      'restaurant traditionnel',
      'cuisine française',
      'bistrot',
      'bistrot Montmartre',
      'fait maison',
      'restaurant Montmartre',
      'restaurant Paris 18',
      'restaurant Pigalle',
      'restaurant Place de Clichy',
      'Tifinagh',
    ],
  },
  pages: {
    home: {
      title: 'Tifinagh | Restaurant & Bistrot Traditionnel Français à Montmartre',
      description:
        'Découvrez le restaurant Tifinagh à Montmartre : cuisine traditionnelle française, plats faits maison, produits frais et ambiance bistrot authentique.',
    },
    carte: {
      title: 'Carte permanente — plats français maison à Montmartre',
      description:
        'Carte permanente du bistrot Tifinagh : foie gras, confit de canard, escargots de Bourgogne et desserts maison, au 17 avenue Rachel, Paris 18.',
    },
    menuDuJour: {
      title: 'Menu du jour PDF — formules fraîches à Montmartre',
      description:
        'Formules et suggestions du jour en PDF : plats frais de saison préparés le matin par la brigade Tifinagh, bistrot français à Montmartre.',
    },
    contact: {
      title: 'Contact, adresse et accès à Montmartre',
      description:
        'Tifinagh Montmartre, 17 avenue Rachel, 75018 Paris. Téléphone, horaires et accès par les métros Blanche, Pigalle et Place de Clichy.',
    },
    mentionsLegales: {
      title: 'Mentions légales et confidentialité',
      description:
        'Mentions légales et politique de confidentialité du restaurant Tifinagh Montmartre : éditeur, hébergeur, données personnelles, WhatsApp et droits RGPD.',
    },
    galerie: {
      title: 'Galerie photos — salle et terrasse',
      description:
        'Photos de notre bistrot à Montmartre : terrasse aux parasols rouges, salle chaleureuse et assiettes de cuisine française préparées maison.',
    },
    privatisation: {
      title: 'Privatisation du restaurant à Montmartre',
      description:
        'Privatisez Tifinagh Montmartre : partielle dès 15 couverts, totale jusqu’à 40. Anniversaires, entreprises, familles — sur devis.',
    },
    autourDeNous: {
      title: 'Autour de nous — Montmartre, théâtres, cinémas et métro',
      description:
        'Tifinagh au 17 avenue Rachel : près du cimetière de Montmartre, théâtres, cinémas Pathé Wepler, métros Clichy, Blanche et Pigalle. Pause gourmande au calme.',
    },
    reservation: {
      title: 'Réserver une table — appel, Google ou WhatsApp',
      description:
        'Réservez chez Tifinagh Montmartre en quelques secondes : téléphone, Google Reserve ou WhatsApp. 17 avenue Rachel, Paris 18.',
    },
    restaurantMontmartre: {
      title: 'Restaurant Montmartre — bistrot français au pied de la butte',
      description:
        'Restaurant Tifinagh à Montmartre : près du cimetière de Montmartre et du Sacré-Cœur, idéal avant ou après spectacle. Cuisine maison, avenue Rachel.',
      keywords: [
        'restaurant Montmartre',
        'restaurant cimetière Montmartre',
        'restaurant avant spectacle Paris',
        'bistrot Montmartre',
        'restaurant Sacré-Cœur',
        'Tifinagh',
      ],
    },
    restaurantPigalle: {
      title: 'Restaurant à Pigalle — bistrot français près du Moulin Rouge',
      description:
        'Restaurant Tifinagh à deux pas de Pigalle : cuisine française maison, terrasse calme avenue Rachel, idéal avant un spectacle au Moulin Rouge ou dans les théâtres du quartier.',
      keywords: [
        'restaurant Pigalle',
        'restaurant Moulin Rouge',
        'bistrot Pigalle',
        'restaurant théâtre Paris',
        'Tifinagh',
      ],
    },
    restaurantPlaceDeClichy: {
      title: 'Restaurant Place de Clichy — bistrot français Paris 17/18',
      description:
        'Restaurant Tifinagh près de la Place de Clichy : bistrot français traditionnel, plats faits maison, accès métro lignes 2 et 13, au calme de l’avenue Rachel.',
      keywords: [
        'restaurant Place de Clichy',
        'restaurant Paris 17',
        'restaurant Paris 18',
        'bistrot Clichy',
        'Tifinagh',
      ],
    },
  },
}

const seoEn: Dictionary['seo'] = {
  site: {
    defaultTitle: 'Tifinagh | Traditional French Restaurant & Bistro in Montmartre',
    titleTemplate: '%s | Tifinagh',
    description:
      'Discover Tifinagh in Montmartre: traditional French cuisine, homemade dishes, fresh seasonal produce and an authentic neighborhood bistro atmosphere.',
    ogDescription:
      'Traditional French cooking, homemade dishes and bistro charm at the foot of Montmartre.',
    twitterTitle: 'Tifinagh | Traditional French Restaurant & Bistro',
    twitterDescription:
      'Traditional French cooking, homemade dishes and bistro charm at the foot of Montmartre.',
    ogImageAlt: 'Dining room at Tifinagh restaurant',
    keywords: [
      'traditional restaurant',
      'French cuisine',
      'bistro',
      'Montmartre bistro',
      'homemade food',
      'Montmartre restaurant',
      'Paris 18 restaurant',
      'Pigalle restaurant',
      'Place de Clichy restaurant',
      'Tifinagh',
    ],
  },
  pages: {
    home: {
      title: 'Tifinagh | Traditional French Restaurant & Bistro in Montmartre',
      description:
        'Discover Tifinagh in Montmartre: traditional French cuisine, homemade dishes, fresh seasonal produce and an authentic neighborhood bistro atmosphere.',
    },
    carte: {
      title: 'À la carte menu — homemade French dishes in Montmartre',
      description:
        'Tifinagh bistro à la carte: foie gras, duck confit, Burgundy snails and homemade desserts at 17 avenue Rachel, Paris 18.',
    },
    menuDuJour: {
      title: "Today's menu PDF — fresh set menus in Montmartre",
      description:
        "Daily set menus and specials in PDF: seasonal dishes prepared each morning by the Tifinagh team, French bistro in Montmartre.",
    },
    contact: {
      title: 'Contact, address and directions in Montmartre',
      description:
        'Tifinagh Montmartre, 17 avenue Rachel, 75018 Paris. Phone, opening hours and access via Blanche, Pigalle and Place de Clichy metro stations.',
    },
    mentionsLegales: {
      title: 'Legal notice and privacy policy',
      description:
        'Legal notice and privacy policy for Tifinagh Montmartre: publisher, hosting, personal data, WhatsApp and GDPR rights.',
    },
    galerie: {
      title: 'Photo gallery — dining room and terrace',
      description:
        'Photos of our Montmartre bistro: terrace with red parasols, warm dining room and plates of homemade French cuisine.',
    },
    privatisation: {
      title: 'Private hire of the restaurant in Montmartre',
      description:
        'Hire Tifinagh Montmartre: partial events from 15 guests, full venue up to 40. Birthdays, corporate events, families — quote on request.',
    },
    autourDeNous: {
      title: 'Around us — Montmartre, theatres, cinemas and metro',
      description:
        'Tifinagh at 17 avenue Rachel: near Montmartre Cemetery, theatres, Pathé Wepler cinema, Clichy, Blanche and Pigalle metro. A quiet gourmet break.',
    },
    reservation: {
      title: 'Book a table — call, Google or WhatsApp',
      description:
        'Book at Tifinagh Montmartre in seconds: phone, Google Reserve or WhatsApp. 17 avenue Rachel, Paris 18.',
    },
    restaurantMontmartre: {
      title: 'Montmartre restaurant — French bistro at the foot of the hill',
      description:
        'Tifinagh in Montmartre: near Montmartre Cemetery and Sacré-Cœur, ideal before or after a show. Homemade cooking on avenue Rachel.',
      keywords: [
        'Montmartre restaurant',
        'Montmartre Cemetery restaurant',
        'pre-theatre restaurant Paris',
        'Montmartre bistro',
        'Sacré-Cœur restaurant',
        'Tifinagh',
      ],
    },
    restaurantPigalle: {
      title: 'Pigalle restaurant — French bistro near the Moulin Rouge',
      description:
        'Tifinagh steps from Pigalle: homemade French cuisine, quiet terrace on avenue Rachel, ideal before a show at the Moulin Rouge or local theatres.',
      keywords: [
        'Pigalle restaurant',
        'Moulin Rouge restaurant',
        'Pigalle bistro',
        'theatre district restaurant Paris',
        'Tifinagh',
      ],
    },
    restaurantPlaceDeClichy: {
      title: 'Place de Clichy restaurant — French bistro Paris 17/18',
      description:
        'Tifinagh near Place de Clichy: traditional French bistro, homemade dishes, metro lines 2 and 13, on quiet avenue Rachel.',
      keywords: [
        'Place de Clichy restaurant',
        'Paris 17 restaurant',
        'Paris 18 restaurant',
        'Clichy bistro',
        'Tifinagh',
      ],
    },
  },
}

const seoEs: Dictionary['seo'] = {
  site: {
    defaultTitle: 'Tifinagh | Restaurante y bistró francés tradicional en Montmartre',
    titleTemplate: '%s | Tifinagh',
    description:
      'Descubra Tifinagh en Montmartre: cocina francesa tradicional, platos caseros, productos fresos de temporada y ambiente de bistró auténtico.',
    ogDescription:
      'Cocina francesa tradicional, platos caseros y ambiente de bistró al pie de Montmartre.',
    twitterTitle: 'Tifinagh | Restaurante y bistró francés tradicional',
    twitterDescription:
      'Cocina francesa tradicional, platos caseros y ambiente de bistró al pie de Montmartre.',
    ogImageAlt: 'Comedor del restaurante Tifinagh',
    keywords: [
      'restaurante tradicional',
      'cocina francesa',
      'bistró',
      'bistró Montmartre',
      'comida casera',
      'restaurante Montmartre',
      'restaurante París 18',
      'restaurante Pigalle',
      'restaurante Place de Clichy',
      'Tifinagh',
    ],
  },
  pages: {
    home: {
      title: 'Tifinagh | Restaurante y bistró francés tradicional en Montmartre',
      description:
        'Descubra Tifinagh en Montmartre: cocina francesa tradicional, platos caseros, productos frescos de temporada y ambiente de bistró auténtico.',
    },
    carte: {
      title: 'Carta permanente — platos franceses caseros en Montmartre',
      description:
        'Carta del bistró Tifinagh: foie gras, confit de pato, caracoles de Borgoña y postres caseros, 17 avenue Rachel, París 18.',
    },
    menuDuJour: {
      title: 'Menú del día PDF — menús frescos en Montmartre',
      description:
        'Menús y sugerencias del día en PDF: platos de temporada preparados cada mañana por el equipo Tifinagh, bistró francés en Montmartre.',
    },
    contact: {
      title: 'Contacto, dirección y acceso en Montmartre',
      description:
        'Tifinagh Montmartre, 17 avenue Rachel, 75018 París. Teléfono, horarios y acceso por metro Blanche, Pigalle y Place de Clichy.',
    },
    mentionsLegales: {
      title: 'Aviso legal y política de privacidad',
      description:
        'Aviso legal y política de privacidad del restaurante Tifinagh Montmartre: editor, alojamiento, datos personales, WhatsApp y derechos RGPD.',
    },
    galerie: {
      title: 'Galería de fotos — comedor y terraza',
      description:
        'Fotos de nuestro bistró en Montmartre: terraza con parasoles rojos, comedor acogedor y platos de cocina francesa casera.',
    },
    privatisation: {
      title: 'Alquiler privado del restaurante en Montmartre',
      description:
        'Reserve Tifinagh Montmartre: evento parcial desde 15 comensales, local completo hasta 40. Cumpleaños, empresas, familias — presupuesto bajo petición.',
    },
    autourDeNous: {
      title: 'A nuestro alrededor — Montmartre, teatros, cines y metro',
      description:
        'Tifinagh en 17 avenue Rachel: cerca del cementerio de Montmartre, teatros, cine Pathé Wepler, metro Clichy, Blanche y Pigalle. Pausa gastronómica tranquila.',
    },
    reservation: {
      title: 'Reservar mesa — llamada, Google o WhatsApp',
      description:
        'Reserve en Tifinagh Montmartre en segundos: teléfono, Google Reserve o WhatsApp. 17 avenue Rachel, París 18.',
    },
    restaurantMontmartre: {
      title: 'Restaurante Montmartre — bistró francés al pie de la colina',
      description:
        'Tifinagh en Montmartre: cerca del cementerio de Montmartre y del Sacré-Cœur, ideal antes o después de un espectáculo. Cocina casera, avenue Rachel.',
      keywords: [
        'restaurante Montmartre',
        'restaurante cementerio Montmartre',
        'restaurante antes espectáculo París',
        'bistró Montmartre',
        'restaurante Sacré-Cœur',
        'Tifinagh',
      ],
    },
    restaurantPigalle: {
      title: 'Restaurante Pigalle — bistró francés cerca del Moulin Rouge',
      description:
        'Tifinagh a dos pasos de Pigalle: cocina francesa casera, terraza tranquila en avenue Rachel, ideal antes del Moulin Rouge o teatros del barrio.',
      keywords: [
        'restaurante Pigalle',
        'restaurante Moulin Rouge',
        'bistró Pigalle',
        'restaurante teatro París',
        'Tifinagh',
      ],
    },
    restaurantPlaceDeClichy: {
      title: 'Restaurante Place de Clichy — bistró francés París 17/18',
      description:
        'Tifinagh cerca de Place de Clichy: bistró francés tradicional, platos caseros, metro líneas 2 y 13, en la tranquila avenue Rachel.',
      keywords: [
        'restaurante Place de Clichy',
        'restaurante París 17',
        'restaurante París 18',
        'bistró Clichy',
        'Tifinagh',
      ],
    },
  },
}

const seoIt: Dictionary['seo'] = {
  site: {
    defaultTitle: 'Tifinagh | Ristorante e bistrot francese tradizionale a Montmartre',
    titleTemplate: '%s | Tifinagh',
    description:
      'Scoprite Tifinagh a Montmartre: cucina francese tradizionale, piatti fatti in casa, prodotti freschi di stagione e autentica atmosfera da bistrot.',
    ogDescription:
      'Cucina francese tradizionale, piatti fatti in casa e atmosfera da bistrot ai piedi di Montmartre.',
    twitterTitle: 'Tifinagh | Ristorante e bistrot francese tradizionale',
    twitterDescription:
      'Cucina francese tradizionale, piatti fatti in casa e atmosfera da bistrot ai piedi di Montmartre.',
    ogImageAlt: 'Sala del ristorante Tifinagh',
    keywords: [
      'ristorante tradizionale',
      'cucina francese',
      'bistrot',
      'bistrot Montmartre',
      'fatto in casa',
      'ristorante Montmartre',
      'ristorante Parigi 18',
      'ristorante Pigalle',
      'ristorante Place de Clichy',
      'Tifinagh',
    ],
  },
  pages: {
    home: {
      title: 'Tifinagh | Ristorante e bistrot francese tradizionale a Montmartre',
      description:
        'Scoprite Tifinagh a Montmartre: cucina francese tradizionale, piatti fatti in casa, prodotti freschi di stagione e autentica atmosfera da bistrot.',
    },
    carte: {
      title: 'Carta permanente — piatti francesi fatti in casa a Montmartre',
      description:
        'Carta del bistrot Tifinagh: foie gras, confit de canard, lumache di Borgogna e dolci fatti in casa, 17 avenue Rachel, Parigi 18.',
    },
    menuDuJour: {
      title: 'Menu del giorno PDF — formule fresche a Montmartre',
      description:
        'Formule e proposte del giorno in PDF: piatti di stagione preparati ogni mattina dalla brigata Tifinagh, bistrot francese a Montmartre.',
    },
    contact: {
      title: 'Contatti, indirizzo e accesso a Montmartre',
      description:
        'Tifinagh Montmartre, 17 avenue Rachel, 75018 Parigi. Telefono, orari e accesso con metro Blanche, Pigalle e Place de Clichy.',
    },
    mentionsLegales: {
      title: 'Note legali e informativa sulla privacy',
      description:
        'Note legali e informativa sulla privacy del ristorante Tifinagh Montmartre: editore, hosting, dati personali, WhatsApp e diritti GDPR.',
    },
    galerie: {
      title: 'Galleria fotografica — sala e terrazza',
      description:
        'Foto del nostro bistrot a Montmartre: terrazza con ombrelloni rossi, sala accogliente e piatti di cucina francese fatta in casa.',
    },
    privatisation: {
      title: 'Privatizzazione del ristorante a Montmartre',
      description:
        'Privatizzate Tifinagh Montmartre: parziale da 15 coperti, locale intero fino a 40. Compleanni, aziende, famiglie — preventivo su richiesta.',
    },
    autourDeNous: {
      title: 'Intorno a noi — Montmartre, teatri, cinema e metro',
      description:
        'Tifinagh in 17 avenue Rachel: vicino al cimitero di Montmartre, teatri, cinema Pathé Wepler, metro Clichy, Blanche e Pigalle. Pausa gourmet tranquilla.',
    },
    reservation: {
      title: 'Prenotare un tavolo — telefono, Google o WhatsApp',
      description:
        'Prenotate da Tifinagh Montmartre in pochi secondi: telefono, Google Reserve o WhatsApp. 17 avenue Rachel, Parigi 18.',
    },
    restaurantMontmartre: {
      title: 'Ristorante Montmartre — bistrot francese ai piedi della collina',
      description:
        'Tifinagh a Montmartre: vicino al cimitero di Montmartre e al Sacré-Cœur, ideale prima o dopo uno spettacolo. Cucina casalinga, avenue Rachel.',
      keywords: [
        'ristorante Montmartre',
        'ristorante cimitero Montmartre',
        'ristorante prima spettacolo Parigi',
        'bistrot Montmartre',
        'ristorante Sacré-Cœur',
        'Tifinagh',
      ],
    },
    restaurantPigalle: {
      title: 'Ristorante Pigalle — bistrot francese vicino al Moulin Rouge',
      description:
        'Tifinagh a due passi da Pigalle: cucina francese fatta in casa, terrazza tranquilla su avenue Rachel, ideale prima del Moulin Rouge o dei teatri del quartiere.',
      keywords: [
        'ristorante Pigalle',
        'ristorante Moulin Rouge',
        'bistrot Pigalle',
        'ristorante teatro Parigi',
        'Tifinagh',
      ],
    },
    restaurantPlaceDeClichy: {
      title: 'Ristorante Place de Clichy — bistrot francese Parigi 17/18',
      description:
        'Tifinagh vicino a Place de Clichy: bistrot francese tradizionale, piatti fatti in casa, metro linee 2 e 13, sulla tranquilla avenue Rachel.',
      keywords: [
        'ristorante Place de Clichy',
        'ristorante Parigi 17',
        'ristorante Parigi 18',
        'bistrot Clichy',
        'Tifinagh',
      ],
    },
  },
}

const seoZh: Dictionary['seo'] = {
  site: {
    defaultTitle: 'Tifinagh | 蒙马特传统法式餐厅与小酒馆',
    titleTemplate: '%s | Tifinagh',
    description:
      '探索蒙马特 Tifinagh：传统法式料理、自制菜肴、新鲜时令食材与地道小酒馆氛围。',
    ogDescription: '传统法式烹饪、自制菜肴与蒙马特脚下的小酒馆风情。',
    twitterTitle: 'Tifinagh | 传统法式餐厅与小酒馆',
    twitterDescription: '传统法式烹饪、自制菜肴与蒙马特脚下的小酒馆风情。',
    ogImageAlt: 'Tifinagh 餐厅用餐区',
    keywords: [
      '传统餐厅',
      '法式料理',
      '小酒馆',
      '蒙马特小酒馆',
      '自制美食',
      '蒙马特餐厅',
      '巴黎18区餐厅',
      '皮加勒餐厅',
      '克利希广场餐厅',
      'Tifinagh',
    ],
  },
  pages: {
    home: {
      title: 'Tifinagh | 蒙马特传统法式餐厅与小酒馆',
      description:
        '探索蒙马特 Tifinagh：传统法式料理、自制菜肴、新鲜时令食材与地道小酒馆氛围。',
    },
    carte: {
      title: '固定菜单 — 蒙马特自制法式菜肴',
      description:
        'Tifinagh 小酒馆固定菜单：鹅肝、油封鸭、勃艮第蜗牛与自制甜点，巴黎18区 Rachel 大道17号。',
    },
    menuDuJour: {
      title: '今日菜单 PDF — 蒙马特新鲜套餐',
      description:
        '每日套餐与推荐 PDF：Tifinagh 团队清晨准备的时令菜肴，蒙马特法式小酒馆。',
    },
    contact: {
      title: '联系、地址与交通 — 蒙马特',
      description:
        'Tifinagh Montmartre，巴黎75018 Rachel 大道17号。电话、营业时间，Blanche、Pigalle、Place de Clichy 地铁可达。',
    },
    mentionsLegales: {
      title: '法律声明与隐私政策',
      description:
        'Tifinagh Montmartre 餐厅法律声明与隐私政策：出版方、托管、个人数据、WhatsApp 与 GDPR 权利。',
    },
    galerie: {
      title: '照片集 — 用餐区与露台',
      description:
        '蒙马特小酒馆照片：红色遮阳伞露台、温馨用餐区与自制法式料理。',
    },
    privatisation: {
      title: '蒙马特餐厅包场',
      description:
        '包场 Tifinagh Montmartre：部分包场15人起，全场最多40人。生日、企业、家庭聚会 — 欢迎询价。',
    },
    autourDeNous: {
      title: '周边 — 蒙马特、剧院、电影院与地铁',
      description:
        'Rachel 大道17号 Tifinagh：近蒙马特公墓、剧院、Pathé Wepler 影院，Clichy、Blanche、Pigalle 地铁。安静的美食小憩。',
    },
    reservation: {
      title: '订位 — 电话、Google 或 WhatsApp',
      description:
        '数秒预订 Tifinagh Montmartre：电话、Google Reserve 或 WhatsApp。巴黎18区 Rachel 大道17号。',
    },
    restaurantMontmartre: {
      title: '蒙马特餐厅 — 山脚下的法式小酒馆',
      description:
        '蒙马特 Tifinagh：近蒙马特公墓与圣心大教堂，演出前后皆宜。自制料理，Rachel 大道。',
      keywords: [
        '蒙马特餐厅',
        '蒙马特公墓餐厅',
        '巴黎演出前餐厅',
        '蒙马特小酒馆',
        '圣心大教堂餐厅',
        'Tifinagh',
      ],
    },
    restaurantPigalle: {
      title: '皮加勒餐厅 — 红磨坊附近法式小酒馆',
      description:
        '距皮加勒数步的 Tifinagh：自制法式料理，Rachel 大道安静露台，红磨坊或街区剧院演出前理想之选。',
      keywords: ['皮加勒餐厅', '红磨坊餐厅', '皮加勒小酒馆', '巴黎剧院区餐厅', 'Tifinagh'],
    },
    restaurantPlaceDeClichy: {
      title: '克利希广场餐厅 — 巴黎17/18区法式小酒馆',
      description:
        'Place de Clichy 附近 Tifinagh：传统法式小酒馆、自制菜肴，地铁2号线与13号线，安静的 Rachel 大道。',
      keywords: ['克利希广场餐厅', '巴黎17区餐厅', '巴黎18区餐厅', '克利希小酒馆', 'Tifinagh'],
    },
  },
}

export const seoByLocale: Record<Locale, Dictionary['seo']> = {
  fr: seoFr,
  en: seoEn,
  es: seoEs,
  it: seoIt,
  zh: seoZh,
}
