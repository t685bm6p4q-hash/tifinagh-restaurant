# Rapport de livraison — Tifinagh (7–8 octobre 2026)

**Projet :** tifinagh-restaurant · Next.js 16 App Router  
**Site :** https://www.tifinagh.fr  
**Branche :** `main` (prod à jour)  
**Statut global :** terminé — logique i18n, menu, mobile et ops validés en production

Ce document regroupe **le travail du 7 octobre** (menu du jour, viewer, UI) et **le travail du 8 octobre** (i18n à l’échelle du site, sécurité, perf, SEO, puis corrections prod + rapport final).

---

## Synthèse exécutive

| Axe | Résultat |
|-----|----------|
| **Menu du jour** | Viewer refondu (SSR LCP, lightbox, FR/EN, partage, texte plats style bistro, plein écran fiable) |
| **Internationalisation** | 13 langues, URLs `/en/…`, routes `app/[locale]/`, ISR 1 h, locale = URL (plus de mélange FR/EN en prod) |
| **Sécurité & infra** | Menu Blob privé servi via `/api/menu-pdf`, admin durci, CSP, rate limit |
| **Perf & SEO** | HTML allégé, sitemap hreflang, JSON-LD, galerie SEO, mesures `measure:html` |
| **Mobile & a11y** | Header compact, burger fiable, focus lightbox/cookies, libellés localisés (PagesJaunes, PT) |

**Dernier commit de référence :** `7fdeb8c`

---

# Partie A — 7 octobre 2026 (menu du jour & UX)

## A.1 Texte des plats (carte bistro)

- Mise en page **carte bistro** pour le texte OCR / saisi admin des plats du jour.
- Parseur : catégories **Entrées / Plats / Desserts** (y compris variantes **anglaises**), prix **16,5 € / 18,5 €** conservés et affichés proprement.
- Application définitive du parseur OCR et nettoyage des catégories.

## A.2 Viewer menu (image / PDF)

- **Lightbox** minimaliste pour le menu en grand.
- **Pastille Plein écran** flottante (dégradés or) ; comportement **mobile vs desktop** (pastille masquée ou repositionnée selon viewport).
- **Bouton Partager le menu** (Web Share API + fallback).
- **Switch FR / EN** : pastille plein écran et libellés cohérents avec la langue du menu affiché ; label actif doré lisible.
- Refonte progressive de `menu-pdf-viewer` (fusion blocs formules midi/soir, icônes, prix sans parenthèses superflues).
- Switch visuel **FR marron / EN or** ; largeur image réduite (~33 %) sur bascule EN.

## A.3 Style & accueil (7 oct.)

- Bouton **Partager** : fond doré (lisibilité a11y).
- Ajustements **header mobile** (logo, MENU compact) — poursuivis le 8 oct.

---

# Partie B — 8 octobre 2026 (matinée / journée — plateforme)

## B.1 Design & header (début de journée)

- Liserés dorés sur CTA (home, nav) puis simplification header (**sans liseré** sur MENU / Réserver / hamburger).
- Hero : animation légère sur **Réserver**, contour doré **La carte**.
- Logo header agrandi (desktop / mobile).

## B.2 Internationalisation (fondations)

- **URLs localisées** et liens internes sur tout le site (`localeHref`).
- **Redirect cookie** non-FR vers URL préfixée (`/en/…`).
- **Sitemap multilingue** + **hreflang** sur 13 langues (+ `x-default`).
- Migration marketing sous **`app/[locale]/`** pour **ISR 1 h** (`revalidate = 3600`).
- Locale via **proxy** (rewrite), retrait **Vary: Cookie** sur le HTML marketing.
- **Not-found** allégé ; breadcrumb / microdonnées ; `initPageI18n`, chip WhatsApp localisé.

## B.3 Menu Blob & admin

- Blobs menu **privés**, servis via **`/api/menu-pdf`** (cache base64, zero egress public direct).
- Upload admin sur store Vercel **public-only** côté config ; sonde **verify:menu-prod** et doc **`MENU_BLOB_ALLOW_PUBLIC_FALLBACK=0`**.
- Lectures Blob **dédupliquées** par requête RSC ; cache menu optimisé.

## B.4 Sécurité

- Next **16.3.8**, sharp à jour.
- Session admin **signée**, rate limit, fail-closed sans mot de passe.
- Rate limit **`/api/menu-pdf`** ; CSP ; JSON-LD échappé ; paramètre `?w=` borné.

## B.5 Performance & SEO

- Allègement HTML / payload RSC ; **not-found** plus léger.
- SEO : titres/descriptions dédiés, OG 1200×630, hreflang cohérents, **allemand** corrigé, JSON-LD 24 h.
- **Galerie** SEO ; **`docs/OPERATIONS.md`**, **`npm run measure:html`**.
- ESLint Next en **pre-commit** + GitHub Actions.

## B.6 Accessibilité (8 oct., avant session prod)

- Focus lightbox menu et bandeau cookies ; menu mobile clavier ; sélecteur de langue ; bandeau traduit ; focus visible formulaires.
- Nav **`aria-expanded`** sur le burger.

---

# Partie C — 8 octobre 2026 (session prod — corrections finales)

## C.1 Symptômes corrigés

| Symptôme | Exemple | Cause |
|----------|---------|--------|
| Mélange de langues | `/en/` meta EN + corps FR | Slot `request-locale` / `getI18n()` peu fiable en SSG/ISR |
| Burger mobile | Tiroir ne s’ouvrait pas | Toggle JS + checkbox |
| Plein écran menu FR | Badge invisible après bascule FR | Z-index / pile SSR vs client |
| Libellés mixtes | PagesJaunes en FR sur `/en/` ; PT Google en ES | Texte en dur / copier-coller dictionnaire |

## C.2 Architecture i18n (état final)

| Couche | Mécanisme |
|--------|-----------|
| URL | `app/[locale]/…` + rewrite proxy |
| Contenu pages | `initPageI18n(params)` → props templates |
| Shell UI | `SiteLocaleProvider` + `useSiteLocale()` / `useSiteDictionary()` |
| Metadata | `bindPageLocale` + `buildSiteMetadata(locale)` / `buildPageMetadata(id, locale, …)` |
| Dictionnaire | **`getDictionary(locale)`** uniquement |

**Supprimé :** `request-locale.ts`, `getI18n()`, `resolveLocale()`, `locale-context.tsx`.

**Ajouté / central :** `site-locale.tsx`, `page-i18n.ts`, `bind-page-locale` simplifié.

## C.3 Commits session prod (8 oct., fin de journée)

| Commit | Sujet |
|--------|--------|
| `e2fac60` | Locale SSG, burger, liens réservation |
| `69662e9` | `SiteLocaleProvider`, shell, `HomeTemplate`, menu PDF `locale` en prop |
| `8671a6b` | Burger : `<label for="nav-toggle">` |
| `9cc5a41` | Plein écran : badges dans `menu-pdf-viewer-media-stack` |
| `7fdeb8c` | `pagesJaunesReviewsAria` (13 langues), metadata explicite, fin du slot |

Commits proches même journée (contexte) : `f29c329` [locale] ISR, `f5618a1` not-found/proxy/verify Blob, `3235922` galerie SEO + ops, `efe1c4d` doc Vercel fallback.

## C.4 Menu du jour (comportement final)

- **SSR :** `MenuMediaPreviewServer` + preload LCP.
- **Client :** bascule FR/EN ; couche `--client-media` si variante ≠ snapshot initial.
- **Plein écran :** `MenuFloatingFullscreenBadges` au niveau **pile média** (z-index 25).
- Composants async : `locale` passée en **prop** (pas de hooks dans RSC async).

## C.5 Checklist prod (validée)

- [x] `/en/` — contenu entièrement anglais  
- [x] `/de/carte` — allemand cohérent  
- [x] Mobile — burger OK  
- [x] Menu FR — Plein écran visible et utilisable  
- [x] PagesJaunes / Google Reviews — aria selon locale  

*(Cache ISR ~1 h : tester en navigation privée si doute.)*

---

# Partie D — Exploitation

| Besoin | Référence |
|--------|-----------|
| Upload menu, sonde Blob, `verify:menu-prod` | `docs/OPERATIONS.md`, `VERCEL_SETUP.md` |
| Perf HTML / Lighthouse | `docs/PERF-LIGHTHOUSE.md`, `npm run measure:html` |
| Qualité code | `npm run precommit` (lint, typecheck, tests) |
| Déploiement | Push `main` → Vercel |

Variables notables : **`MENU_BLOB_ALLOW_PUBLIC_FALLBACK=0`**, **`NEXT_PUBLIC_GA_MEASUREMENT_ID`**, **`MENU_ADMIN_PASSWORD`**.

---

# Partie E — Modèle pour la suite

```text
URL /{locale}/…
  → bindPageLocale / initPageI18n / SiteLocaleProvider
  → getDictionary(locale) | useSiteDictionary()
  → build*Metadata(..., locale)
```

**Hors scope actuel :** refonte design globale, nouvelles langues, changements métier admin (déjà opérationnels).

---

# Chronologie commits (extrait git 7–8 oct.)

<details>
<summary>7 octobre — menu & viewer (cliquer pour déplier)</summary>

- Carte bistro texte plats, parseur EN, prix 16,50 / 18,50 €  
- Lightbox, pastilles plein écran, partager menu  
- Toggle FR/EN, styles or/marron, refonte viewer  

</details>

<details>
<summary>8 octobre — plateforme (cliquer pour déplier)</summary>

- i18n URLs, sitemap, `[locale]`, proxy, perf, sécurité Blob/admin  
- SEO, a11y, CI, galerie, header/CTA, not-found, verify prod  

</details>

<details>
<summary>8 octobre — session prod (cliquer pour déplier)</summary>

- `e2fac60` → `7fdeb8c` (locale fiable, mobile, plein écran FR, metadata sans slot)  

</details>

---

**Rapport consolidé le :** 8 octobre 2026  
**Auteur :** session Cursor / équipe Tifinagh  
**Fichier :** `docs/RAPPORT-I18N-UX-2026-10-08.md`
