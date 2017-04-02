/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 10 Mar 2017 02:20:58 PM CST
 */

/**
 *  @module SiteService
 */

'use strict'

module.exports = app => {
  /**
   * @class SiteService
   * @extends app.Service
   */
  return class SiteService extends app.Service {
    /**
     * @constructor
     * @param {Object} ctx - 请求上下文
     */
    constructor (ctx) {
      super(ctx)
      this.root = `${app.config.root}/site`
    }

    /**
     * request
     * 封装统一的请求方法
     * @member
     * @param {String} query - 请求参数
     * @param {Object} opts - 请求参数
     * @returns {Promise} - @async
     */
    async request (query, opts) {
      const url = `${this.root}/${query}.json`
      opts = Object.assign({
        timeout: [ '30s', '30s' ],
        dataType: 'json'
      }, opts)

      return await this.ctx.curl(url, opts)
    }

    /**
     * info
     * 获取站点信息
     * @method
     * @returns {Promise|Object}
     */
    async info () {
      const result = await this.request('info')

      this.checkSuccess(result)
      return result.data
    }

    /**
     * stats
     * 获取站点状态
     * @method
     * @returns {Promise|Object}
     */
    async stats () {
      const result = await this.request('stats')

      this.checkSuccess(result)
      return result.data
    }

    /**
     * 抓取财富榜
     * @method
     * @returns {Promise|Object}
     */
    async topRich () {
      return 'todo'
    }

    /**
     * 抓取消费榜
     * @method
     * @returns {Promise|Object}
     */
    async topPlayer () {
      return 'todo'
    }

    /**
     * checkSuccess
     * 封装统一的调用检查函数
     * @member
     * @param {Object} result - 要检查的数据
     */
    /* istanbul ignore next */
    checkSuccess (result) {
      if (result.status !== 200) {
        const errorMsg = result.data && result.data.message
          ? `V2EX API REMOTE SERVER: ${result.data.message}`
          : 'unknown error'
        this.ctx.throw(result.status, errorMsg)
      }
      if (result.data.status === 'error') {
        // 远程调用返回格式错误
        this.ctx.throw(500, 'remote response error', { data: result.data, message: result.data.message })
      }
    }
  } // /.class=>SiteSerivce
} // /.exports

