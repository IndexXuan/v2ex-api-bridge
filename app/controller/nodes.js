/**
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 10 Mar 2017 02:49:54 PM CST
 */

/**
 *  @Controller
 *  @module Nodes
 */

'use strict'

module.exports = app => {
  return class NodesController extends app.Controller {
    /**
     * all
     * 返回全部节点
     *
     * @param {Object} ctx - 请求上下文
     * @returns {Promise}－@async
     */
    async all (ctx) {
      ctx.body = await ctx.service.nodes.all()
    }

    /**
     * show
     * 返回一个特定节点信息
     * @oneof: [ 'id', 'name' ]
     *
     * @param {Object} ctx - 请求上下文
     * @returns {Promise}－@async
     */
    async show (ctx) {
      // validator
      ctx.validate({
        id: { type: 'id', required: false },
        name: { type: 'string', required: false }
      }, ctx.params)

      ctx.body = await ctx.service.nodes.show(ctx.params)
    }
  } // /.class=>NodesController
} // /.exports

