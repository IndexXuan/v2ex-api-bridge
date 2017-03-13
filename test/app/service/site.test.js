/**
 *  @Test
 *  @Module site@service
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 03:41:31 PM CST
 */

const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/service/site.test.js', async () => {

  let app
  let ctx

  before(async () => {
    app = mock.app()
    await app.ready()
    ctx = app.mockContext()
  })

  after(() => app.close())
  afterEach(mock.restore)

  it('1 should get site info', async () => {
    const info = await ctx.service.site.info()
    assert(info.title === 'V2EX')
    assert(info.slogan === 'way to explore')
  })

  it('2 should get site stats', async () => {
    const info = await ctx.service.site.stats()
    assert("topic_max" in info && "member_max" in info)
    assert(typeof info.topic_max === 'number')
  })

}) // /.describe

