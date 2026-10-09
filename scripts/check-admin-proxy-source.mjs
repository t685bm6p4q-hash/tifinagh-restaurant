#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { assertAdminProxyRoutingOrder } from '../lib/admin-proxy-routing.ts'

const proxyPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'proxy.ts')
const source = readFileSync(proxyPath, 'utf8')
const result = assertAdminProxyRoutingOrder(source)

if (!result.ok) {
  console.error(`✖ proxy admin : ${result.reason}`)
  process.exit(1)
}

console.log('OK: proxy /admin authentifié avant rewrite locale (check source)')
process.exit(0)
