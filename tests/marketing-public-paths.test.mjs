import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { isMarketingPublicPath } from '../lib/marketing-public-paths.ts'

describe('marketing public paths (sans rewrite locale)', () => {
  it('inclut découverte agents et fichiers racine', () => {
    assert.equal(isMarketingPublicPath('/.well-known/ai-catalog.json'), true)
    assert.equal(isMarketingPublicPath('/.well-known/ard.json'), true)
    assert.equal(isMarketingPublicPath('/llms.txt'), true)
    assert.equal(isMarketingPublicPath('/robots.txt'), true)
    assert.equal(isMarketingPublicPath('/sitemap.xml'), true)
  })

  it('exclut les pages marketing', () => {
    assert.equal(isMarketingPublicPath('/'), false)
    assert.equal(isMarketingPublicPath('/carte'), false)
    assert.equal(isMarketingPublicPath('/admin/menu-setup'), false)
  })
})
