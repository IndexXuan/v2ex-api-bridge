/**
 *  @Service
 *  @Module repies
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 05:35:26 PM CST
 */

module.exports = app => {

  return class RepiesService extends app.Service {

    /**
     * constructor
     * @Constructor
     *
     * @param {Object} ctx - 请求的上下文对象
     */
    constructor (ctx) {
      super(ctx)
      this.root = `${app.config.root}/replies`
      // 请求需要的一次性签名
      this.once = ''
    }

    /**
     * request
     *
     * @param {String} query - 请求参数
     * @param {Object} opts - 请求选项
     * @returns {Promise}
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
     * @returns {Promise}
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
     * @returns {Promise}
     */
    getOnce(content) {
      const onceRe = /value=\"(\d+)\" name="once"/
      const onces = onceRe.exec(content)
      if (onces && onces[1]) {
        this.once = onces[1]
      }
    }

    /**
     * create
     * 创建一个回复
     *
     * @param {Object} params - 参数
     * @returns {Promise}
     */
    async create (params) {
      const session = this.ctx.sessionid
      const token = this.ctx.token
      const headers = Object.assign(this.ctx.commonHeaders, { Cookie: `${session}; ${token}` })

      // 进入创建页，获取once
      const url = `https://www.v2ex.com/t/${params.topic_id}`
      const r = await this.ctx.curl(url, {
        method: 'get',
        timeout: [ '30s', '30s' ],
        headers: headers,
        dataType: 'text'
      })

      this.getOnce(r.data)

      // 设置请求参数
      const data = Object.assign(params, { once: this.once }, { content: params.content })

      const result = await this.ctx.curl(url, {
        method: 'post',
        dataType: 'text',
        headers: headers,
        data: data
      })

      const success = result && result.res && result.res.requestUrls && result.res.requestUrls[0]
      return {
        result: !!success,
        msg: !!success ? 'ok' : 'error',
        url: success
      } 
    }

  } // /.class=>RepiesService

}
