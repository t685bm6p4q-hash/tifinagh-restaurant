#!/usr/bin/env node
/**
 * 📋 TEMPLATE : Personnalisez ce fichier avec vos données
 * Exemple d'utilisation avec données externes (JSON, BD, etc.)
 * Copiez ce fichier, adaptez-le, puis exécutez :
 * node scripts/generate-menu-pdf-custom.js
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ==================== CONFIGURATION PERSONNALISABLE ====================

// 🍽️ DONNÉES DU MENU (à adapter avec vos vraies données)
const menuData = {
  restaurantName: 'Tifinagh',
  restaurantSubtitle: 'Athhomic Design',
  title: 'Menu du Jour',
  
  entrees: [
    { name: 'Salade Tifinagh', desc: 'Légumes frais, vinaigrette traditionnelle', price: '8€' },
    { name: 'Brick Épinards Feta', desc: 'Pâte croustillante, saveurs délicates', price: '7€' },
    { name: 'Houmous Maison', desc: 'Pois chiches, tahini, citron frais', price: '6€' },
  ],
  
  plats: [
    { name: 'Couscous Royal', desc: 'Agneau, poulet, merguez, légumes, semoule fine', price: '18€' },
    { name: 'Tajine Poulet Citron', desc: 'Poulet confit, olives vertes, citron préservé', price: '16€' },
    { name: 'Grillades Assortie', desc: 'Brochettes d\'agneau et poulet, sauce berbère', price: '19€' },
    { name: 'Pâtes Fraîches', desc: 'Sauce maison du jour, légumes de saison', price: '12€' },
  ],
  
  desserts: [
    { name: 'Pâtisseries Marocaines', desc: 'Baklava, cornes de gazelle, assortiment', price: '6€' },
    { name: 'Flan aux Amandes', desc: 'Saveur délicate, coulis de fruits', price: '5€' },
    { name: 'Fruit du Jour', desc: 'Sélection fraîche de la maison', price: '4€' },
  ],
  
  footer: {
    address: 'Pigalle, Paris',
    note: 'Menu du jour réservé • À consommer sur place',
  }
};

// 🎨 COULEURS (à personnaliser)
const colors = {
  primary: '#1a1a1a',      // Noir
  accent: '#d4af37',       // Or (titres, prix)
  accent2: '#8b7355',      // Marron (descriptions)
  text: '#2d2d2d',         // Gris foncé
  light: '#f5f5f5',        // Gris clair
  white: '#ffffff',        // Blanc
};

// ==================== FONCTION DE GÉNÉRATION ====================

function generateMenuPDF(data, colors, outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 40,
    bufferPages: true,
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // EN-TÊTE
  doc.fillColor(colors.accent).fontSize(28).font('Helvetica-Bold').text(data.restaurantName, { align: 'center' });
  doc.fillColor(colors.text).fontSize(12).font('Helvetica').text(data.restaurantSubtitle, { align: 'center' });
  doc.fontSize(10).fillColor(colors.accent2).text(data.title, { align: 'center' });
  doc.moveDown(0.5);

  // Ligne de séparation
  doc.strokeColor(colors.accent).lineWidth(1.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.8);

  // TITRE PRINCIPAL
  doc.fillColor(colors.primary).fontSize(18).font('Helvetica-Bold').text('Nos Spécialités du Jour', { align: 'center' });
  doc.moveDown(0.5);

  // ENTRÉES
  doc.fillColor(colors.accent).fontSize(14).font('Helvetica-Bold').text('Entrées');
  doc.moveDown(0.3);

  data.entrees.forEach(item => {
    doc.fillColor(colors.text).fontSize(11).font('Helvetica-Bold').text(item.name);
    doc.fontSize(9).fillColor(colors.accent2).font('Helvetica-Oblique').text(item.desc);
    doc.fontSize(10).fillColor(colors.accent).font('Helvetica-Bold').text(item.price, { align: 'right' });
    doc.moveDown(0.3);
  });
  doc.moveDown(0.5);

  // PLATS PRINCIPAUX
  doc.fillColor(colors.accent).fontSize(14).font('Helvetica-Bold').text('Plats Principaux');
  doc.moveDown(0.3);

  data.plats.forEach(item => {
    doc.fillColor(colors.text).fontSize(11).font('Helvetica-Bold').text(item.name);
    doc.fontSize(9).fillColor(colors.accent2).font('Helvetica-Oblique').text(item.desc);
    doc.fontSize(10).fillColor(colors.accent).font('Helvetica-Bold').text(item.price, { align: 'right' });
    doc.moveDown(0.3);
  });
  doc.moveDown(0.5);

  // DESSERTS
  doc.fillColor(colors.accent).fontSize(14).font('Helvetica-Bold').text('Desserts');
  doc.moveDown(0.3);

  data.desserts.forEach(item => {
    doc.fillColor(colors.text).fontSize(11).font('Helvetica-Bold').text(item.name);
    doc.fontSize(9).fillColor(colors.accent2).font('Helvetica-Oblique').text(item.desc);
    doc.fontSize(10).fillColor(colors.accent).font('Helvetica-Bold').text(item.price, { align: 'right' });
    doc.moveDown(0.3);
  });
  doc.moveDown(0.8);

  // Ligne de séparation
  doc.strokeColor(colors.accent).lineWidth(1.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  // FOOTER
  doc.fillColor(colors.accent2).fontSize(9).font('Helvetica').text(`Restaurant ${data.restaurantName} ${data.restaurantSubtitle}`, { align: 'center' });
  doc.fontSize(8).text(`📍 ${data.footer.address}`, { align: 'center' });
  doc.text(data.footer.note, { align: 'center', width: 500 });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      console.log(`✅ PDF créé : ${outputPath}`);
      resolve(outputPath);
    });
    stream.on('error', reject);
  });
}

// ==================== EXÉCUTION ====================

(async () => {
  try {
    const outputPath = path.join(process.cwd(), 'public', 'menu-du-jour.pdf');
    await generateMenuPDF(menuData, colors, outputPath);
    
    const stats = fs.statSync(outputPath);
    console.log(`📄 Taille : ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`✨ Menu prêt à être consulté !`);
  } catch (error) {
    console.error(`❌ Erreur : ${error.message}`);
    process.exit(1);
  }
})();

// ==================== CONSEILS D'UTILISATION ====================
/*
📝 COMMENT PERSONNALISER CE TEMPLATE :

1. MODIFIER LES DONNÉES :
   - Changez les valeurs dans l'objet `menuData`
   - Ajoutez/supprimez des plats selon vos besoins
   - Mettez à jour les prix et descriptions

2. MODIFIER LES COULEURS :
   - Changez les valeurs HEX dans l'objet `colors`
   - Testez avec votre palette personnelle

3. CHARGER DEPUIS UNE BD OU UN JSON :
   ```javascript
   // Exemple : charger depuis un fichier JSON
   const menuData = JSON.parse(fs.readFileSync('menu-data.json', 'utf8'));
   ```

4. GÉNÉRER DYNAMIQUEMENT :
   Vous pouvez intégrer ce script dans une API Next.js pour générer
   un PDF à la demande (voir exemples ci-dessous)

📚 EXEMPLE : API NEXT.JS PERSONNALISÉE
Créez `app/api/generate-menu/route.ts` :

import { NextRequest, NextResponse } from 'next/server';
import { spawnSync } from 'child_process';

export async function POST(request: NextRequest) {
  try {
    const menuData = await request.json();
    // Générer le PDF avec vos données personnalisées
    const result = spawnSync('node', ['scripts/generate-menu-pdf-template.js'], {
      cwd: process.cwd(),
    });
    return NextResponse.json({ success: true, message: 'Menu généré' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
*/
