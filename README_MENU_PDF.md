# 🍽️ Système de Gestion du Menu du Jour - Tifinagh

## ✅ Statut

- ✅ **PDF généré** : `public/menu-du-jour.pdf` (2.7 KB, 1 page)
- ✅ **Système de génération** : Script Node.js avec pdfkit
- ✅ **Upload automatique** : Interface web et API (`/api/upload-menu`)
- ✅ **Remplacement fichier** : Ancien PDF écrasé automatiquement

---

## 📁 Fichiers créés/modifiés

### 1. **`scripts/generate-menu-pdf.js`** (NOUVEAU)
Script Node.js qui génère le PDF du menu avec pdfkit.

**Contenu :**
- Titre et branding Tifinagh
- 3 entrées
- 4 plats principaux
- 3 desserts
- Design minimaliste avec couleurs Tifinagh

**Personnalisable :**
- Modifie le contenu directement dans le script
- Adapte les couleurs dans la section `colors`

**Utilisation :**
```bash
npm run menu:generate
```

---

### 2. **`public/menu-du-jour.pdf`** (NOUVEAU)
Le PDF du menu généré automatiquement.

**Localisation :** Accessible via `/menu-du-jour.pdf` sur le site
**Format :** PDF A4, 1 page
**Taille :** ~2.7 KB (léger et rapide)

---

### 3. **`app/admin/menu-setup/page.tsx`** (EXISTANT)
Interface web pour uploader un nouveau PDF.

**Accès :** `http://localhost:5173/admin/menu-setup`
**Fonctionnalités :**
- Upload drag & drop
- Validation (PDF, max 5MB)
- Messages de confirmation

---

### 4. **`app/api/upload-menu/route.ts`** (EXISTANT)
API pour traiter l'upload et remplacer le fichier.

**Endpoint :** `POST /api/upload-menu`
**Comportement :** Overwrite automatique de l'ancien PDF

---

### 5. **`components/menu-pdf-button.tsx`** (EXISTANT)
Composant bouton réutilisable pour accéder au menu.

**Fonctionnalité :** Ouvre le PDF en consultation (pas de téléchargement)
**Icône :** Eye (regarder) par défaut

---

### 6. **`package.json`** (MODIFIÉ)
Ajout du script npm :
```json
"menu:generate": "node scripts/generate-menu-pdf.js"
```

---

## 🚀 Flux de travail complet

### **Scénario 1 : Créer le PDF initial** ✅
```bash
npm run menu:generate
```
→ Génère `public/menu-du-jour.pdf`

### **Scénario 2 : Uploader un nouveau PDF**
1. Va à `http://localhost:5173/admin/menu-setup`
2. Choisir le fichier PDF
3. Cliquer "Mettre à jour le menu"
4. ✅ L'ancien PDF est écrasé automatiquement

### **Scénario 3 : Consulter le menu sur le site**
- **Bouton "Voir le menu du jour"** sur :
  - Page d'accueil (section menu)
  - Page `/menu-du-jour`
  - Page `/carte`

---

## 🎨 Personnalisation

### Modifier le contenu du menu

**Fichier à éditer :** `scripts/generate-menu-pdf.js`

**Exemple : Ajouter un plat**
```javascript
const plats = [
  { name: 'Couscous Royal', desc: 'Agneau, poulet, merguez...', price: '18€' },
  { name: 'Tajine Poulet Citron', desc: 'Poulet confit, olives...', price: '16€' },
  // ➕ Ajouter ici :
  { name: 'Grillades Spéciales', desc: 'Brochettes tendres', price: '17€' },
];
```

**Puis régénérer :**
```bash
npm run menu:generate
```

### Modifier les couleurs

**Section `colors` dans `generate-menu-pdf.js` :**
```javascript
const colors = {
  primary: '#1a1a1a',      // Noir
  accent: '#d4af37',       // Or
  accent2: '#8b7355',      // Marron
  // ... etc
};
```

Adapte les valeurs HEX et régénère.

---

## 📊 Format du PDF

- **Taille** : A4
- **Marges** : 40px
- **Pages** : 1
- **Sections** :
  - En-tête (Tifinagh Athhomic Design)
  - Entrées
  - Plats Principaux
  - Desserts
  - Footer (infos restaurant)

---

## 🔧 Dépannage

| Problème | Solution |
|----------|----------|
| **PDF n'existe pas (404)** | Exécute `npm run menu:generate` |
| **PDF ne change pas après upload** | Vide le cache du navigateur (Ctrl+Shift+R) |
| **Erreur lors de l'upload** | Vérifie que c'est un PDF et < 5MB |
| **Contenu du PDF obsolète** | Génère un nouveau avec `npm run menu:generate` |

---

## 📝 Notes

- **Ancien PDF remplacé automatiquement** : Grâce à `writeFile()` dans l'API
- **Pas de téléchargement** : Les boutons ouvrent le PDF en consultation
- **Léger et rapide** : ~2.7 KB par défaut
- **Responsive** : Consultable sur tous les appareils
- **Branding** : Couleurs Tifinagh intégrées

---

## ✨ Points clés

✅ PDF généré et fonctionnel  
✅ Interface d'upload web prête  
✅ Ancien fichier écrasé automatiquement  
✅ Boutons intégrés sur le site  
✅ Personnalisable (contenu + couleurs)  
✅ Documentation claire  

**Prêt à l'emploi !** 🎉

---

*Dernière mise à jour : 28 août 2026*
