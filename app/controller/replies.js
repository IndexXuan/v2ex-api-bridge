/**
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 05:28:59 PM CST
 */

/**
 * @module ReplieController
 */

'use strict'

module.exports = app => {
  /**
   * @class RepliesController
   * @extends app.Controller
   */
  return class RepliesController extends app.Controller {
    /**
     * 获取某个topics下的全部回复 
     * @method
     * @returns {Array<Object>}
     */
    async show () {
      const { ctx } = this
      ctx.validate({
        topic_id: { type: 'id', required: true }
      }, ctx.params)

      ctx.params = Object.assign(ctx.params, ctx.query)
      ctx.body = await ctx.service.replies.show(ctx.params)
    }

    /**
     * 创建回复
     * @method
     * @returns {Object}
     */
    async create () {
      const { ctx } = this
      ctx.validate({
        topic_id: { type: 'id', required: true }
      }, ctx.params)

      ctx.params = Object.assign(ctx.params, ctx.query)
      ctx.body = await ctx.service.replies.create(ctx.params)
    }
  } // /.class=>RepliesController
} // /.exports


