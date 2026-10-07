import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  menuDishesSource,
  menuServedVariant,
  menuShowEnFallback,
} from '../lib/menu-viewer-derived.ts'

describe('menuServedVariant', () => {
  it('sert le français quand le toggle est sur FR', () => {
    assert.equal(menuServedVariant('fr', true), 'fr')
    assert.equal(menuServedVariant('fr', false), 'fr')
  })

  it("sert l'anglais quand un menu EN est en ligne", () => {
    assert.equal(menuServedVariant('en', true), 'en')
  })

  it('retombe sur le français quand aucun menu EN n’est en ligne', () => {
    assert.equal(menuServedVariant('en', false), 'fr')
  })
})

describe('menuShowEnFallback', () => {
  it('affiche la note uniquement pour EN sans menu anglais', () => {
    assert.equal(menuShowEnFallback('en', false), true)
    assert.equal(menuShowEnFallback('en', true), false)
    assert.equal(menuShowEnFallback('fr', false), false)
  })
})

describe('menuDishesSource', () => {
  const both = { fr: '  Couscous  ', en: ' Couscous royal ' }

  it('utilise le texte EN (nettoyé) quand la variante servie est EN', () => {
    assert.deepEqual(menuDishesSource(both, 'en'), { text: 'Couscous royal', variant: 'en' })
  })

  it('utilise le texte FR (nettoyé) quand la variante servie est FR', () => {
    assert.deepEqual(menuDishesSource(both, 'fr'), { text: 'Couscous', variant: 'fr' })
  })

  it('retombe sur le FR quand le texte EN est vide', () => {
    assert.deepEqual(menuDishesSource({ fr: 'Tajine', en: '   ' }, 'en'), {
      text: 'Tajine',
      variant: 'fr',
    })
  })

  it('retombe sur le EN quand seul le texte EN existe', () => {
    assert.deepEqual(menuDishesSource({ fr: '', en: 'Tagine' }, 'fr'), {
      text: 'Tagine',
      variant: 'en',
    })
  })

  it('renvoie un texte vide avec la variante servie quand rien n’est saisi', () => {
    assert.deepEqual(menuDishesSource({ fr: ' ', en: '' }, 'en'), { text: '', variant: 'en' })
  })
})
