# 📋 Guide Complet — Gestion du Menu du Jour (PDF)

## 🎯 Vue d'ensemble

Le système de menu du jour est **ultra simple** et fonctionne en deux modes :

### Mode 1 : Interface Web Admin (Recommandé ⭐)
Accédez à une page simple pour uploader votre PDF directement.

**Accès :** http://localhost:3000/admin/menu-setup  
ou sur votre domaine : https://tifinagh.fr/admin/menu-setup

### Mode 2 : Remplacement direct du fichier (Ultra rapide)
Remplacez simplement le fichier `public/menu-du-jour.pdf`

---

## 📱 Interface Admin Web

### Étapes :

1. **Ouvrez la page admin :**  
   http://localhost:3000/admin/menu-setup

2. **Cliquez sur "📤 Sélectionner un PDF"**

3. **Choisissez votre fichier PDF** (max 5 MB)

4. **Confirmez** → Le menu est immédiatement en ligne ! ✅

### Avantages :
- ✅ Zéro ligne de commande
- ✅ Feedback immédiat
- ✅ Pas de redémarrage serveur
- ✅ Fichier sauvegardé automatiquement

---

## 🔧 Mode Remplacement Direct

**Pour les utilisateurs avancés / via SFTP / FTP :**

### Sur votre ordinateur local :

```bash
# 1. Préparez votre PDF nommé "menu-du-jour.pdf"

# 2. Depuis le dossier du projet :
cp /chemin/vers/votre/menu.pdf ./public/menu-du-jour.pdf

# 3. C'est tout ! Le site se met à jour immédiatement.
```

### Via FTP (sur un serveur en production) :

1. Connectez-vous via FTP (Filezilla, cyberduck, etc.)
2. Naviguez dans le dossier `public/`
3. Glissez-déposez votre `menu-du-jour.pdf`
4. Le fichier remplace l'ancien → Prêt !

---

## 🎨 Comment créer votre Menu du Jour en PDF ?

### Option 1 : Canva (Gratuit, très facile)
1. Allez sur https://canva.com
2. Créez un design **A4 Portrait**
3. Importez le logo Tifinagh (disponible dans `public/images/logo-tifinagh-rond.png`)
4. Ajoutez votre contenu :
   - Titre : "MENU DU JOUR"
   - Date du jour
   - Sections : Entrées / Plats / Desserts
   - Prix
   - Spécialités du jour
5. Téléchargez en **PDF**

### Option 2 : Google Docs / Microsoft Word
1. Créez un document
2. Formatez votre menu
3. Exportez en **PDF**

### Option 3 : Adobe (Pro)
1. Utilisez Photoshop, Illustrator, ou InDesign
2. Exportez en PDF

---

## 📋 Exemple de contenu (Template)

```
╔═══════════════════════════════════════════════════════════════════╗
║              🍽️ TIFINAGH MONTMARTRE 🍽️                          ║
║                     MENU DU JOUR                                  ║
║                                                                   ║
║             Vendredi 28 août 2026                                ║
╚═══════════════════════════════════════════════════════════════════╝


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTRÉES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✦ Foie gras maison                              17 €
  Confiture de figue et toasts

✦ Soupe à l'oignon franc-comtoise              9,50 €
  Au comté


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PLATS (SPÉCIALITÉS DU JOUR)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✦ Confit de canard maison                      21,50 €
  Pommes sarladaises

✦ Joue de bœuf braisée à la bourguignonne      23 €
  Pommes au lard et champignons

✦ Poisson du jour (à consulter auprès du serveur)
  Prix selon marché


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESSERTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✦ Crème brûlée vanille Bourbon                 9 €

✦ Tarte Tatin                                  9,50 €

✦ Café gourmand                                10 €


═══════════════════════════════════════════════════════════════════════════════

📞 RÉSERVATIONS

Réservez sur WhatsApp :
💬 https://wa.me/33679045460

Par téléphone :
☎️ 01 42 94 22 40


📍 ADRESSE

Tifinagh Montmartre
17 Avenue Rachel
75018 Paris


🌐 SITE WEB

www.tifinagh-restaurant.fr

═══════════════════════════════════════════════════════════════════════════════
```

---

## 🌐 Où le menu est accessible ?

Le PDF apparaît à ces endroits du site :

| Page | Bouton |
|------|--------|
| **Accueil** | "📄 Voir le menu du jour (PDF)" dans l'aperçu menu |
| **La Carte** | "📥 Menu du jour (PDF)" en haut de page |
| **Menu du Jour** | "📥 Télécharger le menu (PDF)" en haut |
| **Lien direct** | `/menu-du-jour.pdf` |

---

## 🔐 Sécurité & Confidentialité

- ✅ Le PDF est accessible publiquement (pas de mot de passe)
- ✅ Stocké dans `public/` (accessible directement par le serveur)
- ✅ Pas de données sensibles stockées
- ✅ Max 5 MB par fichier (limitation sécurité)

---

## 🆘 Troubleshooting

### Q : Le PDF n'apparaît pas après l'upload
**A :** Essayez un hard refresh (Ctrl+Shift+R sur Windows/Linux, Cmd+Shift+R sur Mac)

### Q : Le bouton de upload ne fonctionne pas
**A :** Vérifiez que vous avez sélectionné un fichier PDF (pas Word, JPG, etc.)

### Q : Le fichier est trop volumineux
**A :** Compressez votre PDF (https://www.ilovepdf.com/compress_pdf)

### Q : Comment annuler un upload ?
**A :** Supprimez simplement le fichier `public/menu-du-jour.pdf` — un message d'erreur s'affichera quand les utilisateurs cliquent sur le bouton

### Q : Puis-je automatiser les mises à jour ?
**A :** Oui ! Vous pouvez créer un script qui update le PDF chaque jour via l'API :
```bash
curl -X POST https://votre-domaine.fr/api/upload-menu \
  -F "file=@menu-du-jour.pdf"
```

---

## 📊 Statistiques

- **Taille fichier** : jusqu'à 5 MB
- **Format** : PDF uniquement
- **Emplacement** : `public/menu-du-jour.pdf`
- **URL publique** : `/menu-du-jour.pdf`
- **Mise à jour** : Immédiate (pas de cache)

---

## 🎯 Bonnes pratiques

1. **Mettez à jour quotidiennement** le menu du jour
2. **Gardez un design cohérent** (même police, logo, couleurs)
3. **Testez après chaque upload** (ouvrez le lien pour vérifier)
4. **Incluez les infos de contact** (tél, WhatsApp, adresse)
5. **Date visible** en haut du PDF (permet aux clients de savoir si c'est le bon jour)

---

## 📞 Besoin d'aide ?

- **Interface admin :** http://localhost:3000/admin/menu-setup
- **Documentation complète :** Ce fichier (GUIDE_MENU_PDF.md)
- **Questions techniques :** Vérifiez les logs serveur (npm run dev)

---

**Dernier conseil** : C'est un système conçu pour être **simple et rapide**. Vous devriez pouvoir changer votre menu en moins de 2 minutes ! 🚀
