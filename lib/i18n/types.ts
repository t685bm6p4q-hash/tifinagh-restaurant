export type MenuItemCopy = {
  name: string
  description: string
}

export type MetroCopy = {
  lines: string
  note: string
}

export type Dictionary = {
  nav: {
    home: string
    carte: string
    dailyMenu: string
    gallery: string
    privatisation: string
    around: string
    reservation: string
    contact: string
    book: string
    toggleMenu: string
    ariaMain: string
    language: string
    chooseLanguage: string
  }
  common: {
    directions: string
    hoursRange: string
  }
  hours: {
    days: string
    hours: string
    full: string
    openToday: string
  }
  booking: {
    title: string
    call: string
    google: string
    whatsapp: string
    whatsappMessage: string
  }
  sticky: {
    aria: string
    call: string
  }
  footer: {
    openingHours: string
    nearbyMetro: string
    followUs: string
    bookWhatsapp: string
    bookGoogle: string
    legal: string
    copyright: string
    instagramAria: string
    facebookAria: string
    googleAria: string
    pagesJaunesAria: string
  }
  localLinks: {
    montmartre: string
    pigalle: string
    clichy: string
  }
  metro: {
    clichy: MetroCopy
    blanche: MetroCopy
    pigalle: MetroCopy
    fourche: MetroCopy
    abbesses: MetroCopy
  }
  home: {
    heroEyebrow: string
    heroTitle: string
    heroTitleEm: string
    heroCopy: string
    bookTable: string
    discoverMenu: string
    heroImageAlt: string
    storyEyebrow: string
    storyTitle: string
    storyP1: string
    storyP2: string
    homemadeTitle: string
    homemadeText: string
    wineTitle: string
    wineText: string
    dishAlt: string
    bannerTitle: string
    bannerLink: string
    menuEyebrow: string
    menuTitle: string
    menuText: string
    dailyMenuLink: string
    dailyMenuAria: string
    fullMenuLink: string
    reviewsEyebrow: string
    reviewsTitle: string
    googleReviewsAria: string
    googleReviewsTitle: string
    googleReviewsSubtitle: string
    reserveEyebrow: string
    reserveTitle: string
    reserveText: string
    mapEyebrow: string
    mapTitle: string
    mapText: string
    mapAria: string
    facadeAlt: string
    tonightMenu: string
    quotes: {
      bertrand: string
      vale: string
      celine: string
    }
  }
  carte: {
    eyebrow: string
    title: string
    text: string
    bannerTitle: string
    bannerText: string
    terraceAlt: string
    dailyInviteEyebrow: string
    dailyInviteTitle: string
    dailyInviteText: string
    dailyInviteCta: string
  }
  dailyMenuPage: {
    carteInviteEyebrow: string
    carteInviteTitle: string
    carteInviteText: string
    carteInviteCta: string
  }
  menu: {
    starters: {
      title: string
      items: {
        foieGras: MenuItemCopy
        onionSoup: MenuItemCopy
        snails: MenuItemCopy
      }
    }
    mains: {
      title: string
      items: {
        duckConfit: MenuItemCopy
        beefCheek: MenuItemCopy
        landaiseSalad: MenuItemCopy
        croqueMonsieur: MenuItemCopy
        entrecote: MenuItemCopy
      }
    }
    desserts: {
      title: string
      items: {
        cremeBrulee: MenuItemCopy
        tarteTatin: MenuItemCopy
        brownie: MenuItemCopy
        cafeGourmand: MenuItemCopy
      }
    }
  }
  contact: {
    eyebrow: string
    title: string
    text: string
    address: string
    phone: string
    phoneNote: string
    hours: string
    hoursDays: string
    nearbyMetro: string
    mapEyebrow: string
    mapTitle: string
    mapText: string
    mapIframeTitle: string
  }
}
