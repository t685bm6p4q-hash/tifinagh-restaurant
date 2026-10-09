import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it } from 'node:test'
import {
  adminLocaleRewritePath,
  adminNeedsLocaleRewrite,
  assertAdminProxyRoutingOrder,
  isAdminInternalPath,
} from '../lib/admin-proxy-routing.ts'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

describe('admin proxy routing', () => {
  it('identifie /admin/*', () => {
    assert.equal(isAdminInternalPath('/admin/menu-setup'), true)
    assert.equal(isAdminInternalPath('/en/admin'), false)
    assert.equal(isAdminInternalPath('/menu-du-jour'), false)
  })

  it('réécrit /admin/menu-setup vers /fr/admin/menu-setup', () => {
    assert.equal(adminLocaleRewritePath('/admin/menu-setup'), '/fr/admin/menu-setup')
  })

  it('signale quand le rewrite admin est nécessaire', () => {
    assert.equal(adminNeedsLocaleRewrite('/admin/menu-setup', '/admin/menu-setup'), true)
    assert.equal(adminNeedsLocaleRewrite('/fr/admin/menu-setup', '/admin/menu-setup'), false)
  })

  it('proxy.ts : auth admin avant rewrite marketing (anti-régression)', () => {
    const source = readFileSync(join(repoRoot, 'proxy.ts'), 'utf8')
    const result = assertAdminProxyRoutingOrder(source)
    assert.equal(result.ok, true, !result.ok ? result.reason : undefined)
  })
})
