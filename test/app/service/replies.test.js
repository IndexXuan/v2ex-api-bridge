/**
 *  @Test
 *  @Module replies#service
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 06:11:53 PM CST
 */

'use strict'

const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/service/replies.test.js', async () => {

  let app
  let ctx

  before(async () => {
    app = mock.app()
    await app.ready()
    ctx = app.mockContext()
  })

  after(() => app.close())
  afterEach(mock.restore)

  it('1 should get replies of topic', async () => {
    const replies = await ctx.service.replies.show({
      topic_id: 344499,
      page: 1,
      page_size: 20
    })

    const item = replies[0]
    assert("thanks" in item && "content" in item)
  })

}) // /.describe

