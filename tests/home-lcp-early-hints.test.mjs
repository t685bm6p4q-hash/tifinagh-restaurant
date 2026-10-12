import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { isHomeMarketingPath } from '../lib/home-lcp-early-hints.ts'

describe('home LCP early hints', () => {
  it('cible uniquement l’accueil marketing', () => {
    assert.equal(isHomeMarketingPath('/'), true)
    assert.equal(isHomeMarketingPath('/carte'), false)
    assert.equal(isHomeMarketingPath('/en/carte'), false)
  })
})
