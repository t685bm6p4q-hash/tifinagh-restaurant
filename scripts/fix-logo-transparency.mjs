#!/usr/bin/env node
/**
 * Supprime le halo blanc autour du logo (fond reellement transparent).
 * Usage : node scripts/fix-logo-transparency.mjs
 */
import sharp from 'sharp'

const LOGOS = [
  'public/images/logo-tifinagh-detoure.webp',
  'public/images/logo-tifinagh-rond.webp',
]

const SIZE = 512

/** Masque circulaire : clip strict sur le disque du logo. */
function circleMask(size, insetPx = 3) {
  const r = size / 2 - insetPx
  const c = size / 2
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${c}" cy="${c}" r="${r}" fill="white"/>
    </svg>`,
  )
}

/** Pixels quasi-blancs (frange de detourage) → transparents. */
function removeWhiteFringe(data, channels, width, height) {
  const cx = width / 2
  const cy = height / 2
  const maxR = Math.min(cx, cy)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      const a = data[i + 3]
      if (a === 0) continue

      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const dx = x - cx
      const dy = y - cy
      const dist = Math.sqrt(dx * dx + dy * dy) / maxR

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const sat = max === 0 ? 0 : (max - min) / max
      const lum = (r + g + b) / 3

      // Bord exterieur du disque : frange blanche du mauvais detourage
      if (dist > 0.82 && lum > 120 && sat < 0.35) {
        data[i + 3] = 0
        continue
      }

      // Halo blanc / gris clair global
      if (lum > 192 && sat < 0.25) {
        data[i + 3] = 0
        continue
      }

      if (lum > 175 && sat < 0.12) {
        data[i + 3] = Math.round(a * 0.2)
      }
    }
  }
}

async function processLogo(path) {
  const resized = await sharp(path)
    .ensureAlpha()
    .resize(SIZE, SIZE, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()

  const { data, info } = await sharp(resized).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  removeWhiteFringe(data, info.channels, info.width, info.height)

  const defringed = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .composite([{ input: circleMask(SIZE, 10), blend: 'dest-in' }])
    .webp({ quality: 88, effort: 6, alphaQuality: 100 })
    .toBuffer()

  // Re-export aux tailles d'affichage (104px = 2x retina pour 52px CSS)
  await sharp(defringed)
    .resize(104, 104, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85, effort: 6, alphaQuality: 100 })
    .toFile(path)

  const { size } = await import('node:fs/promises').then((fs) => fs.stat(path))
  console.log(`${path} → ${size} octets (fond transparent)`)
}

for (const logo of LOGOS) {
  await processLogo(logo)
}
