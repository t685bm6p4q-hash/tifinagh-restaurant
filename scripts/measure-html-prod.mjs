#!/usr/bin/env node
/** Mesure taille HTML + en-têtes cache (prod ou preview). */
const base = (process.argv[2] ?? 'https://www.tifinagh.fr').replace(/\/$/, '')
const paths = ['/', '/carte', '/en/carte', '/menu-du-jour']

for (const path of paths) {
  const url = `${base}${path}`
  const res = await fetch(url, { redirect: 'follow' })
  const html = await res.text()
  const cache = res.headers.get('x-vercel-cache') ?? '—'
  const cdn = res.headers.get('cdn-cache-control') ?? '—'
  console.log(`${path}\t${res.status}\t${html.length} o\tx-vercel-cache=${cache}`)
  console.log(`  cdn-cache-control: ${cdn}`)
}
