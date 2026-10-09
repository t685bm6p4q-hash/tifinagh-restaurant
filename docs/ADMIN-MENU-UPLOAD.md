# Admin — menu du jour (upload)

Runbook pour éviter les régressions vues en octobre 2026.

## URL

- **Prod :** https://www.tifinagh.fr/admin/menu-setup  
- Mot de passe : variable Vercel `MENU_ADMIN_PASSWORD` (Basic Auth navigateur + cookies HttpOnly).

## Parcours équipe (chaque jour)

1. Ouvrir `/admin/menu-setup` → entrer le mot de passe.
2. **Parcourir…** → photo JPEG/PNG ou PDF (jusqu’à **10 Mo** à la sélection, **~5 Mo OK**).
3. **Mettre en ligne sur le site** → attendre **Optimisation…** puis **Mise en ligne…** → **✅**.
4. Vérifier : lien « Voir le menu à jour » ou `/menu-du-jour`.

**iPhone :** pas de HEIC brut — Photos → Partager → **Enregistrer en JPEG**.

## Bugs corrigés (ne pas réintroduire)

| Symptôme | Cause | Garde-fou |
|----------|--------|-----------|
| Page admin sans mot de passe, « Accès admin requis » | Rewrite `/admin` → `/fr/admin` **avant** Basic Auth | `lib/admin-proxy-routing.ts` + `npm run check:admin-proxy` |
| Session expirée + formulaire absent | Pas de cookie / jeton côté RSC | Cookies `tifinagh_admin_session` + `tifinagh_admin_upload_gate`, en-tête interne upload |
| Fichier ~5 Mo, rien ne part | Limite Vercel ~4,5 Mo sur POST | Compression **toujours** côté navigateur (`prepareMenuFileForUpload`) |
| Ancienne UI « Choisir un fichier » | Cache navigateur / vieux déploiement | `dynamic = force-dynamic` admin + **Cmd+Shift+R** |

## Vérifications automatiques

```bash
npm run check:admin-proxy    # ordre auth dans proxy.ts (pre-commit)
npm run verify:admin-prod    # smoke prod (401 sans auth)
npm run verify:menu-prod     # API menu public + page /menu-du-jour
```

## Déploiement

Après push `main` :

```bash
npx vercel deploy --prod --yes
npm run verify:admin-prod
npm run verify:menu-prod
```

Si le build Vercel GitHub échoue mais le CLI réussit, l’alias `www.tifinagh.fr` peut rester sur une vieille version — **toujours vérifier** avec `verify:admin-prod` (401 attendu sans auth).

## Variables Vercel

- `MENU_ADMIN_PASSWORD` — obligatoire (sinon 503 admin).
- `BLOB_READ_WRITE_TOKEN` — stockage menu (sinon message Blob indisponible).
