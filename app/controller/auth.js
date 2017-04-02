/**  
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Tue 14 Mar 2017 03:15:19 PM CST
 */

/**
 * @module AuthController
 */

'use strict'

module.exports = app => {
  /**
   * @class AuthController
   * @extends app.Controller
   */
  return class AuthController extends app.Controller {
    /**
     * 登录
     * @returns {Object}
     */
    async login () {
      const { ctx } = this
      const { username, password } = ctx.query
      if (username == null) {
        throw new Error('请传入用户名')
      }
      if (password == null) {
        throw new Error('请传入密码')
      }
      ctx.body = await ctx.service.auth.login({username, password})
    }

    /**
     * 签到
     * @returns {Object}
     */
    async signin () {
      const { ctx } = this
      ctx.body = await ctx.service.auth.signin(ctx.query)
    }
  } // /.class=>AuthController
} // /.exports

