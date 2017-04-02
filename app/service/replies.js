/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 05:35:26 PM CST
 */

/**
 *  @module RepliesService
 */

'use strict'

module.exports = app => {
  /**
   * @class RepliesService
   * @extends app.Service
   */
  return class RepliesService extends app.Service {
    /**
     * @constructor
     * @param {Object} ctx - 请求的上下文
     */
    constructor (ctx) {
      super(ctx)
      this.root = `${app.config.root}/replies`
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
     * show
     * 获取一个topic的全部回复
     * @method
     * @param {Object} params - 参数
     * @returns {Promise} - @async
     */
    async show (params) {
      const result = await this.request('show', {
        data: params
      })
      return result.data
    }

    /**
     * getOnce
     * 获取一次性签名的工具方法
     * @member
     * @param {String} content - 需要解析的内容
     */
    getOnce(content) {
      const onceRe = /value=\"(\d+)\" name="once"/
      const onces = onceRe.exec(content)
      /* istanbul ignore next */
      if (onces && onces[1]) {
        this.once = onces[1]
      }
    }

    /**
     * create
     * 创建一个回复
     * @method
     * @param {Object} params - 参数
     * @returns {Promise}
     */
    async create (params) {
      // @step1 获取准备数据
      const session = this.ctx.sessionid
      const token = this.ctx.token
      const headers = Object.assign({}, this.ctx.commonHeaders, { Cookie: `${session}; ${token}` })

      /* istanbul ignore else */
      if (session.includes('undefined')) {
        this.auth = false 
      }

      // @step2 进入创建页，获取once
      const url = `https://www.v2ex.com/t/${params.topic_id}`
      const r = await this.ctx.curl(url, {
        method: 'get',
        timeout: [ '30s', '30s' ],
        headers: headers,
        dataType: 'text'
      })


      // @step3 获取once
      this.getOnce(r.data)

      // @step4 设置请求参数
      const data = Object.assign(params, { once: this.once }, { content: params.content })

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
      let msg = !this.auth ? '请先登录再回帖' : !!topicUrl ? 'ok' : '回帖未知错误'
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
  } // /.class=>RepliesService
} // /.exports


