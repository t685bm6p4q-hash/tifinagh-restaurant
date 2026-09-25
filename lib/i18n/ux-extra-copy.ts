import type { Locale } from './config'

export type UxExtraCopy = {
  bookingGuide: string
  homeDiscoverDrinks: string
  mapLoadInteractive: string
  mapPreviewAlt: string
  footerExploreTitle: string
  practical: {
    title: string
    items: string[]
  }
}

const fr: UxExtraCopy = {
  bookingGuide:
    'En ligne : confirmation immédiate · WhatsApp : question ou demande précise · Téléphone : idéal pour le jour même.',
  homeDiscoverDrinks: 'Carte des boissons',
  mapLoadInteractive: 'Afficher la carte interactive Google Maps',
  mapPreviewAlt: 'Plan du quartier Montmartre autour du restaurant Tifinagh',
  footerExploreTitle: 'Découvrir',
  practical: {
    title: 'Bon à savoir avant votre venue',
    items: [
      'Carte des plats et des boissons détaillées sur le site, avec les prix — pour préparer votre repas en toute transparence.',
      'Menu du jour consultable en ligne, mis à jour chaque matin.',
      'Terrasse ombragée lorsque la météo le permet.',
      'Cuisine 100 % maison ; réservation conseillée le week-end et les soirs de spectacle.',
      'Privatisation partielle ou totale : demandez un devis via la page Privatisation ou par téléphone.',
    ],
  },
}

const en: UxExtraCopy = {
  bookingGuide:
    'Online: instant booking · WhatsApp: quick message or special request · Phone: best for same-day tables.',
  homeDiscoverDrinks: 'Drinks menu',
  mapLoadInteractive: 'Show interactive Google Map',
  mapPreviewAlt: 'Map of Montmartre around Tifinagh restaurant',
  footerExploreTitle: 'Explore',
  practical: {
    title: 'Good to know before you visit',
    items: [
      'Full food and drinks menus online with prices — plan your meal with no surprises.',
      'Today’s set menu available online, updated every morning.',
      'Shaded terrace when the weather allows.',
      '100% homemade cooking; booking recommended on weekends and show nights.',
      'Partial or full private hire — request a quote on our Private events page or by phone.',
    ],
  },
}

const es: UxExtraCopy = {
  bookingGuide:
    'En línea: reserva confirmada · WhatsApp: mensaje o petición · Teléfono: ideal para el mismo día.',
  homeDiscoverDrinks: 'Carta de bebidas',
  mapLoadInteractive: 'Mostrar el mapa interactivo de Google Maps',
  mapPreviewAlt: 'Mapa del barrio de Montmartre alrededor del restaurante Tifinagh',
  footerExploreTitle: 'Descubrir',
  practical: {
    title: 'Antes de venir',
    items: [
      'Carta de platos y bebidas detallada en la web, con precios, para planificar sin sorpresas.',
      'Menú del día en línea, actualizado cada mañana.',
      'Terraza con sombra cuando el tiempo lo permite.',
      'Cocina 100 % casera; reserva recomendada los fines de semana y noches de espectáculo.',
      'Eventos privados parciales o totales — presupuesto en la página Privatización o por teléfono.',
    ],
  },
}

const it: UxExtraCopy = {
  bookingGuide:
    'Online: prenotazione confermata · WhatsApp: messaggio o richiesta · Telefono: ideale per oggi.',
  homeDiscoverDrinks: 'Carta delle bevande',
  mapLoadInteractive: 'Mostra la mappa interattiva Google Maps',
  mapPreviewAlt: 'Mappa del quartiere Montmartre intorno al ristorante Tifinagh',
  footerExploreTitle: 'Scopri',
  practical: {
    title: 'Prima della visita',
    items: [
      'Menu piatti e bevande dettagliati sul sito, con prezzi, per organizzarvi in anticipo.',
      'Menu del giorno online, aggiornato ogni mattina.',
      'Terrazza ombreggiata quando il tempo lo consente.',
      'Cucina 100 % fatta in casa; prenotazione consigliata nel weekend e nei giorni di spettacolo.',
      'Eventi privati parziali o totali — preventivo nella pagina Privatizzazione o per telefono.',
    ],
  },
}

const zh: UxExtraCopy = {
  bookingGuide: '在线：即时预订 · WhatsApp：留言或特殊需求 · 电话：适合当天订位。',
  homeDiscoverDrinks: '饮品单',
  mapLoadInteractive: '显示 Google 交互式地图',
  mapPreviewAlt: 'Tifinagh 餐厅周边蒙马特街区地图',
  footerExploreTitle: '浏览',
  practical: {
    title: '到访前须知',
    items: [
      '网站提供含价格的详细菜品与饮品单，方便提前规划消费。',
      '每日套餐在线查看，每天早晨更新。',
      '天气允许时可使用遮阳露台。',
      '100% 自制料理；周末及演出夜建议预订。',
      '部分或全场包场 — 请通过包场页面或电话询价。',
    ],
  },
}

const de: UxExtraCopy = {
  bookingGuide:
    'Online: Reservierung bestätigt · WhatsApp: Nachricht · Telefon: ideal für heute.',
  homeDiscoverDrinks: 'Getränkekarte',
  mapLoadInteractive: 'Interaktive Google Maps-Karte anzeigen',
  mapPreviewAlt: 'Karte der Montmartre-Umgebung um Restaurant Tifinagh',
  footerExploreTitle: 'Entdecken',
  practical: {
    title: 'Vor Ihrem Besuch',
    items: [
      'Detaillierte Speise- und Getränkekarte mit Preisen online — transparent planen.',
      'Tagesmenü online, jeden Morgen aktualisiert.',
      'Schattige Terrasse bei schönem Wetter.',
      '100 % hausgemacht; Reservierung am Wochenende und an Show-Abenden empfohlen.',
      'Teilweise oder komplette Privatisierung — Anfrage über Privatisierung oder telefonisch.',
    ],
  },
}

const pt: UxExtraCopy = {
  bookingGuide:
    'Online: reserva confirmada · WhatsApp: mensagem · Telefone: ideal para hoje.',
  homeDiscoverDrinks: 'Carta de bebidas',
  mapLoadInteractive: 'Mostrar o mapa interativo Google Maps',
  mapPreviewAlt: 'Mapa do bairro de Montmartre em torno do restaurante Tifinagh',
  footerExploreTitle: 'Explorar',
  practical: {
    title: 'Antes da visita',
    items: [
      'Carta de pratos e bebidas detalhada no site, com preços, para planear com transparência.',
      'Menu do dia online, atualizado todas as manhãs.',
      'Esplanada sombreada quando o tempo permite.',
      'Cozinha 100 % caseira; reserva recomendada ao fim de semana e em noites de espetáculo.',
      'Eventos privados parciais ou totais — orçamento na página Privatização ou por telefone.',
    ],
  },
}

const ru: UxExtraCopy = {
  bookingGuide:
    'Онлайн: подтверждённая бронь · WhatsApp: сообщение · Телефон: для брони в тот же день.',
  homeDiscoverDrinks: 'Карта напитков',
  mapLoadInteractive: 'Показать интерактивную карту Google Maps',
  mapPreviewAlt: 'Карта квартала Монмартр вокруг ресторана Tifinagh',
  footerExploreTitle: 'Разделы',
  practical: {
    title: 'Полезно знать',
    items: [
      'Подробные меню блюд и напитков с ценами на сайте — планируйте заранее.',
      'Меню дня онлайн, обновляется каждое утро.',
      'Тенистая терраса в хорошую погоду.',
      '100 % домашняя кухня; бронь рекомендуется в выходные и вечера спектаклей.',
      'Частная аренда — запрос через страницу Privatisation или по телефону.',
    ],
  },
}

const sv: UxExtraCopy = {
  bookingGuide:
    'Online: bekräftad bokning · WhatsApp: meddelande · Telefon: bäst samma dag.',
  homeDiscoverDrinks: 'Dryckesmeny',
  mapLoadInteractive: 'Visa interaktiv Google Maps-karta',
  mapPreviewAlt: 'Karta över Montmartre runt restaurangen Tifinagh',
  footerExploreTitle: 'Utforska',
  practical: {
    title: 'Innan besöket',
    items: [
      'Detaljerade mat- och dryckesmenyer med priser online — planera i förväg.',
      'Dagens meny online, uppdateras varje morgon.',
      'Skuggig terrass när vädret tillåter.',
      '100 % hemlagat; bokning rekommenderas på helger och showkvällar.',
      'Privata evenemang — offert via Privatisering eller telefon.',
    ],
  },
}

const zgh: UxExtraCopy = {
  bookingGuide:
    'ⵉⵏⵙⵉⵎⵎⵓⵙ · WhatsApp · ⵜⵉⵍⵉⴼⵓⵏ — ⴰⵙⵙⵓⵎⵔ ⵙ ⵉⵏⵙⵉⵎⵎⵓⵙ, ⵉⵣⵏ ⴳ WhatsApp.',
  homeDiscoverDrinks: 'ⵜⴰⵎⵓⵔⵜ ⵏ ⵉⵙⵙⵓⵏ',
  mapLoadInteractive: 'Afficher la carte interactive Google Maps',
  mapPreviewAlt: 'Plan du quartier Montmartre autour du restaurant Tifinagh',
  footerExploreTitle: 'ⵙⴽⵏ',
  practical: {
    title: 'ⵙ ⵓⵙ ⴷ ⵜⴷⵓⴷⴷⵎ',
    items: [
      'ⵜⴰⵎⵓⵔⵜ ⵏ ⵉⵛⵛⴰⵏ ⴷ ⵉⵙⵙⵓⵏ ⵙ ⵉⵙⵙⵉⵏ — ⴰⵙⵙⵓⵎⵔ ⵙ ⵓⵙⵙⵉⵏ.',
      'ⵜⴰⵎⵓⵔⵜ ⵏ ⵓⵙⵙⴰⵙ ⴳ ⵓⵙⵙⵉⵜ.',
      'ⵜⴰⵔⴰⵙ.',
      'ⴰⵙⵙⵓⵎⵔ ⵉⵎⵙⵙⵉⵏ ⴳ ⵡⵉⴽⵏⴷ.',
      'Privatisation — /privatisation.',
    ],
  },
}

export const uxExtraByLocale: Record<Locale, UxExtraCopy> = {
  fr,
  en,
  es,
  it,
  zh,
  de,
  pt,
  ru,
  sv,
  zgh,
}

export function getUxExtra(locale: Locale): UxExtraCopy {
  return uxExtraByLocale[locale]
}
