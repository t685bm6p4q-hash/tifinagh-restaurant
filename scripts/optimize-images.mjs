#!/usr/bin/env node
/**
 * Convertit les images sources de public/images en WebP.
 * Les PNG exportes en 1024x1024 pesaient ~2 Mo chacun, ce qui plombait le LCP.
 *
 * Usage : npm run images:optimize
 */
import { readdir, stat } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = 'public/images'

/** Largeur max par image : les logos s'affichent petit, les photos remplissent une colonne. */
const MAX_WIDTH = {
  'logo-tifinagh-detoure': 512,
  'logo-tifinagh-rond': 512,
}
const DEFAULT_MAX_WIDTH = 1024

const format = (bytes) => `${(bytes / 1024).toFixed(0)} Ko`

async function main() {
  const entries = await readdir(SOURCE_DIR)
  const sources = entries.filter((name) => /\.(png|jpe?g)$/i.test(name))

  if (sources.length === 0) {
    console.log('Aucune image a convertir.')
    return
  }

  let before = 0
  let after = 0

  for (const source of sources) {
    const { name } = parse(source)
    const sourcePath = join(SOURCE_DIR, source)
    const targetPath = join(SOURCE_DIR, `${name}.webp`)

    const { size: sourceSize } = await stat(sourcePath)
    const width = MAX_WIDTH[name] ?? DEFAULT_MAX_WIDTH

    await sharp(sourcePath)
      .resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(targetPath)

    const { size: targetSize } = await stat(targetPath)
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
