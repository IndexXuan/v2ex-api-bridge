/**
 *  @Test
 *  @Module site#controller
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 11:12:44 AM CST
 */

'use strict'

const request = require('supertest')
const mock    = require('egg-mock')
const assert  = require('assert')

describe('test/app/controller/site.test.js', () => {

  // App
  let app
  before(() => {
    // 通过 `egg-mock` 快速创建一个应用实例
    app = mock.app()
    return app.ready()
  })

  // 每一个测试过后都重置mock app
  afterEach(mock.restore)

  it('1 should return site info', async () => {
    const r = await request(app.callback())
      .get('/api/v2/site/info')
      .expect(200)

    assert(typeof r.body === 'object')
    assert(
      r.body.title === 'V2EX' &&
      r.body.slogan === 'way to explore' &&
      r.body.description === '创意工作者们的社区' &&
      r.body.domain === 'www.v2ex.com'
    )
  })

  it('2 should return site stats', async () => {
    const r = await request(app.callback())
      .get('/api/v2/site/stats')
      .expect(200)

    assert('topic_max' in r.body)
    assert('member_max' in r.body)
    assert(typeof r.body['topic_max'] === 'number')
  })

}) // /.describe

