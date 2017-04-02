/**  
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Wed 29 Mar 2017 11:52:34 AM CST
 */

/**
 * @module ProfileController
 */

'use strict'

/* istanbul ignore next */
module.exports = app => {
  /**
   * @class ProfileController
   * @extends app.Controller
   */
  return class ProfileController extends app.Controller {
    /**
     * @constructor
     * @param {Objet} ctx - 请求上下文
     */
    constructor (ctx) {
      super(ctx)
    }

    /**
     * 聚合全部的主题，回复，收支，消息等信息
     * @method
     * @returns {Object}
     */
    async all () {
      const { ctx } = this
      ctx.body = await ctx.serivce.profile.all()
    }

    /**
     * 全部主题
     * @method
     * @returns {Array<Object>}
     */
    async topics () {
      const { ctx } = this
      const username = this.user
      if (username) {
        ctx.body = await ctx.service.topics.getAllByType({ username })
      } else {
        ctx.body = '请先登录'
      }
    }

    /**
     * 全部回复
     * @method
     * @returns {Array<Object>}
     */
    async replies () {
      const { ctx } = this
      ctx.body = await ctx.service.profile.replies()
    }

    /**
     * 财富收支
     * @method
     * @returns {Array<Object>}
     */
    async balance () {
      const { ctx } = this
      ctx.body = await ctx.service.profile.balance()
    }

    /**
     * 消息通知
     * @method
     * @returns {Array<Object>}
     */
    async notification () {
      const { ctx } = this
      ctx.body = await ctx.service.profile.notification()
    }
  } // /.class=>ProfileController
} // /.exports

