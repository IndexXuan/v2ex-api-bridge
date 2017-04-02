/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 10 Mar 2017 02:41:56 PM CST
 */

/**
 *  @module NodesService
 */

'use strict'

module.exports = app => {
  /**
   * @class NodesService
   * @extends app.Service
   */
  return class NodeService extends app.Service {
    /**
     * @constructor
     * @param {Object} ctx - 请求上下文
     */
    constructor (ctx) {
      super(ctx)
      this.root = `${app.config.root}/nodes`
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
     * all
     * 获取全部节点
     * @method
     * @returns {Object}
     */
    async all () {
      const result = await this.request('all')

      this.checkSuccess(result)
      return result.data
    }

    /**
     * show
     * 获取某节点信息
     * @method
     * @param params
     * @returns {Object}
     */
    async show (params) {
      const data = {}
      if (params.id) {
        data.id = params.id
      }
      if (params.name) {
        data.name = params.name
      }
      const result = await this.request('show', {
        data: data
      })

      this.checkSuccess(result)
      return result.data
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
  } // /.class=>NodeService
} // /.exports

