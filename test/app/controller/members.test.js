/**
 *  @Test
 *  @Module members#controller
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 03:20:03 PM CST
 */

const request = require('supertest')
const mock    = require('egg-mock')
const assert  = require('assert')

describe('test/app/controller/members.test.js', () => {

  // App
  let app
  before(() => {
    // 通过 `egg-mock` 快速创建一个应用实例
    app = mock.app()
    return app.ready()
  })

  // 每一个测试过后都重置mock app
  afterEach(mock.restore)

  it('1 should return member info by username', async () => {
    const r = await request(app.callback())
    .get('/api/v2/members/username/IndexXuan')
      .expect(200)

    const item = r.body
    assert(typeof item === 'object')
    assert(item.status === 'found')
    assert(item.id === 105309)
    assert(item.username === 'IndexXuan')
  })

  it('2 should return member info by id', async () => {
    const r = await request(app.callback())
    .get('/api/v2/members/id/105309')
      .expect(200)

    const item = r.body
    assert(typeof item === 'object')
    assert(item.status === 'found')
    assert(item.id === 105309)
    assert(item.username === 'IndexXuan')
  })

  it('3 should validation failed for id', async () => {
    const r = await request(app.callback())
      .get('/api/v2/members/id/abcdef')
      .expect(422)

    const b = r.body
    assert(b.error === 'Validation Failed')
    assert(b.detail[0].field === 'id')
  })

}) // /.describe

