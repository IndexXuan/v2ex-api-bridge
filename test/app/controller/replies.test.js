/**
 *  @Test
 *  @Module replies@controller
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 06:08:18 PM CST
 */

const request = require('supertest')
const mock    = require('egg-mock')
const assert  = require('assert')

describe('test/app/controller/replies.test.js', () => {

  // App
  let app
  before(() => {
    // 通过 `egg-mock` 快速创建一个应用实例
    app = mock.app()
    return app.ready()
  })

  // 每一个测试过后都重置mock app
  afterEach(mock.restore)

  it('1 should return target replies of topic', async () => {
    const r = await request(app.callback())
      .get('/api/v2/replies/344499')
      .expect(200)

    assert(Array.isArray(r.body))
    const item = r.body.filter(item => item.id === 4096325)[0]
    assert("thanks" in item && "content" in item)
    assert(item.content.includes('站长辛苦了'))
  })

}) // /.describe

