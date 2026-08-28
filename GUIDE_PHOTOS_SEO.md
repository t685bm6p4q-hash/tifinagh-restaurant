# 📸 Guide Complet — Gestion des Photos avec Noms SEO

## 🎯 Vue d'ensemble

Tu as 7 photos magnifiques pour la galerie. Voici comment les exploiter au mieux pour le SEO et l'expérience utilisateur.

---

## 📋 Mapping Complet des Photos

### 1️⃣ Terrasse Parasol Clients (Jour)
```
Original : 489A2500_evy0js.jpg
Nom SEO : tifinagh-terrasse-montmartre-parasol-rouge-clients.jpg
Alt text : "Terrasse Tifinagh Montmartre avec parasols rouges la nuit"
Catégorie : TERRASSE
Utilisation : Galerie / Accueil
```

---

### 2️⃣ Façade Restaurant Nuit
```
Original : 489A2498_znt3ml.jpg
Nom SEO : tifinagh-facade-restaurant-nuit-montmartre.jpg
Alt text : "Façade restaurant Tifinagh montmartre avec parasols et lumière chaude"
Catégorie : FACADE
Utilisation : Galerie / Hero section alternative
```

---

### 3️⃣ Terrasse Convivialité Clients
```
Original : 489A2480_iggqgr.jpg
Nom SEO : tifinagh-terrasse-convivialite-clients-soiree.jpg
Alt text : "Ambiance conviviale terrasse Tifinagh Montmartre le soir"
Catégorie : TERRASSE
Utilisation : Galerie / Réseaux sociaux
```

---

### 4️⃣ Plat Betteraves & Poire
```
Original : 489A2463_jt7lqc.jpg
Nom SEO : tifinagh-plat-betteraves-poire-gastronomie.jpg
Alt text : "Plat signature Tifinagh betteraves poire et fromage blanc"
Catégorie : PLAT
Utilisation : Galerie / Page Menu du Jour
Description : Entrée raffinée avec betteraves râpées, poire caramélisée et fromage blanc
```

---

### 5️⃣ Terrasse Parasol Ambiance Soirée
```
Original : 489A2475_u2q4on.jpg
Nom SEO : tifinagh-terrasse-parasol-ambiance-soiree.jpg
Alt text : "Terrasse Tifinagh avec clients parasol rouge Montmartre"
Catégorie : TERRASSE
Utilisation : Galerie / Accueil
```

---

### 6️⃣ Plat Signature Sauce Safran
```
Original : 489A2472_bwfelb.jpg
Nom SEO : tifinagh-plat-signature-sauce-safran-gastronomique.jpg
Alt text : "Plat gastronomique Tifinagh avec sauce safran et piment rouge"
Catégorie : PLAT
Utilisation : Galerie / Menu du Jour / Instagram
Description : Plat signature avec sauce safran, crème anglaise et décoration fine
```

---

### 7️⃣ Plat Poisson & Asperges
```
Original : 489A2484_yckcxa.jpg
Nom SEO : tifinagh-plat-poisson-asperges-cuisine-raffinnee.jpg
Alt text : "Plat poisson asperges décoration fine restaurant Tifinagh"
Catégorie : PLAT
Utilisation : Galerie / Page Carte
Description : Poisson blanc grillé avec asperges fraîches et garniture fine
```

---

## 🎨 Où utiliser ces photos ?

### Page Galerie (`/galerie`)
Affichage actuel : Cloudinary direct
**À faire :** Mettre à jour avec les noms SEO optimisés

### Page Accueil
- Utiliser les meilleures photos de terrasse pour l'ambiance
- Ajouter 1-2 photos de plats dans le hero ou aperçu menu

### Page Menu du Jour (`/menu-du-jour`)
- Ajouter photos des plats gastronomiques
- Créer une galerie avant/après réservation

### Page Carte (`/carte`)
- Accompagner chaque catégorie de plats avec des photos
- Photos haute résolution pour inspire les clients

### Réseaux Sociaux
- Instagram : photos plats + terrasse
- Facebook : vidéos terrasse + galerie

---

## 📥 Comment implémenter ?

### Option 1 : Garder Cloudinary (Recommandé - Plus rapide)
Utiliser les URLs Cloudinary directement dans le code avec les noms SEO comme "data-filename" ou dans les métadonnées.

```html
<!-- Exemple dans la galerie -->
<img 
  src="https://res.cloudinary.com/dc9xmxpvv/image/upload/v1787946633/489A2500_evy0js.jpg"
  alt="Terrasse Tifinagh Montmartre avec parasols rouges la nuit"
  data-seo-name="tifinagh-terrasse-montmartre-parasol-rouge-clients.jpg"
/>
```

### Option 2 : Télécharger en local dans `public/images/`
```bash
# Télécharger et renommer chaque image
curl -o public/images/tifinagh-terrasse-montmartre-parasol-rouge-clients.jpg \
  https://res.cloudinary.com/dc9xmxpvv/image/upload/v1787946633/489A2500_evy0js.jpg
```

---

## 🔍 SEO & Optimisations

### Pour chaque image, utiliser :
1. **Alt text** : Description complète (40-60 caractères)
2. **Nom de fichier** : Hyphenated, keywords pertinents
3. **Métadonnées** : Title, description dans le HTML
4. **Responsive images** : srcset pour différentes tailles

### Exemple optimisé :
```html
<img 
  src="terrace-day.webp"
  srcset="terrace-day-small.webp 640w, terrace-day-medium.webp 1024w, terrace-day.webp 1920w"
  alt="Terrasse Tifinagh Montmartre avec parasols rouges la nuit"
  title="Restaurant Tifinagh - Terrasse Montmartre"
  loading="lazy"
  width="1920"
  height="1280"
/>
```

---

## 📊 Statistiques des photos

| Catégorie | Nombre | Usage |
|-----------|--------|-------|
| Terrasse | 4 photos | Ambiance, accueil, réseaux |
| Plats | 3 photos | Galerie, menu, appétit |
| **Total** | **7 photos** | **Multi-canal** |

---

## 🎯 Prochaines étapes

1. ✅ **Noms SEO créés** → Voir fichier GALERIE_PHOTOS_SEO.csv
2. ⬜ **Mettre à jour la page galerie** avec les noms optimisés
3. ⬜ **Ajouter photos sur autres pages** (accueil, menu du jour, carte)
4. ⬜ **Compresser pour web** si images > 500KB
5. ⬜ **Tester alt text** avec un lecteur d'écran

---

## 📥 Format d'export recommandé

Pour un meilleur SEO et performance :
- **Format** : WebP (ou JPG comme fallback)
- **Dimensions** : 1920x1280 (max), 800x600 (mobile)
- **Poids** : < 400KB par image
- **Metadata** : EXIF données supprimées

---

## 🚀 Bonus : Meta descriptions pour réseaux

### Instagram
```
"Découvrez la terrasse chaleureuse de Tifinagh au cœur de Montmartre. 
Cuisine française authentique et ambiance conviviale. 
Réservez sur WhatsApp 💬 #Tifinagh #Montmartre #BistroParisien"
```

### Facebook
```
"Ambiance parfaite à Tifinagh. 
Notre terrasse sous les étoiles vous accueille du lundi au dimanche. 
Plats gastronomiques et service impeccable. 
Appelez-nous : 01 42 94 22 40"
```

---

## 📞 Support

Besoin de clarification sur les noms ou l'utilisation ? 
Consulte le fichier **GALERIE_PHOTOS_SEO.csv** pour le mapping complet ! 🎉
