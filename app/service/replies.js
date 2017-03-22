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

    constructor (ctx) {
      super(ctx)
      this.root = `${app.config.root}/replies`

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

    async show (params) {
      const result = await this.request('show', {
        data: params
      })

      return result.data
    }

    getOnce(content) {
      const onceRe = /value=\"(\d+)\" name="once"/
      const onces = onceRe.exec(content)
      if (onces && onces[1]) {
        this.once = onces[1]
      }
    }

    async create (params) {
      const token = `${this.tokenCookieName}=${this.ctx.cookies.get(this.tokenCookieName)}`
      const session = `${this.sessionCookieName}=${this.ctx.cookies.get(this.sessionCookieName)}`
      const headers = Object.assign(this.commonHeaders, { Cookie: `${session}; ${token}` })

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
