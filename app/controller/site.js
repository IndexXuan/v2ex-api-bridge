/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 10 Mar 2017 02:18:42 PM CST
 */

/**
 * @module SiteController
 */

'use strict'

module.exports = app => {
  /**
   * @class SiteController
   * @extends app.Controller
   */
  return class SiteController extends app.Controller {
    /**
     * 站点信息
     * @method
     * @returns {Object}
     */
    async info () {
      const { ctx } = this
      ctx.body = await ctx.service.site.info()
    }

    /**
     * 获取站点状态
     * @method
     * @returns {Object}
     */
    async stats () {
      const { ctx } = this
      ctx.body = await ctx.service.site.stats()
    }

    /**
     * 获取财富榜
     * @method
     * @returns {Array<Object>}
     */
    /* istanbul ignore next */
    async topRich () {
      const { ctx } = this
      ctx.body = await ctx.service.site.topRich()
    }

    /**
     * 获取消费榜
     * @method
     * @returns {Array<Object>}
     */
    /* istanbul ignore next */
    async topPlayer () {
      const { ctx } = this
      ctx.body = await ctx.service.site.topPlayer()
    }
  } // /.class=>SiteController
} // /.exports

