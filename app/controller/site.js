/**
 *  @Controller 
 *  @Module site
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 10 Mar 2017 02:18:42 PM CST
 */

'use strict'

module.exports = app => {
  return class SiteController extends app.Controller {
    /**
     * info
     * 返回站点信息
     *
     * @param {Object} ctx - 请求上下文
     * @returns {Promise} - @async
     */
    async info (ctx) {
      ctx.body = await ctx.service.site.info()
    }

    /**
     * stats
     * 返回站点状态
     *
     * @param {Object} ctx - 请求上下文
     * @returns {Promise} - @async
     */
    async stats (ctx) {
      ctx.body = await ctx.service.site.stats()
    }
  } // /.class=>SiteController
} // /.exports

