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

'use strict'

module.exports = app => {
  return class TopicsController extends app.Controller {
    /**
     * latest
     * 返回最新topics
     *
     * @param {Object} ctx - 请求上下文
     * @returns {Promise} - @async
     */
    async latest (ctx) {
      ctx.body = await ctx.service.topics.latest()
    }

    /**
     * hot
     * 返回最热topics
     *
     * @param {Object} ctx - 请求上下文
     * @returns {Promise} - @async
     */
    async hot (ctx) {
      ctx.body = await ctx.service.topics.hot()
    }

    /**
     * show
     * 返回一个特定topics
     *
     * @param {Object} ctx - 请求上下文
     * @returns {Promise}－@async
     */
    async show (ctx) {
      // validator
      ctx.validate({
        id: { type: 'id', required: true }
      }, ctx.params)

      ctx.body = await ctx.service.topics.show(ctx.params)
    }

    /**
     * getAllByType
     * 返回一个类型下的所有topics
     * @enums: [ 'username', 'node_name', 'node_id' ]
     *
     * @param {Object} ctx - 请求上下文
     * @returns {Promise}－@async
     */
    async getAllByType (ctx) {
      // validator
      ctx.validate({
        type: { type: 'enum', values: [ 'username', 'node_name', 'node_id' ], required: true },
        value: { type: 'string', required: true },
        page: { type: 'id', required: false }
      }, ctx.params)

      // set default page in controller
      ctx.params = Object.assign(ctx.params, { page: ctx.query.page || 1 })
      ctx.body = await ctx.service.topics.getAllByType(ctx.params)
    }

    /**
     * create
     * 创建一个topic,返回创建结果
     *
     * @param ctx
     * @returns {Promise} - @async
     */
    async create (ctx) {
      ctx.validate({
        title: { type: 'string', required: true },
        content: { type: 'string', required: true },
        node_name: { type: 'string', required: true }
      }, ctx.query)

      ctx.body = await ctx.service.topics.create(ctx.query)
    }
  } // /.class=>TopicsController
} // /.exports

