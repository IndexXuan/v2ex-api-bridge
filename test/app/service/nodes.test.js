/**
 *  @Test
 *  @Module nodes#service
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 04:04:02 PM CST
 */

'use strict'

const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/service/nodes.test.js', async () => {

  let app
  let ctx

  before(async () => {
    app = mock.app()
    await app.ready()
    ctx = app.mockContext()
  })

  after(() => app.close())
  afterEach(mock.restore)

  it('1 should get all nodes', async () => {
    const nodes = await ctx.service.nodes.all()
    assert(Array.isArray(nodes))
    const vim = nodes.filter(item => item.id === 249)[0]
    assert(vim.name === 'vim')
    assert(vim.title === 'Vim')
    assert(vim.url.includes('v2ex.com/go/vim'))
  })

  it('2 should get vim by id', async () => {
    const vim = await ctx.service.nodes.show({ id: 249 })
    assert(vim.name === 'vim')
    assert(vim.title === 'Vim')
    assert(vim.url.includes('v2ex.com/go/vim'))
  })

  it('3 should get vim by node_name', async () => {
    const vim = await ctx.service.nodes.show({ name: 'vim' })
    assert(vim.name === 'vim')
    assert(vim.title === 'Vim')
    assert(vim.url.includes('v2ex.com/go/vim'))
  })

}) // /.describe

