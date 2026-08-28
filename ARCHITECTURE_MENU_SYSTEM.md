# 🏗️ Architecture du Système de Menu du Jour

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────┐
│                    TIFINAGH SITE                        │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    🌐 WEB              💾 FILE SYSTEM       🔧 API
        │                   │                   │
   ┌────v────┐         ┌────v────────┐    ┌───v─────┐
   │ Buttons │         │  PDF File   │    │ Upload  │
   │ (Voir)  │────────→│  (public/)  │←───│ Route   │
   └─────────┘         └────────────┘    └─────────┘
        │                   │                   │
        │              📄 menu-du-jour.pdf      │
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    🎯 Browser View
                   (Consultable, pas DL)
```

---

## 🔄 Flux de travail complet

### **Scénario 1 : Génération initiale**

```
USER: npm run menu:generate
  ↓
scripts/generate-menu-pdf.js (Node.js)
  ├─ Lit les données du menu (entrees, plats, desserts)
  ├─ Crée un document PDF avec pdfkit
  ├─ Applique la mise en forme (couleurs, typos, layout)
  └─ Écrit le fichier → public/menu-du-jour.pdf
  ↓
✅ Fichier PDF créé (2.7 KB)
```

### **Scénario 2 : Upload via interface web**

```
USER: Va à /admin/menu-setup
  ↓
Upload un fichier PDF
  ↓
FormData → POST /api/upload-menu
  ↓
app/api/upload-menu/route.ts (API Route)
  ├─ Reçoit le multipart/form-data
  ├─ Valide : type PDF, taille < 5MB
  ├─ Convertit en Buffer
  ├─ Écrit → public/menu-du-jour.pdf (OVERWRITE ⚠️)
  └─ Retourne { success: true, message: '...' }
  ↓
Frontend affiche: "✅ Menu mis à jour"
  ↓
✅ Ancien PDF remplacé automatiquement
```

### **Scénario 3 : Consultation du menu**

```
USER: Clique sur "Voir le menu du jour"
  ↓
<MenuPdfButton>
  ├─ href="/menu-du-jour.pdf"
  └─ onClick: window.open(pdfUrl, '_blank')
  ↓
window.open() → Nouvel onglet
  ↓
Navigateur charge le PDF
  ├─ Affiche en consultation
  ├─ Barre PDF viewer (viewer.js de Chrome/Firefox)
  └─ ❌ Pas de bouton "Télécharger" ou "Enregistrer"
  ↓
✅ PDF consultable, pas téléchargeable
```

---

## 📦 Composants et modules

### **1. Script de génération**

**Fichier :** `scripts/generate-menu-pdf.js`

**Responsabilités :**
- Lire les données du menu
- Créer un document PDF avec `pdfkit`
- Appliquer le design (couleurs, layout)
- Écrire le fichier binaire

**Flux interne :**
```javascript
// 1. Créer un PDFDocument
const doc = new PDFDocument({ size: 'A4', margin: 40 })

// 2. Créer un stream vers public/menu-du-jour.pdf
const stream = fs.createWriteStream(outputPath)
doc.pipe(stream)

// 3. Ajouter du contenu
doc.fillColor('#d4af37').fontSize(28).text('Tifinagh')
doc.text('Tahhomic Design')
// ... etc

// 4. Finaliser
doc.end()
stream.on('finish', () => console.log('✅'))
```

**Dépendances :**
- `pdfkit` : Création de PDFs
- `fs/promises` : File system
- `path` : Navigation de chemins

---

### **2. API d'upload**

**Fichier :** `app/api/upload-menu/route.ts`

**Responsabilités :**
- Recevoir l'upload HTTP
- Valider le fichier (type, taille)
- Remplacer le fichier existant
- Retourner un JSON de confirmation

**Flux interne :**
```typescript
export async function POST(request: NextRequest) {
  // 1. Parser le multipart/form-data
  const formData = await request.formData()
  const file = formData.get('file') as File

  // 2. Valider
  if (!file.type.includes('pdf')) return error('PDF requis')
  if (file.size > 5 * 1024 * 1024) return error('Max 5MB')

  // 3. Convertir en Buffer
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // 4. Écrire (OVERWRITE)
  const publicPath = join(process.cwd(), 'public', 'menu-du-jour.pdf')
  await writeFile(publicPath, buffer)

  // 5. Répondre
  return NextResponse.json({ success: true })
}
```

**Dépendances :**
- Next.js `NextRequest`, `NextResponse`
- `fs/promises` : `writeFile()`
- `path` : Manipulation de chemins

---

### **3. Bouton du menu**

**Fichier :** `components/menu-pdf-button.tsx`

**Responsabilités :**
- Afficher un bouton/lien stylisé
- Ouvrir le PDF en consultation
- Supporter plusieurs variantes de style

**Flux interne :**
```tsx
<a href="/menu-du-jour.pdf" onClick={handleClick}>
  {/* Icône Eye ou FileText */}
  {label}
</a>

const handleClick = (e: React.MouseEvent) => {
  e.preventDefault()
  if (viewOnly) {
    window.open(pdfUrl, '_blank') // Consultation
  }
}
```

**Props :**
- `variant` : 'primary' | 'text' | 'secondary'
- `size` : 'small' | 'medium' | 'large'
- `label` : Texte du bouton
- `viewOnly` : true = consultation, false = téléchargement

---

### **4. Page d'administration**

**Fichier :** `app/admin/menu-setup/page.tsx`

**Responsabilités :**
- Afficher un formulaire d'upload
- Valider côté client (PDF, < 5MB)
- Envoyer le fichier vers `/api/upload-menu`
- Afficher les messages (succès/erreur)

**Flux interne :**
```tsx
const handleFileUpload = async (e: React.FormEvent) => {
  const file = fileInput.current?.files?.[0]

  // 1. Valider côté client
  if (!file.type.includes('pdf')) {
    setMessage('❌ Doit être un PDF')
    return
  }

  // 2. Créer FormData
  const formData = new FormData()
  formData.append('file', file)

  // 3. Envoyer à l'API
  const res = await fetch('/api/upload-menu', {
    method: 'POST',
    body: formData,
  })

  // 4. Traiter la réponse
  if (res.ok) {
    setMessage('✅ Menu mis à jour')
  }
}
```

---

## 🔐 Sécurité

### **Validations**

| Point de contrôle | Vérification |
|------------------|-------------|
| **Client** | Extension PDF, taille < 5MB |
| **Serveur** | MIME type (application/pdf), taille < 5MB |
| **File system** | Écriture dans `public/` seulement |

### **Contrôle d'accès**

Actuellement **NON AUTHENTIFIÉ** sur `/admin/menu-setup`.

**À ajouter si production :**
```typescript
// Middleware pour vérifier l'authentification
if (!isAdmin(request)) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

---

## 📊 Specifications du PDF

| Aspect | Détail |
|--------|--------|
| **Format** | A4 (210mm × 297mm) |
| **Marges** | 40px |
| **Nombre de pages** | 1 |
| **Taille fichier** | ~2.7 KB (très léger) |
| **Encodage** | PDF 1.3 (standard) |
| **Fonts** | Helvetica (standard, aucune custom) |

### **Structure du contenu**

```
┌─────────────────────────────────┐
│        TIFINAGH                 │  [Or - Accent]
│     Athhomic Design             │  [Texte]
│      Menu du Jour               │  [Marron]
├─────────────────────────────────┤
│                                 │
│   Nos Spécialités du Jour       │  [Titre]
│                                 │
│   Entrées                       │  [Sous-titre]
│   ├─ Salade Tifinagh            │
│   │  Légumes frais...        8€ │
│   ├─ Brick Épinards Feta        │
│   │  Pâte croustillante...   7€ │
│   └─ Houmous Maison             │
│      Pois chiches...         6€ │
│                                 │
│   Plats Principaux              │
│   ├─ Couscous Royal             │
│   │  Agneau, poulet...      18€ │
│   ├─ Tajine Poulet Citron       │
│   │  Poulet confit...       16€ │
│   └─ ... (2 autres plats)       │
│                                 │
│   Desserts                      │
│   ├─ Pâtisseries Marocaines     │
│   │  Baklava, gazelle...     6€ │
│   ├─ Flan aux Amandes           │
│   │  Saveur délicate...      5€ │
│   └─ Fruit du Jour              │
│      Sélection fraîche...    4€ │
│                                 │
├─────────────────────────────────┤
│ Restaurant Tifinagh Athhomic... │  [Footer]
│ 📍 Pigalle, Paris | Menu du ... │
│ À consommer sur place • Photos  │
└─────────────────────────────────┘
```

---

## 🎨 Personnalisation

### **Modifier le contenu**

**Fichier :** `scripts/generate-menu-pdf.js`

```javascript
const entrees = [
  { name: 'NOUVEAU', desc: 'description', price: '10€' },
  // ...
]
```

**Puis :**
```bash
npm run menu:generate
```

### **Modifier les couleurs**

```javascript
const colors = {
  primary: '#1a1a1a',    // Changez ici
  accent: '#d4af37',     // Et ici
  accent2: '#8b7355',    // Et ici
  // ...
}
```

### **Modifier la mise en page**

Les proportions (marges, tailles de police, espacements) sont dans le script :

```javascript
doc.fontSize(28)      // Titre principal
doc.fontSize(14)      // Sous-titres
doc.fontSize(11)      // Noms de plats
doc.fontSize(9)       // Descriptions
```

Ajustez les nombres et régénérez.

---

## 🧪 Tests

### **Test 1 : Génération**
```bash
npm run menu:generate
file public/menu-du-jour.pdf
# Doit afficher : PDF document, version 1.3
```

### **Test 2 : Upload**
```bash
curl -F "file=@/path/to/menu.pdf" http://localhost:3000/api/upload-menu
# Doit retourner : { "success": true, "message": "..." }
```

### **Test 3 : Consultation**
1. Va à `http://localhost:3000/`
2. Clique sur "Voir le menu du jour"
3. Le PDF s'ouvre dans un nouvel onglet
4. Vérifie qu'il y a une barre PDF (pas de téléchargement)

---

## 🚀 Déploiement

### **Production (Vercel, etc.)**

1. **Fichier PDF persistant :**
   - `public/menu-du-jour.pdf` est inclus dans le build
   - Accessible via `https://example.com/menu-du-jour.pdf`

2. **Upload API :**
   - Fonctionne sur Vercel (système de fichiers éphémère mais OK pour un seul fichier)
   - Pour plusieurs PDFs ou historique, utilisez un bucket S3

3. **Espace admin :**
   - `/admin/menu-setup` est accessible (ajouter une auth en production!)
   - Vérifiez les permissions d'écriture sur `public/`

---

## 📝 Logging et débogage

### **Console Node**

```bash
npm run menu:generate
# Affiche :
# ✅ PDF créé avec succès: /path/to/public/menu-du-jour.pdf
# 📄 Fichier: menu-du-jour.pdf
# 💾 Taille: 2.74 KB
```

### **API response**

Upload réussi :
```json
{
  "success": true,
  "message": "Menu du jour mis à jour avec succès",
  "file": "menu-du-jour.pdf"
}
```

Upload échoué :
```json
{
  "success": false,
  "message": "Le fichier doit être un PDF"
}
```

---

## 🔄 Versioning et historique

Actuellement : **Pas d'historique** (fichier unique `menu-du-jour.pdf`)

**Si vous voulez l'historique :**

Modifiez l'API pour sauvegarder avec timestamp :
```typescript
const filename = `menu-du-jour-${Date.now()}.pdf`
const publicPath = join(process.cwd(), 'public', filename)
```

---

## 📦 Dépendances

| Package | Usage | Version |
|---------|-------|---------|
| `pdfkit` | Génération PDF | ^0.20.1 |
| `next` | Framework | 16.3.0 |
| `react` | UI | ^19 |
| `fs/promises` | File system (Node.js built-in) | - |
| `path` | Path navigation (Node.js built-in) | - |

---

## ✅ Checklist de production

- [ ] Test d'upload via `/admin/menu-setup`
- [ ] Vérifier que le PDF n'est pas téléchargeable
- [ ] Tester le remplacement de fichier (overwrite)
- [ ] Vider le cache du navigateur et re-tester
- [ ] Ajouter une authentification sur `/admin/*`
- [ ] Documenter le processus pour l'équipe
- [ ] Sauvegarder les anciennes versions (optionnel)

---

**Dernière mise à jour : 28 août 2026**

*Cette architecture est robuste, simple et extensible.*
