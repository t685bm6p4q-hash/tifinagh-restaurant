# Opérations — tifinagh.fr

Routine après déploiement ISR / Blob privé (réf. commits `f29c329`, `f5618a1`).

## Menu du jour (Blob)

1. `/admin/menu-setup` → upload **FR** (+ **EN** si besoin).
2. Vérifier le bandeau **Sécurité Blob** (lecture privée, pas de copie publique legacy).
3. En local :
   ```bash
   vercel env pull .env.local --environment=production   # optionnel : sonde anonyme
   npm run verify:menu-prod
   ```
4. Contrôle visuel : [https://www.tifinagh.fr/menu-du-jour](https://www.tifinagh.fr/menu-du-jour)

`MENU_BLOB_ALLOW_PUBLIC_FALLBACK` doit rester à **`0`** en production (voir `VERCEL_SETUP.md` §6).

## Contenu & SEO

| Action | Où |
|--------|-----|
| Textes / pages éditoriales modifiés | `app/[locale]/(site)/…` + dictionnaires `lib/i18n/` |
| **`lastModified` sitemap** | `CONTENT_UPDATED_AT` dans `app/sitemap.ts` |
| Photos galerie (alt, mapping SEO) | `lib/gallery-data.ts`, `GALERIE_PHOTOS_SEO.csv`, `GUIDE_PHOTOS_SEO.md` |
| Nouvelles pages indexables | `lib/i18n/public-sitemap-routes.ts` |

Après grosse mise à jour contenu : **push** ou attendre **revalidate 1 h** sur le marketing (`app/[locale]/(site)/layout.tsx`).

## Analytics (Vercel)

- **`NEXT_PUBLIC_GA_MEASUREMENT_ID`** : GA4 actif si ID valide (`lib/analytics-config.ts`).
- **`VITE_GA_MEASUREMENT_ID`** : supprimée (inutilisée par Next.js).

## Mesure perf

Voir **`docs/PERF-LIGHTHOUSE.md`** (taille HTML, cache edge, Lighthouse).

```bash
npm run measure:html
npm run measure:html https://preview-url.vercel.app
```

## Déploiement

- Push sur `main` → Vercel production.
- Variables d’env : redeploy obligatoire (`vercel deploy --prod` ou redeploy dashboard).
