/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 03 Mar 2017 03:31:22 PM CST
 */

/**
 *  @module TopicsService
 */

'use strict'

module.exports = app => {
  /**
   * @class TopicsService
   * @extends app.Service
   */
  return class TopicsService extends app.Service {
    /**
     * @constructor
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
     * @member
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
     * @method
     * @returns {Promise|Object}
     */
    async latest () {
      const result = await this.request('latest')
      this.checkSuccess(result)
      return result.data
    }

    /**
     * hot
     * 获取最热的topics
     * @method
     * @returns {Promise|Array<Object>}
     */
    async hot () {
      const result = await this.request('hot')
      this.checkSuccess(result)
      return result.data
    }

    /**
     * show
     * 抓取一篇topic
     * @method
     * @param {Object} params - 参数
     * @returns {Promise|Object}
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
     * @method
     * @param {Object} params - 参数
     * @returns {Promise|Array<Object>}
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
     * @member
     * @param {String} content - 需要解析的内容
     */
    getOnce(content) {
      const onceRe = /name="once" value=\"(\d+)/
      const onces = onceRe.exec(content)
      /* istanbul ignore next */
      if (onces && onces[1]) {
        this.once = onces[1]
      }
    }

    /**
     * create
     * 创建一篇topic
     * @method
     * @param {Object} params - 参数
     * @returns {Promise|Object}
     */
    async create (params) {
      // step1 获取准备数据
      const session = this.ctx.sessionid
      const token = this.ctx.token
      const { tab, others } = this.ctx.commonCookies
      const headers = Object.assign({}, this.ctx.commonHeaders, { 
        Cookie: `${session}; ${token}; ${tab}; ${others}`
      })

      /* istanbul ignore else */
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

      // @step4 设置请求参数
      const data = Object.assign(params, { once: this.once })

      // @step5 发起请求
      const result = await this.ctx.curl(url, {
        method: 'post',
        dataType: 'text',
        headers: headers,
        data: data
      })

      // @step6 设置API返回值
      let success = false 
      let topicUrl = ''
      /* istanbul ignore next */
      if (result && result.headers && result.headers.location) {
        topicUrl = `https://www.v2ex.com${result.headers.location}`
      }
      let msg = !this.auth ? '请先登录再发帖' : !!topicUrl ? 'ok' : '发帖未知错误'
      // parser error msg
      let problems = result.data.match(/class="problem"\>.*\<\/div>/)
      let problem = problems && problems[0]
      // 好牛逼的HTML标签正则, https://segmentfault.com/q/1010000008733200?_ea=1734789
      const tagRe = /<("[^"]*"|'[^']*'|[^'">])*>/g 
      const errorMsg = problem && problem.replace(tagRe, '').replace(/class=".*">/, '')
      /* istanbul ignore next */
      if (errorMsg) {
        msg = errorMsg || `${result.status}，可能是过于频繁操作`
        success = false
      } else {
        success = true
      }
      return {
        result: this.auth && success,
        msg: msg,
        url: topicUrl,
        detail: app.config.env === 'prod' ? '' : result
      } 
    }

    /**
     * checkSuccess
     * 封装统一的调用检查函数
     * @member
     * @param {Object} result - 要检查的对象
     */
    /* istanbul ignore next */
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

