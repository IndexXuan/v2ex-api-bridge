/**
 *  @Service topic
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 03 Mar 2017 03:31:22 PM CST
 */

module.exports = app => {
  return class TopicsService extends app.Service {

    constructor (ctx) {
      super(ctx)
      this.root = `${app.config.root}/topics`

      this.once = 12345

      this.commonHeaders = {
        "Accept": "text/html,application/xhtml+xml,application/xml",
        "Origin": "https://www.v2ex.com",
        "Referer": "https://www.v2ex.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
      }

      this.commonCookies = {
        tab: 'V2EX_TAB="2|1:0|10:1489746039|8:V2EX_TAB|8:dGVjaA==|b72b63fabe0f8faeff147ac38e26299655d713ad1880feef6679b56d8d1e9f47"',
        others: 'V2EX_LANG=zhcn; _ga=GA1.2.1254455933.1474272858; _gat=1'
      }

      // sessionid cookie name 
      this.sessionCookieName = 'PB3_SESSION'

      // token cookie name 
      this.tokenCookieName =  'A2'
    }

    async request (query, opts) {
      const url = `${this.root}/${query}.json`
      opts = Object.assign({
        timeout: [ '30s', '30s' ],
        dataType: 'json'
      }, opts)
      return await this.ctx.curl(url, opts)
    }

    async latest () {
      const result = await this.request('latest')

      this.checkSuccess(result)
      return result.data
    }

    async hot () {
      const result = await this.request('hot')

      this.checkSuccess(result)
      return result.data
    }

    async show (params) {
      const result = await this.request('show', {
        data: params
      })

      this.checkSuccess(result)
      return result.data
    }

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

    getOnce(content) {
      const onceRe = /name="once" value=\"(\d+)/
      const onces = onceRe.exec(content)
      if (onces && onces[1]) {
        this.once = onces[1]
      }
    }

    /**
     * enterCreatePage
     * 进入创建新主题页面
     *
     * @returns {Promise}
     */
    async enterCreatePage () {
    }

    async create (params) {
      const token = `${this.tokenCookieName}=${this.ctx.cookies.get(this.tokenCookieName)}`
      const session = `${this.sessionCookieName}=${this.ctx.cookies.get(this.sessionCookieName)}`
      const headers = Object.assign(this.commonHeaders, { Cookie: `${session}; ${token}` })

      // 进入创建页，获取once
      const url = 'https://www.v2ex.com/new'
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

    // 封装统一的调用检查函数，可以在查询，创建和更新等 service 中复用
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

  } // /.class=>TopicsController
}

