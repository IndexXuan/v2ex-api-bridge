/**
 *  @Test 
 *  @module nodes#controller
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 03:26:56 PM CST
 */

'use strict'

const request = require('supertest')
const mock    = require('egg-mock')
const assert  = require('assert')

describe('test/app/controller/nodes.test.js', () => {

  // App
  let app
  before(() => {
    // 通过 `egg-mock` 快速创建一个应用实例
    app = mock.app()
    return app.ready()
  })

  // 每一个测试过后都重置mock app
  afterEach(mock.restore)

  it('1 should return all nodes', async () => {
    const r = await request(app.callback())
      .get('/api/v2/nodes/all')
      .expect(200)

    assert(Array.isArray(r.body))
    const vim = r.body.filter(item => item.id === 249)[0]
    assert(vim.name === 'vim')
    assert(vim.title === 'Vim')
    assert(vim.url.includes('v2ex.com/go/vim'))
  })

  it('2 should return node vim by id', async () => {
    const r = await request(app.callback())
      .get('/api/v2/nodes/id/249')
      .expect(200)

    assert(typeof r.body === 'object')
    const vim = r.body
    assert(vim.name === 'vim')
    assert(vim.title === 'Vim')
    assert(vim.url.includes('v2ex.com/go/vim'))
  })

  it('3 should return node vim by name', async () => {
    const r = await request(app.callback())
      .get('/api/v2/nodes/name/vim')
      .expect(200)

    assert(typeof r.body === 'object')
    const vim = r.body
    assert(vim.name === 'vim')
    assert(vim.title === 'Vim')
    assert(vim.url.includes('v2ex.com/go/vim'))
  })

  it('4 should validation failed for id', async () => {
    const r = await request(app.callback())
      .get('/api/v2/nodes/id/abc')
      .expect(422)

    const b = r.body
    assert(b.error.msg === 'Validation Failed')
    assert(b.detail[0].field === 'id')
  })

})

