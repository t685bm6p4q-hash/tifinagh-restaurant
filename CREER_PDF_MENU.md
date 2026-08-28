# 📄 Comment créer ton PDF Menu du Jour

## 🎯 Problème actuel
L'erreur 404 signifie que le fichier `public/menu-du-jour.pdf` **n'existe pas encore**.

## ✅ Solution : Créer et uploader ton PDF

### Étape 1 : Créer le PDF
Tu peux créer ton menu du jour avec l'une de ces outils **gratuits** :

#### Option A : Canva (RECOMMANDÉ - Facile)
1. Allez sur https://canva.com (gratuit)
2. Créez un design **A4 Portrait**
3. Ajoutez :
   - Logo Tifinagh (dans `public/images/logo-tifinagh-rond.png`)
   - Titre "LE TIFINAGH - MENU DU JOUR"
   - Date du jour
   - Sections : Entrées / Plats / Desserts
   - Prix des plats
   - Infos de contact
4. **Téléchargez en PDF**

#### Option B : Google Docs
1. Créez un document sur https://docs.google.com
2. Formatez votre menu
3. Fichier → Télécharger → PDF

#### Option C : Microsoft Word
1. Créez un document Word
2. Fichier → Exporter sous → PDF

### Étape 2 : Uploader le PDF

**OPTION 1 : Interface Admin Web (Recommandée)**
```
1. Va sur http://localhost:3000/admin/menu-setup
2. Clique sur "📤 Sélectionner un PDF"
3. Choisis ton fichier (max 5 MB)
4. Confirmez
5. ✅ C'est fait ! Le menu apparaît instantanément
```

**OPTION 2 : Remplacement direct (Plus rapide)**
```bash
# Copie ton fichier PDF nommé "menu-du-jour.pdf"
# puis place-le dans le dossier : public/menu-du-jour.pdf

# Depuis ton ordinateur :
cp /chemin/vers/menu-du-jour.pdf ./public/menu-du-jour.pdf
```

**OPTION 3 : Drag & drop (Si tu es sur un serveur avec accès FTP)**
```
1. Ouvrez Filezilla ou tout client FTP
2. Connectez-vous à ton serveur
3. Naviguez dans dossier : public/
4. Glissez-déposez menu-du-jour.pdf
5. ✅ Le fichier remplace l'ancien
```

### Étape 3 : Vérifier

Rafraîchis ton navigateur :
- http://localhost:3000/menu-du-jour
- http://localhost:3000/carte
- http://localhost:3000/

Les boutons "👁️ Consulter le menu du jour" devraient maintenant afficher ton PDF ! 🎉

---

## 📋 Template fourni

Un template texte est disponible à : `public/menu-du-jour-template.txt`
Utilise-le comme base si tu veux.

---

## 🚀 Pour la production

Une fois ton PDF crée localement et testé :

### Sur Vercel (ou tout serveur Node.js)
1. Créez votre PDF avec Canva/Word/Google Docs
2. Nommez-le : `menu-du-jour.pdf`
3. Placez-le dans le dossier : `public/`
4. Committez et poussez sur GitHub
5. Vercel deploy automatiquement
6. C'est live ! ✅

---

## ⏰ Gérer les mises à jour quotidiennes

**Solution simple :**
Chaque matin, créez un nouveau PDF du menu du jour et remplacez simplement le fichier `public/menu-du-jour.pdf`.

**Solution avancée :**
Utilisez l'interface `/admin/menu-setup` pour uploader directement depuis le navigateur (zéro terminal nécessaire).

---

## 📝 Format recommandé

Pour que ton PDF soit élégant et cohérent :
- Dimension : **A4 Portrait**
- Police : **Serif (Georgia, Garamond)** pour titres, sans-serif pour le corps
- Couleurs : Inspire-toi de la charte Tifinagh (rouges, golds, beiges)
- Contenu minimum :
  - Logo
  - Titre "Menu du Jour"
  - Date
  - Sections (Entrées, Plats, Desserts)
  - Prix
  - Mention allergènes
  - Infos contact

---

## 🆘 En cas de problème

❌ **Erreur 404 qui persiste ?**
→ Vérifiez que le fichier s'appelle exactement `menu-du-jour.pdf`
→ Vérifiez qu'il est dans le dossier `public/` (pas un sous-dossier)

❌ **Le PDF n'affiche rien ?**
→ Essayez avec un autre navigateur (Chrome, Firefox, Safari)
→ Videz le cache (Ctrl+Shift+Suppr ou Cmd+Shift+Suppr)

❌ **Le bouton ne fonctionne pas ?**
→ Rafraîchissez la page (F5)
→ Vérifiez que le fichier PDF s'ouvre en standalone

---

**Besoin d'aide ?** C'est vraiment simple une fois que tu as le PDF ! 🎉
