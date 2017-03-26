/**
 *  @Controller
 *  @Module replies
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 05:28:59 PM CST
 */

'use strict'

module.exports = app => {
  return class RepiesController extends app.Controller {
    /**
     * show
     * 返回一个topic下的全部回复
     *
     * @param {Objet} ctx - 请求上下文
     * @returns {Promise} - @async
     */
    async show (ctx) {
      ctx.validate({
        topic_id: { type: 'id', required: true }
      }, ctx.params)

      ctx.params = Object.assign(ctx.params, ctx.query)
      ctx.body = await ctx.service.replies.show(ctx.params)
    }

    /**
     * create
     * 创建一个topic下的最新回复
     *
     * @param {Object} ctx - 请求上下文
     * @returns {Promise} - @async
     */
    async create (ctx) {
      ctx.validate({
        topic_id: { type: 'id', required: true }
      }, ctx.params)

      ctx.params = Object.assign(ctx.params, ctx.query)
      ctx.body = await ctx.service.replies.create(ctx.params)
    }
  } // /.class=>RepiesController
} // /.exports

