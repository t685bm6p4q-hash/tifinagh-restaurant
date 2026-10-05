import type { Locale } from './config'

export type NotFoundCopy = {
  eyebrow: string
  title: string
  text: string
  home: string
  carte: string
  drinks: string
  reserve: string
  contact: string
}

const copy: Record<Locale, NotFoundCopy> = {
  fr: {
    eyebrow: 'Erreur 404',
    title: 'Page introuvable',
    text: 'Cette adresse n’existe pas ou a été déplacée.',
    home: 'Retour à l’accueil',
    carte: 'Voir la carte',
    drinks: 'Carte des boissons',
    reserve: 'Réserver',
    contact: 'Contact',
  },
  en: {
    eyebrow: 'Error 404',
    title: 'Page not found',
    text: 'This address does not exist or has moved.',
    home: 'Back to home',
    carte: 'Food menu',
    drinks: 'Drinks menu',
    reserve: 'Book a table',
    contact: 'Contact',
  },
  es: {
    eyebrow: 'Error 404',
    title: 'Página no encontrada',
    text: 'Esta dirección no existe o ha cambiado.',
    home: 'Volver al inicio',
    carte: 'Ver la carta',
    drinks: 'Carta de bebidas',
    reserve: 'Reservar',
    contact: 'Contacto',
  },
  it: {
    eyebrow: 'Errore 404',
    title: 'Pagina non trovata',
    text: 'Questo indirizzo non esiste o è stato spostato.',
    home: 'Torna alla home',
    carte: 'Vedi il menu',
    drinks: 'Carta delle bevande',
    reserve: 'Prenota',
    contact: 'Contatti',
  },
  zh: {
    eyebrow: '404 错误',
    title: '页面未找到',
    text: '该地址不存在或已更改。',
    home: '返回首页',
    carte: '查看菜单',
    drinks: '饮品单',
    reserve: '预订',
    contact: '联系',
  },
  de: {
    eyebrow: 'Fehler 404',
    title: 'Seite nicht gefunden',
    text: 'Diese Adresse existiert nicht oder wurde verschoben.',
    home: 'Zur Startseite',
    carte: 'Speisekarte',
    drinks: 'Getränkekarte',
    reserve: 'Reservieren',
    contact: 'Kontakt',
  },
  pt: {
    eyebrow: 'Erro 404',
    title: 'Página não encontrada',
    text: 'Este endereço não existe ou foi movido.',
    home: 'Voltar ao início',
    carte: 'Ver a carta',
    drinks: 'Carta de bebidas',
    reserve: 'Reservar',
    contact: 'Contacto',
  },
  ru: {
    eyebrow: 'Ошибка 404',
    title: 'Страница не найдена',
    text: 'Такого адреса нет или он был изменён.',
    home: 'На главную',
    carte: 'Меню',
    drinks: 'Напитки',
    reserve: 'Забронировать',
    contact: 'Контакты',
  },
  sv: {
    eyebrow: 'Fel 404',
    title: 'Sidan hittades inte',
    text: 'Adressen finns inte eller har flyttats.',
    home: 'Till startsidan',
    carte: 'Matmeny',
    drinks: 'Dryckesmeny',
    reserve: 'Boka',
    contact: 'Kontakt',
  },
  ja: {
    eyebrow: 'エラー 404',
    title: 'ページが見つかりません',
    text: 'このアドレスは存在しないか、移動しました。',
    home: 'ホームに戻る',
    carte: 'メニューを見る',
    drinks: 'ドリンクメニュー',
    reserve: '予約',
    contact: 'お問い合わせ',
  },
  ko: {
    eyebrow: '오류 404',
    title: '페이지를 찾을 수 없습니다',
    text: '주소가 존재하지 않거나 변경되었습니다.',
    home: '홈으로',
    carte: '메뉴 보기',
    drinks: '음료 메뉴',
    reserve: '예약',
    contact: '문의',
  },
  ar: {
    eyebrow: 'خطأ 404',
    title: 'الصفحة غير موجودة',
    text: 'هذا العنوان غير موجود أو تم نقله.',
    home: 'العودة إلى الصفحة الرئيسية',
    carte: 'عرض القائمة',
    drinks: 'قائمة المشروبات',
    reserve: 'حجز',
    contact: 'اتصل بنا',
  },
  zgh: {
    eyebrow: '404',
    title: 'ⵓⵔ ⵜⵍⵍⵉ',
    text: 'ⵓⵔ ⵜⵍⵍⵉ ⵏⵉⴷ ⵓⵔ ⵉⵍⵍⴰ.',
    home: 'ⴰⵙⵙⴰⵖ',
    carte: 'ⵜⴰⵎⵓⵔⵜ',
    drinks: 'ⵉⵙⵙⵓⵏ',
    reserve: 'ⴰⵙⵙⵓⵎⵔ',
    contact: 'ⴰⵏⵏⴰⵢ',
  },
}

export function getNotFoundCopy(locale: Locale): NotFoundCopy {
  return copy[locale]
}
