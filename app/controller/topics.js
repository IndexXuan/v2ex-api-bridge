/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 03 Mar 2017 03:23:34 PM CST
 */

/**
 * @module TopicsController
 */

'use strict'

module.exports = app => {
  /**
   * @class TopicsController
   * @extends app.Controller
   */
  return class TopicsController extends app.Controller {
    /**
     * 获取最新topics
     * @method
     * @returns {Array<Object>}
     */
    async latest () {
      const { ctx } = this
      ctx.body = await ctx.service.topics.latest()
    }
    /**
     * 获取最热topics
     * @method
     * @returns {Array<Object>}
     */
    async hot () {
      const { ctx } = this
      ctx.body = await ctx.service.topics.hot()
    }

    /**
     * 获取特定一个topics
     * @method
     * @returns {Object}
     */
    async show () {
      const { ctx } = this
      // validator
      ctx.validate({
        id: { type: 'id', required: true }
      }, ctx.params)

      ctx.body = await ctx.service.topics.show(ctx.params)
    }

    /**
     * 按照类型获取全部topics
     * @method
     * @returns {Array<Object>}
     */
    async getAllByType () {
      const { ctx } = this
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
     * 创建topic
     * @method
     * @returns {Object}
     */
    async create () {
      const { ctx } = this
      ctx.validate({
        title: { type: 'string', required: true },
        content: { type: 'string', required: true },
        node_name: { type: 'string', required: true }
      }, ctx.query)

      ctx.body = await ctx.service.topics.create(ctx.query)
    }
  } // /.class=>TopicsController
} // /.exports

