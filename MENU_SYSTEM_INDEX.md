# 📚 Index du Système de Menu du Jour

## Navigation par profil utilisateur

### 👤 **Utilisateur final** (directeur restaurant, manager)
*Qui fait ?* Mettre à jour le menu, vérifier que ça fonctionne

**Ordre de lecture recommandé :**
1. **START_HERE.txt** ← Commence ici (2 min)
2. **QUICK_START_MENU.txt** ← Comment faire (5 min)
3. **GUIDE_MENU_PDF_SIMPLE.md** ← Étapes détaillées (10 min)

**Fichiers à utiliser :**
- `/admin/menu-setup` pour uploader un PDF
- `scripts/generate-menu-pdf.js` si tu veux personnaliser le contenu

---

### 💻 **Développeur** (intégration, modifications)
*Qui fait ?* Intégrer le système, personnaliser, ajouter des fonctionnalités

**Ordre de lecture recommandé :**
1. **ARCHITECTURE_MENU_SYSTEM.md** ← Comprendre l'archi (20 min)
2. **README_MENU_PDF.md** ← Vue complète (10 min)
3. **DEPLOYMENT_CHECKLIST.md** ← Avant la production (10 min)

**Fichiers à modifier :**
- `scripts/generate-menu-pdf.js` (contenu, couleurs)
- `scripts/generate-menu-pdf-template.js` (cas avancés)
- `app/api/upload-menu/route.ts` (personnalisation upload)
- `app/admin/menu-setup/page.tsx` (UI)

---

### 🚀 **DevOps / Tech Lead** (déploiement, sécurité, monitoring)
*Qui fait ?* Déployer en production, ajouter auth, monitorer

**Ordre de lecture recommandé :**
1. **DEPLOYMENT_CHECKLIST.md** ← Checklist pré-prod (15 min)
2. **ARCHITECTURE_MENU_SYSTEM.md** (section security) ← Sécurité (10 min)
3. **README_MENU_PDF.md** ← Dépannage (10 min)

**Actions requises :**
- Ajouter une authentification sur `/admin/menu-setup`
- Configurer les backups du PDF
- Mettre en place le monitoring des uploads

---

### 🆘 **Support technique** (aide utilisateurs, dépannage)
*Qui fait ?* Aider les utilisateurs, résoudre les problèmes

**Ordre de lecture recommandé :**
1. **QUICK_START_MENU.txt** (section dépannage) ← Rapide (3 min)
2. **GUIDE_MENU_PDF_SIMPLE.md** (section dépannage) ← Plus détaillé (5 min)
3. **README_MENU_PDF.md** (section dépannage) ← Complet (10 min)

**Points clés à connaître :**
- Comment générer le PDF : `npm run menu:generate`
- Comment uploader : `/admin/menu-setup`
- Comment vider le cache : Cmd+Shift+R ou Ctrl+Shift+R

---

## 📋 Index par document

### START_HERE.txt
**Taille :** 2 pages  
**Niveau :** Débutant  
**Contenu :** Bienvenue, démarrage 30s, 3 façons de faire  
**Quand lire :** En premier, toujours  

---

### QUICK_START_MENU.txt
**Taille :** 8 pages  
**Niveau :** Débutant / Intermédiaire  
**Contenu :** 3 façons, flux type, vérification, dépannage rapide  
**Quand lire :** Après START_HERE, avant tout  

---

### GUIDE_MENU_PDF_SIMPLE.md
**Taille :** 4 pages  
**Niveau :** Débutant  
**Contenu :** Guide étape-par-étape, personnalisation simple  
**Quand lire :** Pour les utilisateurs finaux  

---

### README_MENU_PDF.md
**Taille :** 10 pages  
**Niveau :** Intermédiaire  
**Contenu :** Vue complète, tous les fichiers, flux détaillé, dépannage  
**Quand lire :** Approche complète, quand tu veux tout savoir  

---

### ARCHITECTURE_MENU_SYSTEM.md
**Taille :** 15 pages  
**Niveau :** Avancé (développeur)  
**Contenu :** Diagrammes, flux détaillé, composants, sécurité, déploiement  
**Quand lire :** Pour les développeurs et architectes  

---

### DEPLOYMENT_CHECKLIST.md
**Taille :** 10 pages  
**Niveau :** Avancé (DevOps)  
**Contenu :** Statut, tests, sécurité, déploiement, dépannage  
**Quand lire :** Avant de passer en production  

---

### SUMMARY_MENU_SYSTEM.txt
**Taille :** 8 pages  
**Niveau :** Tous niveaux  
**Contenu :** Résumé global, ce qui a été créé, vérification finale  
**Quand lire :** Vue d'ensemble du projet  

---

### FILES_CREATED_MENU_SYSTEM.txt
**Taille :** 10 pages  
**Niveau :** Tous niveaux  
**Contenu :** Inventaire complet, structure, dépendances  
**Quand lire :** Audit, vérification, documentation  

---

### GUIDE_PHOTOS_SEO.md
**Taille :** 5 pages  
**Niveau :** Intermédiaire  
**Contenu :** Gestion des images, SEO, renommage  
**Quand lire :** Si tu gères aussi les images du site  

---

## 🎯 Quick Links

### Fichiers à utiliser au quotidien
| Action | Où aller | Comment |
|--------|----------|---------|
| Mettre à jour le menu | `/admin/menu-setup` | Upload un PDF |
| Regénérer le PDF | Terminal | `npm run menu:generate` |
| Modifier le contenu | `scripts/generate-menu-pdf.js` | Éditer et relancer |
| Voir le menu sur le site | Page d'accueil, carte | Cliquer sur "Voir le menu du jour" |

### Commandes utiles
```bash
npm run dev              # Lancer le serveur de dev
npm run menu:generate   # Régénérer le PDF
npm run build           # Build de production
npm run start           # Lancer en production
```

### URLs importantes
```
http://localhost:5173/                      # Page d'accueil
http://localhost:5173/admin/menu-setup      # Upload interface
http://localhost:5173/menu-du-jour          # Page du menu du jour
http://localhost:5173/carte                 # La carte (menu complet)
/menu-du-jour.pdf                           # Le PDF lui-même
```

### Fichiers importants
```
public/menu-du-jour.pdf              # Le PDF généré
scripts/generate-menu-pdf.js         # Script de génération
app/api/upload-menu/route.ts        # API d'upload
app/admin/menu-setup/page.tsx       # Interface web
components/menu-pdf-button.tsx      # Composant bouton
package.json                         # Script npm
```

---

## 🎓 Chemins d'apprentissage suggérés

### Chemin 1 : "Je veux juste l'utiliser" (5 min)
```
START_HERE.txt
  ↓
npm run dev
  ↓
Va à /admin/menu-setup
  ↓
Upload un PDF
  ↓
Done !
```

### Chemin 2 : "Je veux comprendre" (30 min)
```
START_HERE.txt
  ↓
QUICK_START_MENU.txt
  ↓
README_MENU_PDF.md
  ↓
GUIDE_MENU_PDF_SIMPLE.md
  ↓
Essayer en local
```

### Chemin 3 : "Je veux développer" (1h)
```
START_HERE.txt
  ↓
ARCHITECTURE_MENU_SYSTEM.md
  ↓
Lire le code (scripts/*, app/api/*, components/*)
  ↓
Modifier et tester
  ↓
DEPLOYMENT_CHECKLIST.md
  ↓
Déployer
```

### Chemin 4 : "Je dois mettre ça en production" (2h)
```
DEPLOYMENT_CHECKLIST.md
  ↓
ARCHITECTURE_MENU_SYSTEM.md (sécurité)
  ↓
Tester localement (npm run dev)
  ↓
Ajouter authentification sur /admin
  ↓
npm run build
  ↓
Déployer sur Vercel/Netlify
  ↓
Monitorer
```

---

## 🔍 Trouver une information spécifique

### "Où est le PDF ?"
→ `public/menu-du-jour.pdf`  
→ Accessible via `/menu-du-jour.pdf` sur le site

### "Comment ajouter un plat ?"
→ Édite `scripts/generate-menu-pdf.js`  
→ Modifie le tableau `const plats = [ ... ]`  
→ Exécute `npm run menu:generate`

### "Comment personnaliser les couleurs ?"
→ Édite `scripts/generate-menu-pdf.js`  
→ Modifie `const colors = { ... }`  
→ Exécute `npm run menu:generate`

### "Comment ajouter une authentification ?"
→ Lis DEPLOYMENT_CHECKLIST.md (section sécurité)

### "Comment déployer ?"
→ Lis DEPLOYMENT_CHECKLIST.md (section déploiement)

### "Ça ne marche pas, que faire ?"
→ QUICK_START_MENU.txt (section dépannage rapide)  
→ README_MENU_PDF.md (section dépannage)  
→ DEPLOYMENT_CHECKLIST.md (section dépannage)

---

## 📞 Support

### Pour les questions générales
→ START_HERE.txt et QUICK_START_MENU.txt

### Pour les utilisateurs finaux
→ GUIDE_MENU_PDF_SIMPLE.md

### Pour les développeurs
→ ARCHITECTURE_MENU_SYSTEM.md et README_MENU_PDF.md

### Pour les DevOps/Tech leads
→ DEPLOYMENT_CHECKLIST.md

### Pour l'audit/vérification
→ FILES_CREATED_MENU_SYSTEM.txt et SUMMARY_MENU_SYSTEM.txt

---

## ✅ Checklist de compréhension

Vérifie que tu as compris :

- [ ] Les 3 façons de mettre à jour le menu
- [ ] Où se trouve le PDF (`public/menu-du-jour.pdf`)
- [ ] Comment le lancer en local (`npm run dev`)
- [ ] Comment uploader un PDF (`/admin/menu-setup`)
- [ ] Comment personnaliser le contenu (`scripts/generate-menu-pdf.js`)
- [ ] Que l'ancien PDF s'écrase automatiquement
- [ ] Qu'il y a une API pour l'upload (`/api/upload-menu`)
- [ ] Que le PDF n'est pas téléchargeable (consultation uniquement)

Si tu coches tout ✓, tu maîtrises le système !

---

## 🎉 Prêt ?

Commence par **START_HERE.txt**, puis le reste viendra naturellement.

Bon courage ! 🚀

---

*Index créé le 28 août 2026*
