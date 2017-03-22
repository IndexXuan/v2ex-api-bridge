/**
 *  @Controller
 *  @Module topics
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 03 Mar 2017 03:23:34 PM CST
 */

/**
 * @Controller
 *
 * 1. 调用validate方法对请求参数进行验证
 * 2. 按照接口约定的格式设置响应状态码和内容
 */

module.exports = app => {
  return class TopicsController extends app.Controller {

    async latest (ctx) {
      ctx.body = await ctx.service.topics.latest()
    }

    async hot (ctx) {
      ctx.body = await ctx.service.topics.hot()
    }

    async show (ctx) {
      // validate
      ctx.validate({
        id: { type: 'id', required: true }
      }, ctx.params)

      ctx.body = await ctx.service.topics.show(ctx.params)
    }

    async getAllByType (ctx) {
      // validate the params
      ctx.validate({
        type: { type: 'enum', values: [ 'username', 'node_name', 'node_id' ], required: true },
        value: { type: 'string', required: true },
        page: { type: 'id', required: false }
      }, ctx.params)

      // set default page in controller
      ctx.params = Object.assign(ctx.params, { page: ctx.query.page || 1 })
      ctx.body = await ctx.service.topics.getAllByType(ctx.params)
    }

    async create (ctx) {
      ctx.validate({
        title: { type: 'string', required: true },
        content: { type: 'string', required: true },
        node_name: { type: 'string', required: true }
      }, ctx.query)

      ctx.body = await ctx.service.topics.create(ctx.query)
    }

  } // /.class=>TopicsController
}

