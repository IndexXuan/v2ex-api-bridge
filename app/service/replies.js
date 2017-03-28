/**
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 05:35:26 PM CST
 */

/**
 *  @Service
 *  @module Replies
 */

'use strict'

module.exports = app => {
  return class RepliesService extends app.Service {
    /**
     * @Constructor
     * 构造器
     *
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
     * show
     * 获取一个topic的全部回复
     *
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
     *
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
     *
     * @param {Object} params - 参数
     * @returns {Promise} - @async
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
      const success = result && result.res && result.res.requestUrls && result.res.requestUrls[0]
      const msg = !this.auth ? '请先登录再回帖' : success ? 'ok' : '回帖未知错误'
      return {
        result: !!success && this.auth,
        msg: msg,
        url: success
      } 
    }
  } // /.class=>RepliesService
} // /.exports


