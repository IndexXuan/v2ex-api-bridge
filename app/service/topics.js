/**
 *  @Service topic
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 03 Mar 2017 03:31:22 PM CST
 */

'use strict'

module.exports = app => {
  return class TopicsService extends app.Service {
    /**
     * @Constructor
     * 构造器
     *
     * @param {Object} ctx - 请求的上下文
     */
    constructor (ctx) {
      super(ctx)
      this.root = `${app.config.root}/topics`
      // 默认有权限，后面会判断
      this.auth = true 
      // 请求需要的一次性签名
      this.once = ''
    }

    /**
     * request
     * 封装统一的请求方法
     *
     * @param {String} query - 请求参数
     * @param {Object} opts - 请求选项
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
     * latest
     * 获取最新的topics
     *
     * @returns {Promise} - @async
     */
    async latest () {
      const result = await this.request('latest')
      this.checkSuccess(result)
      return result.data
    }

    /**
     * hot
     * 获取最热的topics
     *
     * @returns {Promise} - @async
     */
    async hot () {
      const result = await this.request('hot')
      this.checkSuccess(result)
      return result.data
    }

    /**
     * show
     * 获取一篇topic
     *
     * @param {Object} params - 参数
     * @returns {Promise} - @async
     */
    async show (params) {
      const result = await this.request('show', {
        data: params
      })
      this.checkSuccess(result)
      return result.data
    }

    /**
     * getAllByType
     * 根据类型获取其全部topics enums: [ username, node_name, node_id ]
     *
     * @param {Object} params - 参数
     * @returns {Promise} - @async
     */
    async getAllByType (params) {
      const data = {}
      data[params.type] = params.value
      data.page = params.page
      const result = await this.request('show', {
        data: data
      })
      this.checkSuccess(result)
      return result.data
    }

    /**
     * getOnce
     * 获取一次性签名的工具方法
     *
     * @param {String} content - 需要解析的内容
     */
    getOnce(content) {
      const onceRe = /name="once" value=\"(\d+)/
      const onces = onceRe.exec(content)
      if (onces && onces[1]) {
        this.once = onces[1]
      }
    }

    /**
     * create
     * 创建一篇topic
     *
     * @param {Object} params - 参数
     * @returns {Object} - @async
     */
    async create (params) {
      // step1 获取准备数据
      const session = this.ctx.sessionid
      const token = this.ctx.token
      const headers = Object.assign({}, this.ctx.commonHeaders, { Cookie: `${session}; ${token};` })

      if (session.includes('undefined')) {
        this.auth = false 
      }

      // @step2 进入创建页，获取once
      const url = 'https://www.v2ex.com/new'
      const r = await this.ctx.curl(url, {
        method: 'get',
        timeout: [ '30s', '30s' ],
        headers: headers,
        dataType: 'text'
      })

      // @step3 解析得到once
      this.getOnce(r.data)

      // @step4 设置请求参数, 模仿真实的传送两遍content
      const data = Object.assign(params, { once: this.once }, { content: params.content })

      // @step5 发起请求
      const result = await this.ctx.curl(url, {
        method: 'post',
        dataType: 'text',
        headers: headers,
        data: data
      })

      // @step6 设置API返回值
      const success = this.auth && result && result.res && result.res.requestUrls && result.res.requestUrls[0]
      const msg = !this.auth ? '请先登录再发帖' : success ? 'ok' : '发帖未知错误'
      return {
        result: !!success && this.auth,
        msg: msg,
        url: success
      } 
    }

    /**
     * checkSuccess
     * 封装统一的调用检查函数
     *
     * @param {Object} result - 要检查的对象
     */
    checkSuccess (result) {
      if (result.status !== 200) {
        const errorMsg = result.data && result.data.message
          ? `V2EX API REMOTE SERVER: ${result.data.message}`
          : 'unknown error in checkSuccess@topics.service'
        this.ctx.throw(result.status, errorMsg)
      }
      if (result.data.status === 'error') {
        // 远程调用返回格式错误
        this.ctx.throw(500, 'remote response error', { data: result.data, message: result.data.message })
      }
    }
  } // /.class=>TopicsController
} // /.exports

