# Configuration Vercel — Tifinagh Montmartre

Guide pas à pas pour mettre le site en production sur Vercel.

---

## 1. Déployer le projet

1. Allez sur [vercel.com](https://vercel.com) et connectez votre compte GitHub/GitLab.
2. **Add New → Project** → importez le dépôt `tifinagh SITE 2`.
3. Vercel détecte Next.js automatiquement — laissez les réglages par défaut.
4. Cliquez **Deploy** (le premier déploiement peut se faire sans variables ; l’admin sera en 503).

URL provisoire : `https://tifinagh-restaurant-seven.vercel.app` (ou similaire).

---

## 2. Variables d'environnement (obligatoires)

**Project → Settings → Environment Variables**

| Variable | Environnement | Description |
|----------|---------------|-------------|
| `MENU_ADMIN_PASSWORD` | Production (+ Preview si besoin) | Mot de passe fort pour `/admin` et l’API upload |
| `BLOB_READ_WRITE_TOKEN` | Production | Token Vercel Blob pour persister le PDF menu du jour |
| `NEXT_PUBLIC_SITE_URL` | Production | URL canonique du site (voir §3) |

### `MENU_ADMIN_PASSWORD`

- Choisissez un mot de passe long (20+ caractères, lettres + chiffres + symboles).
- Sans cette variable : `/admin` renvoie **503** (sécurité volontaire).
- À la connexion : navigateur demande identifiant/mot de passe Basic Auth — mettez n’importe quel identifiant, le **mot de passe** doit correspondre.

### `BLOB_READ_WRITE_TOKEN`

1. Dans le projet Vercel : **Storage → Create Database → Blob**.
2. Liez le store au projet — Vercel crée automatiquement `BLOB_READ_WRITE_TOKEN`.
3. Sans Blob : le menu du jour sert le PDF statique `public/menu-du-jour.pdf` (OK au premier deploy, mais l’upload admin ne persiste pas entre redéploiements).

### `NEXT_PUBLIC_SITE_URL`

- **Sans domaine custom** : `https://votre-projet.vercel.app`
- **Avec domaine custom** : `https://www.tifinagh.fr` (exemple)

Utilisé pour : canonical, sitemap, Open Graph, JSON-LD Schema.org.

---

## 3. Domaine personnalisé (optionnel)

1. **Project → Settings → Domains**
2. Ajoutez votre domaine (ex. `tifinagh.fr` et `www.tifinagh.fr`).
3. Suivez les instructions DNS chez votre registrar (enregistrements A/CNAME fournis par Vercel).
4. Une fois actif, mettez à jour `NEXT_PUBLIC_SITE_URL` avec l’URL définitive.
5. **Redeploy** le projet pour propager la nouvelle URL dans le sitemap et les meta.

---

## 4. Vérifications post-déploiement

### Admin menu PDF

```
https://VOTRE-DOMAINE/admin/menu-setup
```

- Le navigateur demande un mot de passe → entrez `MENU_ADMIN_PASSWORD`.
- Uploadez un PDF de test.
- Vérifiez : `https://VOTRE-DOMAINE/api/menu-pdf` ouvre le PDF.

### Pages publiques

- [ ] Accueil charge en &lt; 2 s (PageSpeed mobile ~100)
- [ ] Bouton « Menu du jour » ouvre le PDF
- [ ] `/reservation` — téléphone, Google Reserve, WhatsApp
- [ ] Carte Google Maps sur `/contact`
- [ ] `/restaurant-montmartre`, `/restaurant-pigalle`, `/restaurant-place-de-clichy`

### SEO

- [ ] `https://VOTRE-DOMAINE/sitemap.xml` — toutes les pages listées
- [ ] `https://VOTRE-DOMAINE/robots.txt` — `/admin` en disallow
- [ ] [Google Search Console](https://search.google.com/search-console) — ajouter la propriété, soumettre le sitemap

---

## 5. Mise à jour quotidienne du menu

**Option A — Interface admin (recommandée avec Blob)**

1. Allez sur `/admin/menu-setup`
2. Uploadez le nouveau PDF
3. Le lien `/api/menu-pdf` pointe vers la dernière version

**Option B — Script local + git**

```bash
npm run menu:generate   # génère public/menu-du-jour.pdf
git add public/menu-du-jour.pdf
git commit -m "Menu du jour — [date]"
git push
```

Vercel redéploie automatiquement.

---

## 6. Redéploiement après changement de variables

Les variables d’env ne sont lues qu’au build/runtime selon le cas :

1. **Settings → Environment Variables** → modifiez ou ajoutez
2. **Deployments → … → Redeploy** (ou push un commit)

---

## 7. Dépannage

| Symptôme | Cause probable | Solution |
|----------|----------------|----------|
| `/admin` → 503 | `MENU_ADMIN_PASSWORD` absent | Ajouter la variable + redeploy |
| Upload PDF échoue | Token Blob manquant ou mauvais mot de passe | Vérifier Blob + auth admin |
| Sitemap avec mauvaise URL | `NEXT_PUBLIC_SITE_URL` incorrect | Corriger + redeploy |
| Menu PDF 404 | Ni Blob ni `public/menu-du-jour.pdf` | `npm run menu:generate` ou upload admin |
| Page 404 générique | Ancien cache | Vider cache CDN / hard refresh |

---

## Récapitulatif minimal (production)

```env
MENU_ADMIN_PASSWORD=votre-mot-de-passe-fort
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...   # auto si Blob store créé
NEXT_PUBLIC_SITE_URL=https://www.votre-domaine.fr
```

Une fois ces trois points en place, le site est **100 % opérationnel** en production.
