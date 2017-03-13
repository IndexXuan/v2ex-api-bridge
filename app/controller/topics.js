/**
 *  @Controller
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
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
      ctx.body = await ctx.service.topics.show(ctx.params)
    }

    async getAllByType (ctx) {
      ctx.validate({
        username: { type: 'string', required: false },
        node_name: { type: 'string', required: false },
        node_id: { type: 'string', required: false }
      }, ctx.params)

      ctx.params = Object.assign(ctx.params, { page: ctx.query.page || 1 })
      ctx.body = await ctx.service.topics.getAllByType(ctx.params)
    }

  } // /.class=>TopicsController

}

