/**
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 10 Mar 2017 02:49:54 PM CST
 */

/**
 * @module NodesController
 */

'use strict'

module.exports = app => {
  /**
   * @class NodesController
   * @extends app.Controller
   */
  return class NodesController extends app.Controller {
    /**
     * 全部节点 
     * @method
     * @returns {Array<Object>}
     */
    async all () {
      const { ctx } = this
      ctx.body = await ctx.service.nodes.all()
    }
    /**
     * show
     * @method
     * @returns {Object}
     */
    async show () {
      const { ctx } = this
      // validator
      ctx.validate({
        id: { type: 'id', required: false },
        name: { type: 'string', required: false }
      }, ctx.params)

      ctx.body = await ctx.service.nodes.show(ctx.params)
    }
  } // /.class=>NodesController
} // /.exports

