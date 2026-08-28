#!/usr/bin/env node
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Couleurs (palette Tifinagh)
const colors = {
  primary: '#1a1a1a',      // Noir
  accent: '#d4af37',       // Or
  accent2: '#8b7355',      // Marron
  text: '#2d2d2d',         // Gris foncé
  light: '#f5f5f5',        // Gris clair
  white: '#ffffff',        // Blanc
};

// Créer le PDF
const doc = new PDFDocument({
  size: 'A4',
  margin: 40,
  bufferPages: true,
});

// Chemin de sortie
const outputPath = path.join(process.cwd(), 'public', 'menu-du-jour.pdf');
const stream = fs.createWriteStream(outputPath);

doc.pipe(stream);

// --- HEADER ---
doc.fillColor(colors.accent).fontSize(28).font('Helvetica-Bold').text('Tifinagh', { align: 'center' });
doc.fillColor(colors.text).fontSize(12).font('Helvetica').text('Restaurant', { align: 'center' });
doc.fontSize(10).fillColor(colors.accent2).text('Menu à la Carte', { align: 'center' });

doc.moveDown(0.5);

// Ligne de séparation
doc.strokeColor(colors.accent).lineWidth(1.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();

doc.moveDown(0.8);

// --- TITRE PRINCIPAL ---
doc.fillColor(colors.primary).fontSize(18).font('Helvetica-Bold').text('Nos Spécialités', { align: 'center' });
doc.moveDown(0.5);

// --- SECTION ENTREES ---
doc.fillColor(colors.accent).fontSize(14).font('Helvetica-Bold').text('Entrées', { underline: false });
doc.moveDown(0.3);

const entrees = [
  { name: 'Foie gras maison', desc: 'Confiture de figue et toasts', price: '17€' },
  { name: 'Soupe à l\'oignon franc-comtoise', desc: 'Au comté', price: '9,50€' },
  { name: 'Cassolette d\'escargots de Bourgogne', desc: 'En persillade, douzaine', price: '17€' },
];

entrees.forEach(item => {
  doc.fillColor(colors.text).fontSize(11).font('Helvetica-Bold').text(item.name);
  doc.fontSize(9).fillColor(colors.accent2).font('Helvetica-Oblique').text(item.desc);
  doc.fontSize(10).fillColor(colors.accent).font('Helvetica-Bold').text(item.price, { align: 'right' });
  doc.moveDown(0.3);
});

doc.moveDown(0.5);

// --- SECTION PLATS ---
doc.fillColor(colors.accent).fontSize(14).font('Helvetica-Bold').text('Plats Principaux', { underline: false });
doc.moveDown(0.3);

const plats = [
  { name: 'Confit de canard maison', desc: 'Pommes sarladaises', price: '21,50€' },
  { name: 'Joue de bœuf braisée à la bourguignonne', desc: 'Pommes au lard et champignons', price: '23€' },
  { name: 'Salade landaise', desc: 'Foie gras maison, gésiers de volaille, magret de canard fumé', price: '24€' },
];

plats.forEach(item => {
  doc.fillColor(colors.text).fontSize(11).font('Helvetica-Bold').text(item.name);
  doc.fontSize(9).fillColor(colors.accent2).font('Helvetica-Oblique').text(item.desc);
  doc.fontSize(10).fillColor(colors.accent).font('Helvetica-Bold').text(item.price, { align: 'right' });
  doc.moveDown(0.3);
});

doc.moveDown(0.5);

// --- SECTION DESSERTS ---
doc.fillColor(colors.accent).fontSize(14).font('Helvetica-Bold').text('Desserts', { underline: false });
doc.moveDown(0.3);

const desserts = [
  { name: 'Crème brûlée vanille Bourbon', desc: 'Tradition française', price: '9€' },
  { name: 'Tarte Tatin', desc: 'Pommes caramélisées', price: '9,50€' },
  { name: 'Brownie aux noix et boule vanille', desc: 'Chocolat intense', price: '10€' },
];

desserts.forEach(item => {
  doc.fillColor(colors.text).fontSize(11).font('Helvetica-Bold').text(item.name);
  doc.fontSize(9).fillColor(colors.accent2).font('Helvetica-Oblique').text(item.desc);
  doc.fontSize(10).fillColor(colors.accent).font('Helvetica-Bold').text(item.price, { align: 'right' });
  doc.moveDown(0.3);
});

doc.moveDown(0.8);

// Ligne de séparation
doc.strokeColor(colors.accent).lineWidth(1.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();

doc.moveDown(0.5);

// --- FOOTER ---
doc.fillColor(colors.accent2).fontSize(9).font('Helvetica').text('Restaurant Tifinagh Athhomic Design', { align: 'center' });
doc.fontSize(8).text('📍 Pigalle, Paris  |  Menu du jour réservé', { align: 'center' });
doc.text('À consommer sur place • Prendre des photos avec modération 📸', { align: 'center', width: 500 });

// Finaliser le PDF
doc.end();

// Confirmation
stream.on('finish', () => {
  console.log(`✅ PDF créé avec succès: ${outputPath}`);
  console.log(`📄 Fichier: menu-du-jour.pdf`);
  console.log(`💾 Taille: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
});

stream.on('error', (err) => {
  console.error(`❌ Erreur lors de la création du PDF:`, err);
  process.exit(1);
});
