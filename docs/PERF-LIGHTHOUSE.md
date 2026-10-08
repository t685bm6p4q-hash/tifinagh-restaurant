# Mesure perf — post-ISR `[locale]`

Contexte : migration `app/[locale]`, `revalidate = 3600`, marketing servi en **PRERENDER / HIT** edge.

## Snapshot prod (2026-10-08, curl)

| URL | Taille HTML (octets) | `x-vercel-cache` | `cdn-cache-control` |
|-----|----------------------|------------------|------------------------|
| `/` | ~139 177 | STALE / PRERENDER | `s-maxage=3600` |
| `/carte` | ~106 065 | HIT | `s-maxage=3600` |
| `/en/carte` | ~103 346 | HIT | `s-maxage=3600` |
| `/menu-du-jour` | dynamique | MISS | (pas de cache HTML) |

Référence audit initial (pré-ISR) : HTML `/` ~374 Ko, origine `no-store`.

Commande de re-mesure :

```bash
for u in "https://www.tifinagh.fr/" "https://www.tifinagh.fr/carte"; do
  curl -sS "$u" | wc -c
  curl -sSI "$u" | rg -i 'cache-control|x-vercel-cache|cdn-cache-control'
done
```

## Lighthouse / Core Web Vitals (mobile)

### Option A — PageSpeed (navigateur)

1. [PageSpeed Insights](https://pagespeed.web.dev/analysis?url=https://www.tifinagh.fr/) — URL `https://www.tifinagh.fr/` et `/carte`, stratégie **Mobile**.
2. Noter scores **Performance**, **LCP**, **CLS**, **INP**.

### Option B — CLI (machine locale avec Chrome)

```bash
npx lighthouse https://www.tifinagh.fr/ \
  --form-factor=mobile --screenEmulation.mobile=true \
  --only-categories=performance,accessibility,seo,best-practices \
  --output=html --output-path=docs/lighthouse-home-mobile.html
```

> L’API PageSpeed publique peut renvoyer **429** (quota journalier) ; privilégier le CLI ou le site web.

## Prochaines mesures (optionnel)

- Répéter après changement hero / fonts / consentement analytics.
- Comparer **preview** vs **production** avant gros release.
