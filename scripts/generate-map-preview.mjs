#!/usr/bin/env node
/**
 * Compose une carte OSM (tuiles) et génère map-preview.webp / .avif.
 * Usage : node scripts/generate-map-preview.mjs
 */
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const lat = 48.885128
const lon = 2.331444
const zoom = 15
const tileSize = 256
const grid = 3
const width = 768
const height = 432

function lonToTileX(longitude, z) {
  return Math.floor(((longitude + 180) / 360) * 2 ** z)
}

function latToTileY(latitude, z) {
  const rad = (latitude * Math.PI) / 180
  return Math.floor(
    ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 2 ** z,
  )
}

function lonToPixelX(longitude, z) {
  return ((longitude + 180) / 360) * 2 ** z * tileSize
}

function latToPixelY(latitude, z) {
  const rad = (latitude * Math.PI) / 180
  return (
    ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 2 ** z * tileSize
  )
}

const centerTileX = lonToTileX(lon, zoom)
const centerTileY = latToTileY(lat, zoom)
const offset = Math.floor(grid / 2)

const composites = []
for (let dy = 0; dy < grid; dy += 1) {
  for (let dx = 0; dx < grid; dx += 1) {
    const x = centerTileX - offset + dx
    const y = centerTileY - offset + dy
    const url = `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`
    const response = await fetch(url, {
      headers: { 'User-Agent': 'TifinaghSite/1.0 (contact@tifinagh.fr)' },
    })
    if (!response.ok) {
      throw new Error(`tile ${x}/${y} HTTP ${response.status}`)
    }
    const tile = Buffer.from(await response.arrayBuffer())
    composites.push({
      input: tile,
      left: dx * tileSize,
      top: dy * tileSize,
    })
  }
}

const canvasSize = grid * tileSize
const centerPixelX = lonToPixelX(lon, zoom) - (centerTileX - offset) * tileSize
const centerPixelY = latToPixelY(lat, zoom) - (centerTileY - offset) * tileSize

const left = Math.max(0, Math.min(canvasSize - width, Math.round(centerPixelX - width / 2)))
const top = Math.max(0, Math.min(canvasSize - height, Math.round(centerPixelY - height / 2)))

const pinSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <circle cx="${centerPixelX - left}" cy="${centerPixelY - top - 6}" r="9" fill="#c0392b" stroke="#fff" stroke-width="3"/>
  </svg>`,
)

const base = await sharp({
  create: {
    width: canvasSize,
    height: canvasSize,
    channels: 3,
    background: '#e8e4dc',
  },
})
  .composite(composites)
  .extract({ left, top, width, height })
  .png()
  .toBuffer()

const withPin = await sharp(base)
  .composite([{ input: pinSvg, top: 0, left: 0 }])
  .toBuffer()

await sharp(withPin)
  .webp({ quality: 72, effort: 6 })
  .toFile('public/images/map-preview.webp')

await sharp(withPin)
  .avif({ quality: 48, effort: 6 })
  .toFile('public/images/map-preview.avif')

console.log('map-preview.webp + map-preview.avif générés (tuiles OSM)')
