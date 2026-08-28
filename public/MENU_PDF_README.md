# 📄 Gestion du Menu du Jour (PDF)

## 🎯 Comment ça marche ?

Le site affiche un bouton **"Menu du Jour (PDF)"** qui pointe vers le fichier `menu-du-jour.pdf` dans ce dossier.

## 🔄 Comment remplacer le menu du jour ?

C'est ultra simple :

1. **Préparez votre PDF** avec le menu du jour (utilisez un outil comme Canva, Adobe, Word, etc.)
   - Format recommandé : **A4 portrait**
   - Taille : max **2-3 MB**

2. **Sauvegardez le PDF** avec le nom exact : `menu-du-jour.pdf`

3. **Remplacez le fichier** dans ce dossier (`public/menu-du-jour.pdf`)
   - Sur Mac : glissez-déposez le fichier
   - Sur Windows : clic droit > "Remplacer"
   - En ligne de commande :
     ```bash
     cp /chemin/vers/votre/menu.pdf ./public/menu-du-jour.pdf
     ```

4. **Prêt !** Le site affichera automatiquement le nouveau PDF.

## 🌐 Où le PDF est accessible ?

- Sur la page **Accueil** : bouton "Voir le menu du jour (PDF)"
- Sur la page **La carte** : bouton "Menu du jour (PDF)"
- Sur la page **Menu du Jour** : bouton "Télécharger le menu (PDF)"
- Lien direct : `http://localhost:3000/menu-du-jour.pdf` (ou ton domaine de production)

## 💡 Tips

- **Modifiez régulièrement** le PDF pour afficher les spécialités fraîches du jour
- **Testez** après chaque remplacement pour vérifier que le PDF s'ouvre bien
- **Format cohérent** : gardez un design similaire pour la reconnaissance de marque
- **Pas besoin de redémarrer** le serveur dev – le PDF se met à jour immédiatement

## 🎨 Suggestions de contenu pour le PDF

- Titre "Menu du Jour" en grand
- Logo Tifinagh
- Date du jour
- Sections : Entrées / Plats / Desserts
- Prix
- Mention des spécialités
- Infos de contact (tél, réservation WhatsApp)

---

**Besoin d'aide ?** Le système est zéro-complexité : il suffit de remplacer le fichier PDF ! 🚀
