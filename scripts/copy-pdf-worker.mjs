import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const source = join(process.cwd(), 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs')
const target = join(process.cwd(), 'public/pdf.worker.min.mjs')

if (!existsSync(source)) {
  console.error('copy-pdf-worker: pdfjs-dist worker introuvable — lancez npm install')
  process.exit(1)
}

copyFileSync(source, target)
console.log('copy-pdf-worker: public/pdf.worker.min.mjs à jour')
