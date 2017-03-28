/**
 *  @Test
 *  @module members#service
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 03:57:18 PM CST
 */

'use strict'

const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/service/members.test.js', async () => {

  let app
  let ctx

  before(async () => {
    app = mock.app()
    await app.ready()
    ctx = app.mockContext()
  })

  after(() => app.close())
  afterEach(mock.restore)

  it('1 should get member info by id', async () => {
    const member = await ctx.service.members.show({ id: 105309 })
    assert(member.status === 'found')
    assert(member.id === 105309)
    assert(member.username === 'IndexXuan')
  })

  it('2 should get member info by username', async () => {
    const member = await ctx.service.members.show({ username: 'IndexXuan' })
    assert(member.status === 'found')
    assert(member.id === 105309)
    assert(member.username === 'IndexXuan')
  })

}) // /.describe

