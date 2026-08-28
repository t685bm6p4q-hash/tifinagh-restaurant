# 📋 Guide : Mise à jour du Menu du Jour

## ✨ Le PDF est créé et prêt ! 

Le fichier `public/menu-du-jour.pdf` est maintenant généré automatiquement. Il contient un menu exemple avec la mise en forme de Tifinagh.

---

## 🔄 Comment mettre à jour le menu ?

### Option 1 : Via l'interface Web Admin (RECOMMANDÉ)
1. Va à : `http://localhost:5173/admin/menu-setup`
2. Clique sur **"Choisir un fichier"**
3. Sélectionne ton PDF à jour
4. Clique sur **"Mettre à jour le menu"**

✅ L'ancien menu est automatiquement remplacé.
✅ Aucun dossier à manipuler.
✅ Simple et rapide.

---

### Option 2 : Via le terminal (développeur)
```bash
npm run menu:generate
```

Cela régénère `public/menu-du-jour.pdf` avec le script Node.

---

### Option 3 : Éditer le script de génération

Si tu veux modifier les **entrées, plats, desserts, prix**, modifie ce fichier :

```
scripts/generate-menu-pdf.js
```

**Exemple : Ajouter un nouveau plat**

Trouve cette section :

```javascript
const plats = [
  { name: 'Couscous Royal', desc: '...', price: '18€' },
  { name: 'Tajine Poulet Citron', desc: '...', price: '16€' },
  // ... ajoute une nouvelle ligne ici
];
```

Ajoute :

```javascript
{ name: 'Ma Nouvelle Spécialité', desc: 'Description courte', price: '15€' },
```

Puis régénère le PDF :

```bash
npm run menu:generate
```

---

## 🎨 Personnalisation des couleurs

Édite les couleurs en haut du fichier `scripts/generate-menu-pdf.js` :

```javascript
const colors = {
  primary: '#1a1a1a',      // Noir principal
  accent: '#d4af37',       // Or (titre, prix)
  accent2: '#8b7355',      // Marron (descriptions)
  text: '#2d2d2d',         // Gris foncé (contenu)
  light: '#f5f5f5',        // Gris clair
  white: '#ffffff',        // Blanc
};
```

Modifie les valeurs HEX selon tes envies, puis relance :

```bash
npm run menu:generate
```

---

## 📄 Où se trouve le PDF ?

**Chemin local :**
```
public/menu-du-jour.pdf
```

**Accessible via le site :**
```
/menu-du-jour.pdf
```

---

## ❌ Dépannage

### Le PDF n'affiche pas ?
- Vérifier que `public/menu-du-jour.pdf` existe :
  ```bash
  ls -la public/menu-du-jour.pdf
  ```
- Relancer le serveur : `npm run dev`
- Vider le cache du navigateur (Ctrl+Shift+R / Cmd+Shift+R)

### Le PDF n'est pas à jour ?
- Régénère avec `npm run menu:generate`
- Ou réupload via `/admin/menu-setup`

---

## 🚀 Résumé rapide

| Besoin | Commande |
|--------|----------|
| **Mettre à jour le menu via web** | Allez à `/admin/menu-setup` |
| **Régénérer depuis le script** | `npm run menu:generate` |
| **Modifier le contenu du menu** | Éditez `scripts/generate-menu-pdf.js` |
| **Voir le PDF sur le site** | `/menu-du-jour` ou cliquez sur les boutons |

---

**C'est tout ! 🎉 Ton système de menu est prêt.**
