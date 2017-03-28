/**
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 10 Mar 2017 03:21:40 PM CST
 */

/**
 *  @Controller
 *  @module Members
 */

'use strict'

module.exports = app => {
  return class MembersController extends app.Controller {
    /**
     * show
     * 查看一个成员信息
     *
     * @param {Object} ctx - 请求上下文
     * @returns {Promise} - @async
     */
    async show (ctx) {
      ctx.validate({
        username: { type: 'string', required: false },
        id: { type: 'id', required: false } 
      }, ctx.params)

      ctx.body = await ctx.service.members.show(ctx.params)
    }
  } // /.class=>MemberController
} // /.exports

