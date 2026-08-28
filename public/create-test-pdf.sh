#!/bin/bash

# Créer un PDF simple de test avec enscript (si disponible) ou une autre méthode
# Pour macOS / Linux

if command -v enscript &> /dev/null; then
  cat > menu-temp.txt << 'MENU'
TIFINAGH MONTMARTRE - MENU DU JOUR

ENTRÉES
Foie gras maison - 17€
Soupe à l'oignon - 9,50€

PLATS
Confit de canard - 21,50€
Joue de bœuf braisée - 23€

DESSERTS
Crème brûlée - 9€
Tarte Tatin - 9,50€

Réservez sur WhatsApp : wa.me/33679045460
MENU
  enscript -B -p menu-du-jour.pdf menu-temp.txt
  rm menu-temp.txt
  echo "✅ PDF créé : menu-du-jour.pdf"
else
  echo "⚠️  Enscript non trouvé. Créez manuellement le PDF et placez-le ici."
  echo "📄 Format : public/menu-du-jour.pdf"
fi
