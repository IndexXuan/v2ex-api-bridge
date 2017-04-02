/**
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 10 Mar 2017 03:21:40 PM CST
 */

/**
 * @module MembersController
 */

'use strict'

module.exports = app => {
  /**
   * @class MembersController
   * @extends app.Controller
   */
  return class MembersController extends app.Controller {
    /**
     * show
     * @method
     * @returns {Object}
     */
    async show () {
      const { ctx } = this
      ctx.validate({
        username: { type: 'string', required: false },
        id: { type: 'id', required: false } 
      }, ctx.params)

      ctx.body = await ctx.service.members.show(ctx.params)
    }
  } // /.class=>MemberController
} // /.exports

