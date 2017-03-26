/**
 *  @Test
 *  @Module topics#controller
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 11:26:49 AM CST
 */

'use strict'

const request = require('supertest')
const mock    = require('egg-mock')
const assert  = require('assert')

describe('test/app/controller/topics.test.js', () => {

  // App
  let app
  before(() => {
    // 通过 `egg-mock` 快速创建一个应用实例
    app = mock.app()
    return app.ready()
  })

  // 每一个测试过后都重置mock app
  afterEach(mock.restore)

  it('1 should return latest topics', async () => {
    const r = await request(app.callback())
      .get('/api/v2/topics/latest')
      .expect(200)

    assert(Array.isArray(r.body))

    const item = r.body[0]
    assert("id" in item && "title" in item && "content" in item)
    assert(typeof item.id === 'number')
  })

  it('2 should return hot topics', async () => {
    const r = await request(app.callback())
      .get('/api/v2/topics/hot')
      .expect(200)

    assert(Array.isArray(r.body))

    const item = r.body[0]
    assert("id" in item && "title" in item && "content" in item)
    assert(typeof item.id === 'number')
  })

  it('3 should return target topic', async () => {
    const r = await request(app.callback())
      .get('/api/v2/topics/346957')
      .expect(200)

    assert(Array.isArray(r.body))
    assert(r.body.length === 1)

    const item = r.body[0]
    // assert("id" in item && "title" in item && "content" in item)
    // assert(typeof item.id === 'number')
    assert(item.title === '震惊！ 2017 金三银四爆冷！投百份简历竟无一面试通知！')
    assert(item.content.includes('好吧，其实我是来求职的'))
  })

  it('4 should return all Livid\'s topics', async () => {
    const r = await request(app.callback())
      .get('/api/v2/topics/all/username/Livid')
      .expect(200)

    assert(Array.isArray(r.body))
    const item = r.body.filter(item => item.id === 344499)[0]
    assert(item.id === 344499)
    assert(item.created === 1488488531)
    assert(item.title === "20170303 - 关于大约持续了 16 个小时的登录问题")
  })

  it('5 should return all vim\'s topics by node_name', async () => {
    const r = await request(app.callback())
      .get('/api/v2/topics/all/node_name/vim')
      .expect(200)

    assert(Array.isArray(r.body))
    const item = r.body.filter(item => item.id === 344868)[0]
    if (item) {
      assert(item.id === 344868)
      assert(item.title === '比 deoplete 更快！比 YCM 更轻！支持 neovim/vim8 的自动补全框架！')
      assert(item.content.includes('一大波'))
    }
  })

  it('6 should return all vim\'s topics by node_id', async () => {
    const r = await request(app.callback())
      .get('/api/v2/topics/all/node_id/249')
      .expect(200)

    assert(Array.isArray(r.body))
    const item = r.body.filter(item => item.id === 344868)[0]
    if (item) {
      assert(item.id === 344868)
      assert(item.title === '比 deoplete 更快！比 YCM 更轻！支持 neovim/vim8 的自动补全框架！')
      assert(item.content.includes('一大波'))
    }
  })

  it('6 should return all vim\'s topics by node_id', async () => {
    const r = await request(app.callback())
      .get('/api/v2/topics/all/node_id/249')
      .expect(200)

    assert(Array.isArray(r.body))
    const item = r.body.filter(item => item.id === 344868)[0]
  })

  it('7 should validation failed for enum type when get all topics', async () => {
    const r = await request(app.callback())
      .get('/api/v2/topics/all/not_node_name/vim')
      .expect(422)

    const b = r.body
    assert(b.error.msg === 'Validation Failed')
    assert(b.detail[0].message.includes('one of'))
    assert(b.detail[0].field === 'type')
  })

}) // /.describe

