/**
 *  @Test
 *  @Module topics@service
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 04:22:09 PM CST
 */


const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/service/topics.test.js', async () => {

  let app
  let ctx

  before(async () => {
    app = mock.app()
    await app.ready()
    ctx = app.mockContext()
  })

  after(() => app.close())
  afterEach(mock.restore)

  it('1 should get latest topics', async () => {
    const info = await ctx.service.topics.latest()
    const item = info[0]
    assert("id" in item && "title" in item && "content" in item)
    assert(typeof item.id === 'number')
  })

  it('2 should get hot topics', async () => {
    const info = await ctx.service.topics.hot()
    const item = info[0]
    assert("id" in item && "title" in item && "content" in item)
    assert(typeof item.id === 'number')
  })

  it('3 should get target topic', async () => {
    const topic = await ctx.service.topics.show({ id: 346957 })
    const item = topic[0]
    assert(item.id === 346957)
    assert(item.title === '震惊！ 2017 金三银四爆冷！投百份简历竟无一面试通知！')
    assert(item.content.includes('好吧，其实我是来求职的'))
  })

  it('4 should get all topics by username Livid', async () => {
    const topics = await ctx.service.topics.getAllByType({ type: 'username', value: 'Livid' })
    const item = topics.filter(item => item.id === 344499)[0]
    assert(item.id === 344499)
    assert(item.content.includes('北京时间'))
    assert(item.created === 1488488531)
  })

  it('5 should get all topics by node_name', async () => {
    const topics = await ctx.service.topics.getAllByType({ type: 'node_name', value: 'vim' })
    const item = topics.filter(item => item.id === 344868)[0]
    if (item) {
      assert(item.id === 344868)
      assert(item.title === '比 deoplete 更快！比 YCM 更轻！支持 neovim/vim8 的自动补全框架！')
      assert(item.content.includes('一大波'))
    }
  })

  it('6 should get all topics by node_id', async () => {
    const topics = await ctx.service.topics.getAllByType({ type: 'id', value: 249 })
    const item = topics.filter(item => item.id === 344868)[0]
    if (item) {
      assert(item.id === 344868)
      assert(item.title === '比 deoplete 更快！比 YCM 更轻！支持 neovim/vim8 的自动补全框架！')
      assert(item.content.includes('一大波'))
    }
  })

}) // /.describe

