import assert from 'node:assert/strict'
import { beforeEach, describe, it } from 'node:test'
import {
  hasValidAdminSession,
  isAdminAuthorized,
  isAdminRateLimited,
  safeEqual,
  setAdminSessionCookie,
} from '../lib/admin-auth.ts'
import { serializeJsonLd } from '../lib/json-ld.ts'
import { parseMenuDisplayWidth } from '../lib/menu-image-display.ts'

const PASSWORD = 'mot-de-passe-test'

function request({ ip = '203.0.113.1', basic, cookie } = {}) {
  const headers = new Headers({ 'x-forwarded-for': ip })
  if (basic !== undefined) headers.set('authorization', `Basic ${btoa(`admin:${basic}`)}`)
  if (cookie) headers.set('cookie', cookie)
  return new Request('https://www.tifinagh.fr/api/upload-menu', { headers })
}

function issueSessionCookie() {
  let value = ''
  setAdminSessionCookie({ cookies: { set: (_name, v) => (value = v) } }, PASSWORD)
  return `tifinagh_admin_session=${value}`
}

describe('safeEqual', () => {
  it('compare des chaînes de longueurs différentes sans erreur', () => {
    assert.equal(safeEqual('abc', 'abc'), true)
    assert.equal(safeEqual('abc', 'abcd'), false)
    assert.equal(safeEqual('', 'x'), false)
  })
})

describe('session admin', () => {
  beforeEach(() => {
    process.env.MENU_ADMIN_PASSWORD = PASSWORD
  })

  it('accepte un cookie émis avec le mot de passe courant', () => {
    assert.equal(hasValidAdminSession(request({ cookie: issueSessionCookie() }), PASSWORD), true)
  })

  it('révoque les sessions quand le mot de passe change', () => {
    assert.equal(hasValidAdminSession(request({ cookie: issueSessionCookie() }), 'autre'), false)
  })

  it('refuse un jeton expiré ou falsifié', () => {
    const [, signature] = issueSessionCookie().split('=')[1].split('.')
    const expired = `tifinagh_admin_session=1.${signature}`
    assert.equal(hasValidAdminSession(request({ cookie: expired }), PASSWORD), false)
    assert.equal(
      hasValidAdminSession(request({ cookie: 'tifinagh_admin_session=bidon' }), PASSWORD),
      false,
    )
  })

  it('bloque une IP après 10 mots de passe faux, sans toucher les autres IP', () => {
    const ip = '198.51.100.7'
    for (let i = 0; i < 10; i++) {
      assert.equal(isAdminAuthorized(request({ ip, basic: 'faux' })), false)
    }
    assert.equal(isAdminRateLimited(request({ ip })), true)
    assert.equal(isAdminAuthorized(request({ ip, basic: PASSWORD })), false)
    assert.equal(isAdminAuthorized(request({ ip: '198.51.100.8', basic: PASSWORD })), true)
  })

  it('refuse tout sans mot de passe configuré (fail-closed)', () => {
    delete process.env.MENU_ADMIN_PASSWORD
    assert.equal(isAdminAuthorized(request({ basic: PASSWORD })), false)
  })
})

describe('parseMenuDisplayWidth', () => {
  it('ramène toute largeur valide sur 640 ou 920', () => {
    assert.equal(parseMenuDisplayWidth('320'), 640)
    assert.equal(parseMenuDisplayWidth('640'), 640)
    assert.equal(parseMenuDisplayWidth('780'), 640)
    assert.equal(parseMenuDisplayWidth('781'), 920)
    assert.equal(parseMenuDisplayWidth('1600'), 920)
  })

  it('ignore les valeurs hors bornes ou invalides', () => {
    assert.equal(parseMenuDisplayWidth('319'), null)
    assert.equal(parseMenuDisplayWidth('1601'), null)
    assert.equal(parseMenuDisplayWidth('abc'), null)
    assert.equal(parseMenuDisplayWidth(null), null)
  })
})

describe('serializeJsonLd', () => {
  it('échappe < pour empêcher la fermeture de la balise script', () => {
    const out = serializeJsonLd({ name: '</script><script>alert(1)</script>' })
    assert.equal(out.includes('<'), false)
    assert.deepEqual(JSON.parse(out), { name: '</script><script>alert(1)</script>' })
  })
})
