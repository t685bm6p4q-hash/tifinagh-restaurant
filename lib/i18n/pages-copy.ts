import type { Locale } from './config'
import type { PagesCopy } from './types'
import { galleryAltsEn, galleryAltsFr } from '@/lib/gallery-data'
import { pagesDe } from './pages/de'
import { pagesPt } from './pages/pt'
import { pagesRu } from './pages/ru'
import { pagesSv } from './pages/sv'
import { pagesZgh } from './pages/zgh'

const pagesFr: PagesCopy = {
  around: {
    introEyebrow: 'Paris 18',
    introTitle: 'Autour de nous',
    introText:
      'Un bistrot de quartier au 17 avenue Rachel — entre Montmartre, Pigalle et la Place de Clichy.',
    bannerAria: 'Montmartre, Pigalle et le quartier',
    bannerAlt:
      'Panorama de nuit : Sacré-Cœur, Moulin Rouge, théâtres et rues de Montmartre et Pigalle',
    neighborhoodsTitle: 'Nos quartiers',
    neighborhoodsIntro1:
      'Tifinagh se situe dans une impasse calme, à distance de marche des grands axes du 18e. Que vous veniez de Montmartre, Pigalle ou Clichy, vous trouvez ici une ',
    neighborhoodsIntroStrong: 'cuisine française traditionnelle',
    neighborhoodsIntro2: ', 100 % maison.',
    openPrefix: 'Ouvert ',
    openEveryDay: 'tous les jours',
    accessPlan: 'Accès & plan',
    contactUs: 'Nous contacter',
    localLinks: {
      montmartre: {
        title: 'Montmartre & Sacré-Cœur',
        text: 'Au pied de la butte, au calme de l’avenue Rachel — loin du tumulte touristique direct.',
      },
      pigalle: {
        title: 'Pigalle & Moulin Rouge',
        text: 'À quelques minutes à pied de Pigalle : idéal avant ou après un spectacle.',
      },
      clichy: {
        title: 'Place de Clichy',
        text: 'Sortie métro lignes 2 et 13 : un repas fait maison sans traverser tout Montmartre.',
      },
    },
  },
  gallery: {
    introEyebrow: "L'atmosphère",
    introTitle: 'Galerie',
    introText:
      'Quelques instants de vie chez Tifinagh, entre assiettes généreuses et lumières douces.',
    photoAlts: [...galleryAltsFr],
  },
  privatisation: {
    introEyebrow: 'Événements privés',
    introTitle: 'Privatisation',
    introText: 'Des chiffres clairs, des formats concrets, une salle prête pour votre soirée.',
    bannerAria: 'Salle privatisable Tifinagh Montmartre',
    bannerAlt:
      'Salle du restaurant Tifinagh avec banquettes rouges, tables en bois et espace privatisable',
    statPartialValue: '15+',
    statPartialLabel: 'Privatisation partielle\ndès 15 couverts',
    statTotalValue: '40',
    statTotalLabel: 'Privatisation totale\njusqu’à 40 couverts',
    statQuoteValue: 'Sur devis',
    statQuoteLabel: 'Menus & budget\nselon votre brief',
    formatsTitle: 'Formats les plus demandés',
    formats: [
      'Anniversaires & fêtes entre amis',
      'Repas d’entreprise / afterwork',
      'Séminaires & team building',
      'Repas de famille & réunions',
      'Avant-spectacle (Pigalle / Moulin Rouge)',
      'Réceptions & événements privés',
    ],
    howTitle: 'Comment ça se passe ?',
    howText:
      'Appelez-nous ou écrivez-nous avec la date, le nombre de convives et le type d’événement. Nous revenons avec une proposition (menu, service, privatisation partielle ou totale) — ',
    howStrong: 'toujours sur devis',
    whatsappQuoteMessage: 'Bonjour, je souhaite un devis de privatisation chez Tifinagh.',
    bookingTitle: 'Parler de votre événement',
    photoAlts: [
      'Salle privatisable du restaurant Tifinagh à Montmartre',
      'Espace privatisation Tifinagh — salle intérieure élégante',
    ],
  },
  montmartre: {
    introEyebrow: 'Paris 18 · Montmartre',
    introTitle: 'Tifinagh — restaurant à Montmartre',
    introText:
      'Un bistrot parisien au calme de l’avenue Rachel : cuisine généreuse 100 % maison, vins vivants, terrasse ombragée — cartes plats & boissons en ligne.',
    distinguishTitle: 'Ce qui nous distingue',
    distinguishItems: [
      'Plats 100 % maison, préparés chaque matin avec des produits frais',
      'Carte courte de saison + menu du jour en PDF mis à jour',
      'Terrasse ombragée avec parasols rouges quand le temps le permet',
      'Ambiance bistrot parisien : bois, nappes vichy, service chaleureux',
      'Ouvert tous les jours · 10h – 00h',
    ],
    privatisationTitle: 'Privatisation & groupes',
    privatisationText:
      'Anniversaires, repas d’entreprise ou événements privés : privatisation partielle dès 15 personnes, salle entière jusqu’à 40 couverts. Devis sur demande par téléphone ou WhatsApp.',
    photosLink: 'Photos',
    aroundLink: 'Autour de nous',
    accessContact: 'Accès & contact',
    bookingTitle: 'Réserver à Montmartre',
  },
  pigalle: {
    introEyebrow: 'Paris 18 · Pigalle',
    introTitle: 'Restaurant près de Pigalle et du Moulin Rouge',
    introText:
      'À deux pas de Pigalle et du Moulin Rouge : assiettes françaises fait maison, ambiance bistrot et terrasse discrète — cartes en ligne avant votre soirée.',
    whyTitle: 'Pourquoi dîner près de Pigalle chez Tifinagh',
    whyP1Before:
      'Pigalle attire chaque soir des visiteurs pour ses spectacles, ses théâtres et son énergie. Beaucoup cherchent ensuite une table ',
    whyStrong1: 'vraiment française',
    whyP1Mid:
      ', sans la foule des artères touristiques. Tifinagh se trouve au ',
    whyStrong2: '17 avenue Rachel',
    whyP1After:
      ', dans une impasse calme au pied de Montmartre — assez proche de Pigalle pour y venir à pied, assez éloigné pour profiter d’un dîner posé.',
    showTitle: 'Idéal avant ou après un spectacle',
    showText:
      'Moulin Rouge, salles de concert et théâtres du quartier sont à distance de marche. Notre équipe connaît le rythme des soirs de représentation : service attentif, cuisine maison préparée le jour même, et possibilité de réserver pour arriver sereinement avant le lever de rideau.',
    onSiteTitle: 'Ce que vous trouvez sur place',
    onSiteItems: [
      'Cuisine traditionnelle française, 100 % maison',
      'Carte courte de saison + menu du jour en PDF',
      'Terrasse ombragée quand le temps le permet',
      'Ouvert tous les jours · 10h – 00h',
      'Métro Pigalle (lignes 2 et 12) à deux pas',
    ],
    directionsTitle: 'Comment venir depuis Pigalle',
    directionsText:
      'Depuis la place Pigalle, descendez vers le cimetière de Montmartre / avenue Rachel : le restaurant est au calme, loin du bruit des grands axes. Besoin d’un itinéraire ? La page contact et Google Maps indiquent le point exact.',
    accessContact: 'Accès & contact',
    bookingTitle: 'Réserver depuis Pigalle',
  },
  clichy: {
    introEyebrow: 'Paris 17 / 18 · Place de Clichy',
    introTitle: 'Restaurant Place de Clichy — Tifinagh',
    introText:
      'À quelques minutes de la Place de Clichy : un vrai bistrot de quartier, plats maison et terrasse, avec cartes détaillées en ligne pour préparer votre repas.',
    metroTitle: 'Accès simple depuis Clichy',
    metroP1Before: 'Métro ',
    metroStrong1: 'Place de Clichy (lignes 2 et 13)',
    metroP1After:
      ' : quelques minutes à pied jusqu’à l’avenue Rachel. La Fourche (ligne 13) et Blanche (ligne 2) sont également très proches. L’impasse est calme : idéal pour un repas d’affaires en journée ou un dîner en famille le soir.',
    accessTitle: 'Un bistrot français à sortie de métro Clichy',
    accessText:
      'La Place de Clichy est un carrefour pratique entre le 17e et le 18e. Pour un déjeuner ou un dîner sans traverser tout Montmartre, Tifinagh offre une adresse de cuisine française traditionnelle au 17 avenue Rachel : produits frais, plats généreux, ambiance de vrai bistrot — pas une table générique de place touristique.',
    audienceTitle: 'Pour qui ?',
    audienceItems: [
      'Habitués du 17e / 18e qui veulent du fait maison',
      'Déjeuners professionnels sans perte de temps',
      'Dîners en couple ou entre amis hors des flux de Pigalle',
      'Groupes et privatisations (partielle dès 15, totale jusqu’à 40)',
    ],
    hoursTitle: 'Horaires & réservation',
    hoursTextBefore: 'Ouvert ',
    hoursEveryDay: 'tous les jours',
    hoursTextAfter:
      ', 10h – 00h. Réservez par téléphone, Google Reserve ou WhatsApp — surtout le week-end et les soirs de spectacle dans le quartier.',
    privatizeLink: 'Privatiser',
    bookingTitle: 'Réserver depuis Place de Clichy',
  },
  quartier: {
    landmarks: [
      {
        title: 'Cimetière de Montmartre',
        text: "Niché juste sur l'avenue Rachel, au niveau de l'accès au cimetière : la halte idéale pour une pause calme et gourmande.",
      },
      {
        title: 'Montmartre & Sacré-Cœur',
        text: 'Au pied de la butte Montmartre, préservé du tumulte touristique direct.',
      },
    ],
    theatresTitle: 'Théâtres & salles de spectacle (avant / après spectacle)',
    theatresIntro:
      'Idéalement situé pour un dîner rapide avant le rideau ou un repas convivial après la représentation (service continu & ouverture jusqu’à minuit) :',
    cinemasTitle: 'Cinémas à proximité',
    metroTitle: 'Accessibilité métro',
    metroLinesPrefix: 'lignes ',
    theatreNotes: [
      'à 3 min à pied sur le boulevard de Clichy',
      'à 5 min à pied, rue Biot / Place de Clichy',
      'rue de Clichy',
      'boulevard de Rochechouart',
      'place Charles Dullin',
    ],
    cinemaNotes: ['Place de Clichy', 'Avenue de Clichy'],
  },
}

const pagesEn: PagesCopy = {
  around: {
    introEyebrow: 'Paris 18',
    introTitle: 'Around us',
    introText:
      'A neighbourhood bistro at 17 avenue Rachel — between Montmartre, Pigalle and Place de Clichy.',
    bannerAria: 'Montmartre, Pigalle and the neighbourhood',
    bannerAlt:
      'Night panorama: Sacré-Cœur, Moulin Rouge, theatres and streets of Montmartre and Pigalle',
    neighborhoodsTitle: 'Our neighbourhoods',
    neighborhoodsIntro1:
      'Tifinagh sits on a quiet cul-de-sac, within walking distance of the main arteries of the 18th arrondissement. Whether you come from Montmartre, Pigalle or Clichy, you will find ',
    neighborhoodsIntroStrong: 'traditional French cuisine',
    neighborhoodsIntro2: ', 100% homemade.',
    openPrefix: 'Open ',
    openEveryDay: 'every day',
    accessPlan: 'Directions & map',
    contactUs: 'Contact us',
    localLinks: {
      montmartre: {
        title: 'Montmartre & Sacré-Cœur',
        text: 'At the foot of the hill, on quiet avenue Rachel — away from the busiest tourist thoroughfares.',
      },
      pigalle: {
        title: 'Pigalle & Moulin Rouge',
        text: 'A few minutes’ walk from Pigalle: ideal before or after a show.',
      },
      clichy: {
        title: 'Place de Clichy',
        text: 'Metro lines 2 and 13: homemade food without crossing all of Montmartre.',
      },
    },
  },
  gallery: {
    introEyebrow: 'The atmosphere',
    introTitle: 'Gallery',
    introText:
      'Moments of life at Tifinagh — generous plates and soft light.',
    photoAlts: [...galleryAltsEn],
  },
  privatisation: {
    introEyebrow: 'Private events',
    introTitle: 'Private hire',
    introText: 'Clear numbers, practical formats, a room ready for your evening.',
    bannerAria: 'Tifinagh private hire room in Montmartre',
    bannerAlt:
      'Tifinagh dining room with red banquettes, wooden tables and space for private hire',
    statPartialValue: '15+',
    statPartialLabel: 'Partial hire\nfrom 15 covers',
    statTotalValue: '40',
    statTotalLabel: 'Full hire\nup to 40 covers',
    statQuoteValue: 'On quote',
    statQuoteLabel: 'Menus & budget\ntailored to your brief',
    formatsTitle: 'Most popular formats',
    formats: [
      'Birthdays & celebrations with friends',
      'Business meals / after-work drinks',
      'Seminars & team building',
      'Family meals & gatherings',
      'Pre-show dinner (Pigalle / Moulin Rouge)',
      'Receptions & private events',
    ],
    howTitle: 'How does it work?',
    howText:
      'Call or message us with the date, number of guests and type of event. We will reply with a proposal (menu, service, partial or full hire) — ',
    howStrong: 'always on quote',
    whatsappQuoteMessage: 'Hello, I would like a quote for private hire at Tifinagh.',
    bookingTitle: 'Talk about your event',
    photoAlts: [
      'Private hire dining room at Tifinagh in Montmartre',
      'Tifinagh private event space — elegant interior',
    ],
  },
  montmartre: {
    introEyebrow: 'Paris 18 · Montmartre',
    introTitle: 'Restaurant in Montmartre',
    introText:
      'A true neighbourhood bistro on quiet avenue Rachel — away from the bustle of tourist arteries.',
    distinguishTitle: 'What sets us apart',
    distinguishItems: [
      '100% homemade dishes, prepared each morning with fresh produce',
      'Short seasonal menu + daily menu PDF updated regularly',
      'Shaded terrace with red parasols when the weather allows',
      'Parisian bistro atmosphere: wood, check tablecloths, warm service',
      'Open every day · 10am – 12am',
    ],
    privatisationTitle: 'Private hire & groups',
    privatisationText:
      'Birthdays, business meals or private events: partial hire from 15 guests, full room up to 40 covers. Quote on request by phone or WhatsApp.',
    photosLink: 'Photos',
    aroundLink: 'Around us',
    accessContact: 'Directions & contact',
    bookingTitle: 'Book in Montmartre',
  },
  pigalle: {
    introEyebrow: 'Paris 18 · Pigalle',
    introTitle: 'Restaurant near Pigalle',
    introText:
      'A calm French bistro a few minutes’ walk from Pigalle and the Moulin Rouge.',
    whyTitle: 'Why dine near Pigalle at Tifinagh',
    whyP1Before:
      'Every evening Pigalle draws visitors for its shows, theatres and energy. Many then look for a table that is ',
    whyStrong1: 'truly French',
    whyP1Mid:
      ', without the crowds of tourist streets. Tifinagh is at ',
    whyStrong2: '17 avenue Rachel',
    whyP1After:
      ', on a quiet cul-de-sac at the foot of Montmartre — close enough to walk from Pigalle, far enough to enjoy a relaxed dinner.',
    showTitle: 'Ideal before or after a show',
    showText:
      'The Moulin Rouge, concert halls and neighbourhood theatres are within walking distance. Our team knows the rhythm of performance nights: attentive service, same-day homemade cooking, and reservations so you can arrive calmly before curtain up.',
    onSiteTitle: 'What you will find on site',
    onSiteItems: [
      'Traditional French cuisine, 100% homemade',
      'Short seasonal menu + daily menu PDF',
      'Shaded terrace when the weather allows',
      'Open every day · 10am – 12am',
      'Pigalle metro (lines 2 and 12) nearby',
    ],
    directionsTitle: 'Getting here from Pigalle',
    directionsText:
      'From place Pigalle, head down towards Montmartre Cemetery / avenue Rachel: the restaurant is peaceful, away from the noise of main roads. Need directions? The contact page and Google Maps show the exact spot.',
    accessContact: 'Directions & contact',
    bookingTitle: 'Book from Pigalle',
  },
  clichy: {
    introEyebrow: 'Paris 17 / 18 · Place de Clichy',
    introTitle: 'Restaurant near Place de Clichy',
    introText:
      'An authentic neighbourhood bistro a few minutes’ walk from Place de Clichy.',
    metroTitle: 'Easy access from Clichy',
    metroP1Before: 'Metro ',
    metroStrong1: 'Place de Clichy (lines 2 and 13)',
    metroP1After:
      ': a few minutes’ walk to avenue Rachel. La Fourche (line 13) and Blanche (line 2) are also very close. The cul-de-sac is quiet: ideal for a business lunch or a family dinner in the evening.',
    accessTitle: 'A French bistro near Clichy metro',
    accessText:
      'Place de Clichy is a handy crossroads between the 17th and 18th arrondissements. For lunch or dinner without crossing all of Montmartre, Tifinagh offers traditional French cuisine at 17 avenue Rachel: fresh produce, generous plates, a real bistro feel — not a generic tourist-square table.',
    audienceTitle: 'Who is it for?',
    audienceItems: [
      'Regulars in the 17th / 18th who want homemade food',
      'Business lunches without wasting time',
      'Couples or friends dining away from Pigalle crowds',
      'Groups and private hire (partial from 15, full up to 40)',
    ],
    hoursTitle: 'Hours & reservations',
    hoursTextBefore: 'Open ',
    hoursEveryDay: 'every day',
    hoursTextAfter:
      ', 10am – 12am. Book by phone, Google Reserve or WhatsApp — especially at weekends and on show nights in the area.',
    privatizeLink: 'Private hire',
    bookingTitle: 'Book from Place de Clichy',
  },
  quartier: {
    landmarks: [
      {
        title: 'Montmartre Cemetery',
        text: 'Right on avenue Rachel, by the cemetery entrance: the perfect stop for a calm, indulgent break.',
      },
      {
        title: 'Montmartre & Sacré-Cœur',
        text: 'At the foot of the Montmartre hill, sheltered from the busiest tourist traffic.',
      },
    ],
    theatresTitle: 'Theatres & venues (before / after a show)',
    theatresIntro:
      'Ideally placed for a quick dinner before curtain up or a relaxed meal after the performance (continuous service & open until midnight):',
    cinemasTitle: 'Cinemas nearby',
    metroTitle: 'Metro access',
    metroLinesPrefix: 'lines ',
    theatreNotes: [
      '3 min walk on boulevard de Clichy',
      '5 min walk, rue Biot / Place de Clichy',
      'rue de Clichy',
      'boulevard de Rochechouart',
      'place Charles Dullin',
    ],
    cinemaNotes: ['Place de Clichy', 'Avenue de Clichy'],
  },
}

const pagesEs: PagesCopy = {
  around: {
    introEyebrow: 'París 18',
    introTitle: 'A nuestro alrededor',
    introText:
      'Un bistró de barrio en el 17 avenue Rachel — entre Montmartre, Pigalle y Place de Clichy.',
    bannerAria: 'Montmartre, Pigalle y el barrio',
    bannerAlt:
      'Panorama nocturno: Sacré-Cœur, Moulin Rouge, teatros y calles de Montmartre y Pigalle',
    neighborhoodsTitle: 'Nuestros barrios',
    neighborhoodsIntro1:
      'Tifinagh está en un callejón tranquilo, a poca distancia a pie de las grandes arterias del distrito 18. Vengas de Montmartre, Pigalle o Clichy, aquí encontrarás ',
    neighborhoodsIntroStrong: 'cocina francesa tradicional',
    neighborhoodsIntro2: ', 100 % casera.',
    openPrefix: 'Abierto ',
    openEveryDay: 'todos los días',
    accessPlan: 'Acceso y mapa',
    contactUs: 'Contactarnos',
    localLinks: {
      montmartre: {
        title: 'Montmartre y Sacré-Cœur',
        text: 'Al pie de la colina, en la tranquila avenue Rachel — lejos del bullicio turístico directo.',
      },
      pigalle: {
        title: 'Pigalle y Moulin Rouge',
        text: 'A pocos minutos a pie de Pigalle: ideal antes o después de un espectáculo.',
      },
      clichy: {
        title: 'Place de Clichy',
        text: 'Salida de metro líneas 2 y 13: comida casera sin cruzar todo Montmartre.',
      },
    },
  },
  gallery: {
    introEyebrow: 'El ambiente',
    introTitle: 'Galería',
    introText:
      'Instantes de la vida en Tifinagh, entre platos generosos y luces suaves.',
    photoAlts: [...galleryAltsEn],
  },
  privatisation: {
    introEyebrow: 'Eventos privados',
    introTitle: 'Privatización',
    introText: 'Cifras claras, formatos concretos, una sala lista para su velada.',
    bannerAria: 'Sala privatizable Tifinagh Montmartre',
    bannerAlt:
      'Sala del restaurante Tifinagh con banquetas rojas, mesas de madera y espacio privatizable',
    statPartialValue: '15+',
    statPartialLabel: 'Privatización parcial\ndesde 15 comensales',
    statTotalValue: '40',
    statTotalLabel: 'Privatización total\nhasta 40 comensales',
    statQuoteValue: 'Presupuesto',
    statQuoteLabel: 'Menús y presupuesto\nsegún su briefing',
    formatsTitle: 'Formatos más solicitados',
    formats: [
      'Cumpleaños y fiestas entre amigos',
      'Comidas de empresa / afterwork',
      'Seminarios y team building',
      'Comidas familiares y reuniones',
      'Antes del espectáculo (Pigalle / Moulin Rouge)',
      'Recepciones y eventos privados',
    ],
    howTitle: '¿Cómo funciona?',
    howText:
      'Llámenos o escríbanos con la fecha, el número de comensales y el tipo de evento. Le respondemos con una propuesta (menú, servicio, privatización parcial o total) — ',
    howStrong: 'siempre con presupuesto',
    whatsappQuoteMessage: 'Hola, me gustaría un presupuesto de privatización en Tifinagh.',
    bookingTitle: 'Hablemos de su evento',
    photoAlts: [
      'Sala privatizable del restaurante Tifinagh en Montmartre',
      'Espacio de privatización Tifinagh — elegante interior',
    ],
  },
  montmartre: {
    introEyebrow: 'París 18 · Montmartre',
    introTitle: 'Restaurante en Montmartre',
    introText:
      'Un auténtico bistró de barrio, en la tranquila avenue Rachel — lejos del bullicio de las arterias turísticas.',
    distinguishTitle: 'Lo que nos distingue',
    distinguishItems: [
      'Platos 100 % caseros, preparados cada mañana con productos frescos',
      'Carta breve de temporada + menú del día en PDF actualizado',
      'Terraza sombreada con parasoles rojos cuando el tiempo lo permite',
      'Ambiente bistró parisino: madera, mantelería vichy, servicio acogedor',
      'Abierto todos los días · 10:00 – 00:00',
    ],
    privatisationTitle: 'Privatización y grupos',
    privatisationText:
      'Cumpleaños, comidas de empresa o eventos privados: privatización parcial desde 15 personas, sala completa hasta 40 comensales. Presupuesto bajo petición por teléfono o WhatsApp.',
    photosLink: 'Fotos',
    aroundLink: 'A nuestro alrededor',
    accessContact: 'Acceso y contacto',
    bookingTitle: 'Reservar en Montmartre',
  },
  pigalle: {
    introEyebrow: 'París 18 · Pigalle',
    introTitle: 'Restaurante cerca de Pigalle',
    introText:
      'Un bistró francés tranquilo, a pocos minutos a pie de Pigalle y del Moulin Rouge.',
    whyTitle: 'Por qué cenar cerca de Pigalle en Tifinagh',
    whyP1Before:
      'Cada noche Pigalle atrae visitantes por sus espectáculos, teatros y energía. Muchos buscan después una mesa ',
    whyStrong1: 'verdaderamente francesa',
    whyP1Mid:
      ', sin las multitudes de las calles turísticas. Tifinagh está en el ',
    whyStrong2: '17 avenue Rachel',
    whyP1After:
      ', en un callejón tranquilo al pie de Montmartre — lo bastante cerca de Pigalle para ir a pie, lo bastante lejos para disfrutar de una cena tranquila.',
    showTitle: 'Ideal antes o después de un espectáculo',
    showText:
      'Moulin Rouge, salas de concierto y teatros del barrio están a distancia a pie. Nuestro equipo conoce el ritmo de las noches de función: servicio atento, cocina casera del día, y posibilidad de reservar para llegar con calma antes del telón.',
    onSiteTitle: 'Qué encontrará in situ',
    onSiteItems: [
      'Cocina tradicional francesa, 100 % casera',
      'Carta breve de temporada + menú del día en PDF',
      'Terraza sombreada cuando el tiempo lo permite',
      'Abierto todos los días · 10:00 – 00:00',
      'Metro Pigalle (líneas 2 y 12) a dos pasos',
    ],
    directionsTitle: 'Cómo llegar desde Pigalle',
    directionsText:
      'Desde place Pigalle, baje hacia el cementerio de Montmartre / avenue Rachel: el restaurante está en calma, lejos del ruido de las grandes vías. ¿Necesita indicaciones? La página de contacto y Google Maps señalan el punto exacto.',
    accessContact: 'Acceso y contacto',
    bookingTitle: 'Reservar desde Pigalle',
  },
  clichy: {
    introEyebrow: 'París 17 / 18 · Place de Clichy',
    introTitle: 'Restaurante Place de Clichy',
    introText:
      'Un bistró de barrio auténtico, a pocos minutos a pie de Place de Clichy.',
    metroTitle: 'Acceso sencillo desde Clichy',
    metroP1Before: 'Metro ',
    metroStrong1: 'Place de Clichy (líneas 2 y 13)',
    metroP1After:
      ': unos minutos a pie hasta avenue Rachel. La Fourche (línea 13) y Blanche (línea 2) también están muy cerca. El callejón es tranquilo: ideal para un almuerzo de negocios o una cena en familia por la noche.',
    accessTitle: 'Un bistró francés junto a la salida de metro Clichy',
    accessText:
      'Place de Clichy es un cruce práctico entre el distrito 17 y el 18. Para un almuerzo o cena sin cruzar todo Montmartre, Tifinagh ofrece cocina francesa tradicional en el 17 avenue Rachel: productos frescos, platos generosos, ambiente de bistró de verdad — no una mesa genérica de plaza turística.',
    audienceTitle: '¿Para quién?',
    audienceItems: [
      'Habitual del 17 / 18 que busca comida casera',
      'Almuerzos profesionales sin perder tiempo',
      'Cenas en pareja o con amigos lejos del flujo de Pigalle',
      'Grupos y privatizaciones (parcial desde 15, total hasta 40)',
    ],
    hoursTitle: 'Horario y reservas',
    hoursTextBefore: 'Abierto ',
    hoursEveryDay: 'todos los días',
    hoursTextAfter:
      ', 10:00 – 00:00. Reserve por teléfono, Google Reserve o WhatsApp — sobre todo el fin de semana y las noches de espectáculo en el barrio.',
    privatizeLink: 'Privatizar',
    bookingTitle: 'Reservar desde Place de Clichy',
  },
  quartier: {
    landmarks: [
      {
        title: 'Cementerio de Montmartre',
        text: 'En avenue Rachel, junto al acceso al cementerio: la parada ideal para una pausa tranquila y gourmet.',
      },
      {
        title: 'Montmartre y Sacré-Cœur',
        text: 'Al pie de la colina de Montmartre, alejado del bullicio turístico directo.',
      },
    ],
    theatresTitle: 'Teatros y salas (antes / después del espectáculo)',
    theatresIntro:
      'Ubicación ideal para una cena rápida antes del telón o una comida distendida después de la función (servicio continuo y abierto hasta medianoche):',
    cinemasTitle: 'Cines cercanos',
    metroTitle: 'Acceso en metro',
    metroLinesPrefix: 'líneas ',
    theatreNotes: [
      'a 3 min a pie por el boulevard de Clichy',
      'a 5 min a pie, rue Biot / Place de Clichy',
      'rue de Clichy',
      'boulevard de Rochechouart',
      'place Charles Dullin',
    ],
    cinemaNotes: ['Place de Clichy', 'Avenue de Clichy'],
  },
}

const pagesIt: PagesCopy = {
  around: {
    introEyebrow: 'Parigi 18',
    introTitle: 'Intorno a noi',
    introText:
      'Un bistrot di quartiere al 17 avenue Rachel — tra Montmartre, Pigalle e Place de Clichy.',
    bannerAria: 'Montmartre, Pigalle e il quartiere',
    bannerAlt:
      'Panorama notturno: Sacré-Cœur, Moulin Rouge, teatri e vie di Montmartre e Pigalle',
    neighborhoodsTitle: 'I nostri quartieri',
    neighborhoodsIntro1:
      'Tifinagh si trova in un vicolo tranquillo, a pochi passi dalle grandi arterie del 18° arrondissement. Che veniate da Montmartre, Pigalle o Clichy, troverete qui una ',
    neighborhoodsIntroStrong: 'cucina francese tradizionale',
    neighborhoodsIntro2: ', 100% fatta in casa.',
    openPrefix: 'Aperto ',
    openEveryDay: 'tutti i giorni',
    accessPlan: 'Accesso e mappa',
    contactUs: 'Contattaci',
    localLinks: {
      montmartre: {
        title: 'Montmartre e Sacré-Cœur',
        text: 'Ai piedi della collina, sulla tranquilla avenue Rachel — lontano dal tumulto turistico diretto.',
      },
      pigalle: {
        title: 'Pigalle e Moulin Rouge',
        text: 'A pochi minuti a piedi da Pigalle: ideale prima o dopo uno spettacolo.',
      },
      clichy: {
        title: 'Place de Clichy',
        text: 'Uscita metro linee 2 e 13: un pasto fatto in casa senza attraversare tutto Montmartre.',
      },
    },
  },
  gallery: {
    introEyebrow: 'L’atmosfera',
    introTitle: 'Galleria',
    introText:
      'Momenti di vita da Tifinagh, tra piatti generosi e luci soffuse.',
    photoAlts: [...galleryAltsEn],
  },
  privatisation: {
    introEyebrow: 'Eventi privati',
    introTitle: 'Privatizzazione',
    introText: 'Numeri chiari, formati concreti, una sala pronta per la vostra serata.',
    bannerAria: 'Sala privatizzabile Tifinagh Montmartre',
    bannerAlt:
      'Sala del ristorante Tifinagh con panchette rosse, tavoli in legno e spazio privatizzabile',
    statPartialValue: '15+',
    statPartialLabel: 'Privatizzazione parziale\ndai 15 coperti',
    statTotalValue: '40',
    statTotalLabel: 'Privatizzazione totale\nfino a 40 coperti',
    statQuoteValue: 'Su preventivo',
    statQuoteLabel: 'Menu e budget\nsecondo il vostro brief',
    formatsTitle: 'Formati più richiesti',
    formats: [
      'Compleanni e feste tra amici',
      'Pranzi aziendali / afterwork',
      'Seminari e team building',
      'Pranzi di famiglia e riunioni',
      'Prima dello spettacolo (Pigalle / Moulin Rouge)',
      'Ricevimenti ed eventi privati',
    ],
    howTitle: 'Come funziona?',
    howText:
      'Chiamateci o scriveteci con la data, il numero di ospiti e il tipo di evento. Vi rispondiamo con una proposta (menu, servizio, privatizzazione parziale o totale) — ',
    howStrong: 'sempre su preventivo',
    whatsappQuoteMessage: 'Buongiorno, vorrei un preventivo di privatizzazione da Tifinagh.',
    bookingTitle: 'Parliamo del vostro evento',
    photoAlts: [
      'Sala privatizzabile del ristorante Tifinagh a Montmartre',
      'Spazio privatizzazione Tifinagh — elegante interno',
    ],
  },
  montmartre: {
    introEyebrow: 'Parigi 18 · Montmartre',
    introTitle: 'Ristorante a Montmartre',
    introText:
      'Un vero bistrot di quartiere, sulla tranquilla avenue Rachel — lontano dal tumulto delle arterie turistiche.',
    distinguishTitle: 'Cosa ci distingue',
    distinguishItems: [
      'Piatti 100% fatti in casa, preparati ogni mattina con prodotti freschi',
      'Carta breve di stagione + menu del giorno in PDF aggiornato',
      'Terrazza ombreggiata con ombrelloni rossi quando il tempo lo consente',
      'Atmosfera bistrot parigino: legno, tovaglie vichy, servizio caloroso',
      'Aperto tutti i giorni · 10:00 – 00:00',
    ],
    privatisationTitle: 'Privatizzazione e gruppi',
    privatisationText:
      'Compleanni, pranzi aziendali o eventi privati: privatizzazione parziale da 15 persone, sala intera fino a 40 coperti. Preventivo su richiesta per telefono o WhatsApp.',
    photosLink: 'Foto',
    aroundLink: 'Intorno a noi',
    accessContact: 'Accesso e contatto',
    bookingTitle: 'Prenotare a Montmartre',
  },
  pigalle: {
    introEyebrow: 'Parigi 18 · Pigalle',
    introTitle: 'Ristorante vicino a Pigalle',
    introText:
      'Un bistrot francese tranquillo, a pochi minuti a piedi da Pigalle e dal Moulin Rouge.',
    whyTitle: 'Perché cenare vicino a Pigalle da Tifinagh',
    whyP1Before:
      'Ogni sera Pigalle attira visitatori per spettacoli, teatri ed energia. Molti cercano poi un tavolo ',
    whyStrong1: 'davvero francese',
    whyP1Mid:
      ', senza la folla delle vie turistiche. Tifinagh si trova al ',
    whyStrong2: '17 avenue Rachel',
    whyP1After:
      ', in un vicolo tranquillo ai piedi di Montmartre — abbastanza vicino a Pigalle per arrivare a piedi, abbastanza lontano per godersi una cena rilassata.',
    showTitle: 'Ideale prima o dopo uno spettacolo',
    showText:
      'Moulin Rouge, sale da concerto e teatri del quartiere sono a distanza a piedi. Il nostro team conosce il ritmo delle serate di spettacolo: servizio attento, cucina casalinga preparata il giorno stesso, e possibilità di prenotare per arrivare sereni prima del sipario.',
    onSiteTitle: 'Cosa troverete sul posto',
    onSiteItems: [
      'Cucina tradizionale francese, 100% fatta in casa',
      'Carta breve di stagione + menu del giorno in PDF',
      'Terrazza ombreggiata quando il tempo lo consente',
      'Aperto tutti i giorni · 10:00 – 00:00',
      'Metro Pigalle (linee 2 e 12) a due passi',
    ],
    directionsTitle: 'Come arrivare da Pigalle',
    directionsText:
      'Da place Pigalle, scendete verso il cimitero di Montmartre / avenue Rachel: il ristorante è al calmo, lontano dal rumore delle grandi vie. Serve un itinerario? La pagina contatti e Google Maps indicano il punto esatto.',
    accessContact: 'Accesso e contatto',
    bookingTitle: 'Prenotare da Pigalle',
  },
  clichy: {
    introEyebrow: 'Parigi 17 / 18 · Place de Clichy',
    introTitle: 'Ristorante Place de Clichy',
    introText:
      'Un bistrot di quartiere autentico, a pochi minuti a piedi da Place de Clichy.',
    metroTitle: 'Accesso semplice da Clichy',
    metroP1Before: 'Metro ',
    metroStrong1: 'Place de Clichy (linee 2 e 13)',
    metroP1After:
      ': pochi minuti a piedi fino ad avenue Rachel. La Fourche (linea 13) e Blanche (linea 2) sono anch’essi molto vicini. Il vicolo è tranquillo: ideale per un pranzo di lavoro o una cena in famiglia la sera.',
    accessTitle: 'Un bistrot francese all’uscita della metro Clichy',
    accessText:
      'Place de Clichy è un incrocio pratico tra il 17° e il 18° arrondissement. Per un pranzo o una cena senza attraversare tutto Montmartre, Tifinagh offre cucina francese tradizionale al 17 avenue Rachel: prodotti freschi, piatti generosi, atmosfera da vero bistrot — non un tavolo generico da piazza turistica.',
    audienceTitle: 'Per chi?',
    audienceItems: [
      'Abituati del 17° / 18° che vogliono cibo fatto in casa',
      'Pranzi professionali senza perdere tempo',
      'Cene in coppia o tra amici lontano dai flussi di Pigalle',
      'Gruppi e privatizzazioni (parziale da 15, totale fino a 40)',
    ],
    hoursTitle: 'Orari e prenotazioni',
    hoursTextBefore: 'Aperto ',
    hoursEveryDay: 'tutti i giorni',
    hoursTextAfter:
      ', 10:00 – 00:00. Prenotate per telefono, Google Reserve o WhatsApp — soprattutto nel weekend e nelle serate di spettacolo nel quartiere.',
    privatizeLink: 'Privatizzare',
    bookingTitle: 'Prenotare da Place de Clichy',
  },
  quartier: {
    landmarks: [
      {
        title: 'Cimitero di Montmartre',
        text: 'Su avenue Rachel, all’altezza dell’accesso al cimitero: la sosta ideale per una pausa tranquilla e golosa.',
      },
      {
        title: 'Montmartre e Sacré-Cœur',
        text: 'Ai piedi della collina di Montmartre, al riparo dal tumulto turistico diretto.',
      },
    ],
    theatresTitle: 'Teatri e sale (prima / dopo lo spettacolo)',
    theatresIntro:
      'Posizione ideale per una cena veloce prima del sipario o un pasto conviviale dopo lo spettacolo (servizio continuo e aperto fino a mezzanotte):',
    cinemasTitle: 'Cinema nelle vicinanze',
    metroTitle: 'Accessibilità metro',
    metroLinesPrefix: 'linee ',
    theatreNotes: [
      'a 3 min a piedi sul boulevard de Clichy',
      'a 5 min a piedi, rue Biot / Place de Clichy',
      'rue de Clichy',
      'boulevard de Rochechouart',
      'place Charles Dullin',
    ],
    cinemaNotes: ['Place de Clichy', 'Avenue de Clichy'],
  },
}

const pagesZh: PagesCopy = {
  around: {
    introEyebrow: '巴黎十八区',
    introTitle: '周边',
    introText: '蒙马特、皮加勒与克利希广场之间的社区小馆，地址：Rachel 大街 17 号。',
    bannerAria: '蒙马特、皮加勒与周边',
    bannerAlt: '夜景全景：圣心堂、红磨坊、蒙马特与皮加勒的剧院与街道',
    neighborhoodsTitle: '我们的街区',
    neighborhoodsIntro1:
      'Tifinagh 坐落在安静的小巷里，步行可达十八区主要干道。无论您从蒙马特、皮加勒还是克利希前来，这里都有',
    neighborhoodsIntroStrong: '传统法式料理',
    neighborhoodsIntro2: '，全部自制。',
    openPrefix: '营业 ',
    openEveryDay: '每日',
    accessPlan: '交通与地图',
    contactUs: '联系我们',
    localLinks: {
      montmartre: {
        title: '蒙马特与圣心堂',
        text: '位于山丘脚下、Rachel 大街的安静一侧——远离最拥挤的旅游主干道。',
      },
      pigalle: {
        title: '皮加勒与红磨坊',
        text: '距皮加勒步行数分钟：演出前后用餐的理想选择。',
      },
      clichy: {
        title: '克利希广场',
        text: '地铁 2、13 号线出口：不必穿越整个蒙马特，也能享用自制餐点。',
      },
    },
  },
  gallery: {
    introEyebrow: '氛围',
    introTitle: '相册',
    introText: 'Tifinagh 的若干瞬间——丰盛菜肴与柔和灯光。',
    photoAlts: [...galleryAltsEn],
  },
  privatisation: {
    introEyebrow: '私人活动',
    introTitle: '包场',
    introText: '数字清晰、形式具体，厅堂已为您的晚宴就绪。',
    bannerAria: 'Tifinagh 蒙马特可包场餐室',
    bannerAlt: 'Tifinagh 餐厅餐室：红色卡座、木桌与可包场空间',
    statPartialValue: '15+',
    statPartialLabel: '部分包场\n15 位起',
    statTotalValue: '40',
    statTotalLabel: '全场包场\n最多 40 位',
    statQuoteValue: '报价',
    statQuoteLabel: '菜单与预算\n按您的需求',
    formatsTitle: '最受欢迎的形式',
    formats: [
      '生日与朋友聚会',
      '商务餐 / 下班小聚',
      '研讨会与团建',
      '家庭聚餐与聚会',
      '观演前（皮加勒 / 红磨坊）',
      '招待会与私人活动',
    ],
    howTitle: '如何预订？',
    howText:
      '请致电或留言，告知日期、人数与活动类型。我们会回复方案（菜单、服务、部分或全场包场）——',
    howStrong: '一律按报价',
    whatsappQuoteMessage: '您好，我想咨询 Tifinagh 的包场报价。',
    bookingTitle: '聊聊您的活动',
    photoAlts: [
      'Tifinagh 蒙马特可包场餐室',
      'Tifinagh 包场空间——典雅内景',
    ],
  },
  montmartre: {
    introEyebrow: '巴黎十八区 · 蒙马特',
    introTitle: '蒙马特餐厅',
    introText: '真正的社区小馆，位于安静的 Rachel 大街——远离旅游热线的喧嚣。',
    distinguishTitle: '我们的特色',
    distinguishItems: [
      '100% 自制，每日清晨用新鲜食材准备',
      '精简时令菜单 + 每日更新的 PDF 当日菜单',
      '天气允许时有红色遮阳伞的阴凉露台',
      '巴黎小馆氛围：木质、格子桌布、热情服务',
      '每日营业 · 10:00 – 00:00',
    ],
    privatisationTitle: '包场与团体',
    privatisationText:
      '生日、商务餐或私人活动：15 人起部分包场，全场最多 40 位。电话或 WhatsApp 索取报价。',
    photosLink: '照片',
    aroundLink: '周边',
    accessContact: '交通与联系',
    bookingTitle: '在蒙马特预订',
  },
  pigalle: {
    introEyebrow: '巴黎十八区 · 皮加勒',
    introTitle: '皮加勒附近餐厅',
    introText: '安静的法式小馆，距皮加勒与红磨坊步行数分钟。',
    whyTitle: '为什么在皮加勒附近选择 Tifinagh',
    whyP1Before:
      '每晚皮加勒因演出、剧院与活力吸引访客。许多人随后寻找一张',
    whyStrong1: '真正法式',
    whyP1Mid: '的餐桌，远离旅游街区的拥挤。Tifinagh 位于',
    whyStrong2: 'Rachel 大街 17 号',
    whyP1After:
      '，蒙马特山脚下安静小巷——距皮加勒足够近可步行，又足够远，可安心享用晚餐。',
    showTitle: '观演前后皆宜',
    showText:
      '红磨坊、音乐厅与附近剧院均可步行到达。团队熟悉演出夜的节奏：周到服务、当日自制菜肴，并可预订以便从容在开场前抵达。',
    onSiteTitle: '店内提供',
    onSiteItems: [
      '传统法式料理，100% 自制',
      '精简时令菜单 + PDF 当日菜单',
      '天气允许时的阴凉露台',
      '每日营业 · 10:00 – 00:00',
      '皮加勒地铁（2、12 号线）近在咫尺',
    ],
    directionsTitle: '从皮加勒如何到达',
    directionsText:
      '从皮加勒广场下行，朝蒙马特公墓 / Rachel 大街方向：餐厅宁静，远离主干道噪音。需要路线？联系页与 Google 地图可精确定位。',
    accessContact: '交通与联系',
    bookingTitle: '从皮加勒预订',
  },
  clichy: {
    introEyebrow: '巴黎十七 / 十八区 · 克利希广场',
    introTitle: '克利希广场餐厅',
    introText: '正宗社区小馆，距克利希广场步行数分钟。',
    metroTitle: '从克利希便捷到达',
    metroP1Before: '地铁 ',
    metroStrong1: 'Place de Clichy（2、13 号线）',
    metroP1After:
      '：步行数分钟即可到 Rachel 大街。Fourche（13 号线）与 Blanche（2 号线）也很近。小巷安静：适合工作日商务午餐或晚间家庭晚餐。',
    accessTitle: '克利希地铁口附近的法式小馆',
    accessText:
      '克利希广场是十七区与十八区之间的便利枢纽。若想午餐或晚餐而不必穿越整个蒙马特，Tifinagh 在 Rachel 大街 17 号提供传统法式料理：新鲜食材、丰盛菜肴、真实小馆氛围——不是旅游广场上的千篇一律。',
    audienceTitle: '适合谁？',
    audienceItems: [
      '十七 / 十八区常客，想要自制菜',
      '省时商务午餐',
      '避开皮加勒人流的情侣或朋友晚餐',
      '团体与包场（部分 15 人起，全场最多 40 位）',
    ],
    hoursTitle: '营业时间与预订',
    hoursTextBefore: '营业 ',
    hoursEveryDay: '每日',
    hoursTextAfter:
      '，10:00 – 00:00。请电话、Google Reserve 或 WhatsApp 预订——周末及街区演出夜尤其建议提前订位。',
    privatizeLink: '包场',
    bookingTitle: '从克利希广场预订',
  },
  quartier: {
    landmarks: [
      {
        title: '蒙马特公墓',
        text: '就在 Rachel 大街、公墓入口旁：安静而美味的小憩之选。',
      },
      {
        title: '蒙马特与圣心堂',
        text: '位于蒙马特山丘脚下，远离最直接的旅游人潮。',
      },
    ],
    theatresTitle: '剧院与演出场所（观演前 / 后）',
    theatresIntro:
      '位置理想：开演前快速晚餐，或演出后轻松聚餐（连续服务，营业至午夜）：',
    cinemasTitle: '附近电影院',
    metroTitle: '地铁可达性',
    metroLinesPrefix: '号线 ',
    theatreNotes: [
      '步行 3 分钟，Clichy 大道',
      '步行 5 分钟，Biot 街 / 克利希广场',
      'Clichy 街',
      'Rochechouart 大道',
      'Charles Dullin 广场',
    ],
    cinemaNotes: ['克利希广场', 'Clichy 大街'],
  },
}

export const pagesByLocale: Record<Locale, PagesCopy> = {
  fr: pagesFr,
  en: pagesEn,
  es: pagesEs,
  it: pagesIt,
  zh: pagesZh,
  de: pagesDe,
  pt: pagesPt,
  ru: pagesRu,
  sv: pagesSv,
  zgh: pagesZgh,
}
