#!/usr/bin/env node
/**
 * Compresse les WebP de public/images aux dimensions d'affichage reelles.
 *
 * Usage : npm run images:optimize
 */
import { readdir, stat } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = 'public/images'

/** Largeur max alignee sur l'affichage Next.js (sizes) pour eviter le sur-chargement. */
const MAX_WIDTH = {
  'logo-tifinagh-detoure': 256,
  'logo-tifinagh-rond': 256,
  'tifinagh-dish': 800,
  'hero-salle': 1200,
  'tifinagh-facade': 900,
  'tifinagh-gallery': 900,
}

const WEBP_QUALITY = {
  'logo-tifinagh-detoure': 78,
  'logo-tifinagh-rond': 78,
  'tifinagh-dish': 72,
  'hero-salle': 70,
  'tifinagh-facade': 72,
  'tifinagh-gallery': 72,
}

const DEFAULT_MAX_WIDTH = 1024
const DEFAULT_QUALITY = 72

const format = (bytes) => `${(bytes / 1024).toFixed(0)} Ko`

async function main() {
  const entries = await readdir(SOURCE_DIR)
  const sources = entries.filter((name) => /\.webp$/i.test(name))

  if (sources.length === 0) {
    console.log('Aucune image WebP a optimiser.')
    return
  }

  let before = 0
  let after = 0

  for (const source of sources) {
    const { name } = parse(source)
    const sourcePath = join(SOURCE_DIR, source)
    const targetPath = join(SOURCE_DIR, `${name}.opt.webp`)

    const { size: sourceSize } = await stat(sourcePath)
    const width = MAX_WIDTH[name] ?? DEFAULT_MAX_WIDTH
    const quality = WEBP_QUALITY[name] ?? DEFAULT_QUALITY

    await sharp(sourcePath)
      .resize({ width, fit: 'inside', withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(targetPath)

    const { rename, unlink } = await import('node:fs/promises')
    await unlink(sourcePath)
    await rename(targetPath, sourcePath)

    const { size: targetSize } = await stat(sourcePath)
    before += sourceSize
    after += targetSize

    const saved = Math.round((1 - targetSize / sourceSize) * 100)
    console.log(`${source.padEnd(32)} ${format(sourceSize).padStart(9)} -> ${format(targetSize).padStart(8)}  (-${saved}%)`)
  }

  console.log(`\nTotal : ${format(before)} -> ${format(after)} (-${Math.round((1 - after / before) * 100)}%)`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
