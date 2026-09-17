export type MenuItemCopy = {
  name: string
  description: string
}

export type SeoPageCopy = {
  title: string
  description: string
  keywords?: string[]
}

export type AroundLocalLinkCopy = { title: string; text: string }

export type PagesCopy = {
  around: {
    introEyebrow: string
    introTitle: string
    introText: string
    bannerAria: string
    bannerAlt: string
    neighborhoodsTitle: string
    neighborhoodsIntro1: string
    neighborhoodsIntroStrong: string
    neighborhoodsIntro2: string
    openPrefix: string
    openEveryDay: string
    accessPlan: string
    contactUs: string
    localLinks: {
      montmartre: AroundLocalLinkCopy
      pigalle: AroundLocalLinkCopy
      clichy: AroundLocalLinkCopy
    }
  }
  gallery: {
    introEyebrow: string
    introTitle: string
    introText: string
    photoAlts: string[]
  }
  privatisation: {
    introEyebrow: string
    introTitle: string
    introText: string
    bannerAria: string
    bannerAlt: string
    statPartialValue: string
    statPartialLabel: string
    statTotalValue: string
    statTotalLabel: string
    statQuoteValue: string
    statQuoteLabel: string
    formatsTitle: string
    formats: string[]
    howTitle: string
    howText: string
    howStrong: string
    whatsappQuoteMessage: string
    bookingTitle: string
    photoAlts: [string, string]
  }
  montmartre: {
    introEyebrow: string
    introTitle: string
    introText: string
    distinguishTitle: string
    distinguishItems: string[]
    privatisationTitle: string
    privatisationText: string
    photosLink: string
    aroundLink: string
    accessContact: string
    bookingTitle: string
  }
  pigalle: {
    introEyebrow: string
    introTitle: string
    introText: string
    whyTitle: string
    whyP1Before: string
    whyStrong1: string
    whyP1Mid: string
    whyStrong2: string
    whyP1After: string
    showTitle: string
    showText: string
    onSiteTitle: string
    onSiteItems: string[]
    directionsTitle: string
    directionsText: string
    accessContact: string
    bookingTitle: string
  }
  clichy: {
    introEyebrow: string
    introTitle: string
    introText: string
    metroTitle: string
    metroP1Before: string
    metroStrong1: string
    metroP1After: string
    accessTitle: string
    accessText: string
    audienceTitle: string
    audienceItems: string[]
    hoursTitle: string
    hoursTextBefore: string
    hoursEveryDay: string
    hoursTextAfter: string
    privatizeLink: string
    bookingTitle: string
  }
  quartier: {
    landmarks: [{ title: string; text: string }, { title: string; text: string }]
    theatresTitle: string
    theatresIntro: string
    cinemasTitle: string
    metroTitle: string
    metroLinesPrefix: string
    theatreNotes: string[]
    cinemaNotes: string[]
  }
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
    cookies: string
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
    introEyebrow: string
    introTitle: string
    introText: string
    limitedNote: string
    bookNow: string
    hoursTitle: string
    hoursLine: string
    phoneLabel: string
    whatsappReserveMessage: string
    carteInviteEyebrow: string
    carteInviteTitle: string
    carteInviteText: string
    carteInviteCta: string
  }
  reservationPage: {
    introEyebrow: string
    introTitle: string
    introText: string
    channelsTitle: string
    whatsappHint: string
    nameLabel: string
    namePlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    dateLabel: string
    timeLabel: string
    guestsLabel: string
    guestOptions: [string, string, string, string]
    messageLabel: string
    messageOptional: string
    messagePlaceholder: string
    submitButton: string
    whatsappIntro: string
    whatsappName: string
    whatsappPhone: string
    whatsappDate: string
    whatsappTime: string
    whatsappGuests: string
    whatsappMessage: string
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
  pages: PagesCopy
  seo: {
    site: {
      defaultTitle: string
      titleTemplate: string
      description: string
      ogDescription: string
      twitterTitle: string
      twitterDescription: string
      ogImageAlt: string
      keywords: string[]
    }
    pages: {
      home: SeoPageCopy
      carte: SeoPageCopy
      menuDuJour: SeoPageCopy
      contact: SeoPageCopy
      mentionsLegales: SeoPageCopy
      galerie: SeoPageCopy
      privatisation: SeoPageCopy
      autourDeNous: SeoPageCopy
      reservation: SeoPageCopy
      restaurantMontmartre: SeoPageCopy
      restaurantPigalle: SeoPageCopy
      restaurantPlaceDeClichy: SeoPageCopy
    }
  }
}
