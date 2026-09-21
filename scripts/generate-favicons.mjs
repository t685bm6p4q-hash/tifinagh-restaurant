#!/usr/bin/env node
/**
 * Génère les favicons PNG / ICO acceptés par Google Search
 * (WebP et SVG ne sont pas dans les formats documentés).
 *
 * Usage : npm run icons:generate
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'public/icon.webp')

function pngToIco(images) {
  const count = images.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(count, 4)

  let offset = 6 + 16 * count
  const entries = []
  const payloads = []

  for (const { width, height, buffer } of images) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(width >= 256 ? 0 : width, 0)
    entry.writeUInt8(height >= 256 ? 0 : height, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(buffer.length, 8)
    entry.writeUInt32LE(offset, 12)
    entries.push(entry)
    payloads.push(buffer)
    offset += buffer.length
  }

  return Buffer.concat([header, ...entries, ...payloads])
}

async function pngAt(size) {
  return sharp(source)
    .resize(size, size, {
      fit: 'cover',
      position: 'centre',
    })
    .png({ compressionLevel: 9 })
    .toBuffer()
}

const png192 = await pngAt(192)
const png180 = await pngAt(180)
const ico = pngToIco(
  await Promise.all(
    [16, 32, 48].map(async (size) => ({
      width: size,
      height: size,
      buffer: await pngAt(size),
    })),
  ),
)

const files = {
  'public/icon.png': png192,
  'public/apple-touch-icon.png': png180,
  'public/favicon.ico': ico,
  'app/favicon.ico': ico,
}

for (const [relative, buffer] of Object.entries(files)) {
  const path = join(root, relative)
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, buffer)
  console.log(`${relative} → ${buffer.length} octets`)
}
