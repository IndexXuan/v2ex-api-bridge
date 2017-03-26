/**
 *  @Service
 *  @Module nodes
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 10 Mar 2017 02:41:56 PM CST
 */

'use strict'

module.exports = app => {
  return class NodeService extends app.Service {
    /**
     * @Constructor
     * 构造器
     *
     * @param {Object} ctx - 请求上下文
     */
    constructor (ctx) {
      super(ctx)
      this.root = `${app.config.root}/nodes`
    }

    /**
     * request
     * 封装统一的请求方法
     *
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
     *
     * @async
     * @returns {Promise} - @async
     */
    async all () {
      const result = await this.request('all')

      this.checkSuccess(result)
      return result.data
    }

    /**
     * show
     * 获取某节点信息
     *
     * @param params
     *
     * @async
     * @returns {Promise} - @async
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
     *
     * @param {Object} result - 要检查的数据
     */
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

