/**
 *  @Service
 *  @Module auth
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Tue 14 Mar 2017 03:19:07 PM CST
 */

const setCookieParser = require('set-cookie-parser')

module.exports = app => {
  return class AuthService extends app.Service {

    /**
     * @constructor
     *
     * @param ctx
     */
    constructor (ctx) {
      super(ctx)
      this.commonHeaders = {
        "Accept": "text/html,application/xhtml+xml,application/xml",
        "Origin": "https://www.v2ex.com",
        "Referer": "https://www.v2ex.com/mission/daily",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
      }

      this.commonCookies = {
        tab: 'V2EX_TAB="2|1:0|10:1489746039|8:V2EX_TAB|8:dGVjaA==|b72b63fabe0f8faeff147ac38e26299655d713ad1880feef6679b56d8d1e9f47"',
        lang: 'V2EX_LANG=zhcn; _ga=GA1.2.1254455933.1474272858; _gat=1'
      }

      // sessionid
      this.sessionCookieName = 'PB3_SESSION'

      // token cookie name
      this.tokenCookieName =  'A2'

      // 首页url
      this.homeUrl = 'https://www.v2ex.com/'

      // 获取登陆签名
      this.loginUrl = 'https://www.v2ex.com/signin'
      this.sessionCookie = '' // 供 `login`接口放在Header里 `Set-Cookie` 使用
      // this.loginCookieArr = '' // get到的cookie暂存，供合并给最终的cookie
      this.userKey = '' // 用户名 输入框埋下的随机key
      this.passKey = '' // 密码   输入框埋下的随机key
      this.once = ''    // input[type="hidden"][name="once"]的随机令牌值(5位数字目前)

      // 签到领金币url
      this.signinUrl = 'https://www.v2ex.com/mission/daily'
    }

    /**
     * request
     * 封装统一的请求方法
     *
     * @param url
     * @param opts
     * @returns {Promise}
     */
    async request (url, opts) {
      opts = Object.assign({
        timeout: [ '30s', '30s' ],
      }, opts)

      return await this.ctx.curl(url, opts)
    }

    /**
     * enterHomePage
     * 请求首页来刷新sessionid cookie
     *
     * @returns {Promise}
     */
    async enterHomePage () {
      const result = await this.request(this.homeUrl, {
        method: 'GET',
        dataType: 'text',
        headers: this.commonHeaders
      }) 

      const cs = setCookieParser(result)
      cs.forEach(c => {
        this.ctx.cookies.set(c.name, c.value, {
          httpOnly: c.httpOnly,
          domain: '',
          path: c.path,
          expires: c.expires
        })
      })
    }

    /**
     * getLoginKeys
     * 获取登陆的各种凭证
     *
     * @param content
     */
    getLoginKeys (content) {
      var keyRe = /class="sl" name="([0-9A-Za-z]{64})"/g
      this.userKey = keyRe.exec(content)[1]
      this.passKey = keyRe.exec(content)[1]
      var onceRe = /value="(\d+)" name="once"/
      this.once = onceRe.exec(content)[1]
    }

    /**
     * enterLoginPage
     * login前的准备
     * 获取sessionid,获取userKey, passKey, once等
     *
     * @returns {Promise}
     */
    async enterLoginPage () {
      const result = await this.request(this.loginUrl, {
        method: 'GET',
        dataType: 'text',
        headers: this.commonHeaders
      }) 

      // 供发起login的header里使用
      this.sessionCookie = result.headers['set-cookie'][0]
      console.log('================================before login', this.sessionCookie)

      const cs = setCookieParser(result)

      return this.getLoginKeys(result.data)
    }

    /**
     * login
     * login获取签名主方法
     *
     * @param params
     */
    async login (params) {

      // @step1: 获取提交的用户名密码
      const { username, password } = params

      // 进入登陆页，获取页面隐藏登陆域以及once的值
      await this.enterLoginPage()

      // 设置请求选项
      const opts = {
        method: 'POST',
        headers: Object.assign(this.commonHeaders, { Cookie: this.sessionCookie }),
        data: {
          [this.userKey]: username,
          [this.passKey]: password,
          "once": this.once
        }
      }

      // 发起请求
      const result = await this.request(this.loginUrl, opts)

      // 获取cookies
      const cs = setCookieParser(result)
       
      // 更新session并设置在客户端
      const r = this.request(this.homeUrl)
      const session = setCookieParser(r)
      session.forEach(c => {
        this.ctx.cookies.set(c.name, c.value, {
          httpOnly: c.httpOnly,
          domain: '',
          path: c.path,
          expires: c.expires
        })
      })

      // 判断是否登陆成功并设置客户端cookies
      let success = false
      cs.forEach(c => {
        if (c.name === this.tokenCookieName) success = true
        this.ctx.cookies.set(c.name, c.value, {
          httpOnly: c.httpOnly,
          domain: '',
          path: c.path,
          expires: c.expires
        })
      })

      // 设置API返回结果
      return {
        result: success,
        msg: success ? 'success' : 'sorry! Not get enough token for you',
        data: {
          username: username
        }
      }
    }

    /**
     * getSigninOnce
     * 获取签到的once值
     *
     * @param content
     */
    getSigninOnce (content) {
      // update this.once
      try {
        const onceResult = content.match(/once=(\w*)/g)[1]
        this.once = onceResult.match(/once=(\w*)/)[1]
        console.log('once------------------------', this.once)
      } catch (e) {
        throw new Error('已经签到过了')
      }
    }

    /**
     * enterSigninPage
     * 进入签到页面，获取once值
     *
     * @returns {undefined}
     */
    async enterSigninPage () {
      await this.enterHomePage()

      const token = `${this.tokenCookieName}=${this.ctx.cookies.get(this.tokenCookieName)}`
      const session = `${this.sessionCookieName}=${this.ctx.cookies.get(this.sessionCookieName)}`
      const headers = Object.assign(this.commonHeaders, { Cookie: `${session}; ${token}` })
      const result = await this.request(this.signinUrl, {
        method: 'GET',
        dataType: 'text',
        headers: headers
      }) 

      return this.getSigninOnce(result.data)
    }

    /**
     * signin
     * 签到领金币
     *
     * @param params
     */
    async signin (params) {
      // 进入签到页面
      await this.enterSigninPage()

      // 获取客户端凭证和cookie
      const { tab, lang } = this.commonCookies
      const session = `${this.sessionCookieName}=${this.ctx.cookies.get(this.sessionCookieName)}`
      const token = `${this.tokenCookieName}=${this.ctx.cookies.get(this.tokenCookieName)}`

      // 设置header
      const headers = Object.assign(this.commonHeaders, { Cookie: `${session}; ${token}; ${tab}; ${lang};` })
      console.log('headers: -------------------------------', headers)

      // 设置请求选项
      const opts = {
        dataType: 'text',
        method: 'get'
      }

      // 获取请求结果，会302
      const result = await this.request(`${this.signinUrl}/redeem`, Object.assign(opts, { 
        headers: headers,
        data: { 
          'once': this.once
        }
      }))

      // 重新进入签到页面，确认是否签到成功
      const success = await this.request(`${this.signinUrl}`, Object.assign(opts, {
        headers: this.commonHeaders
      }))

      // 设置API返回值
      return success 
    }

  } // /.class=>AuthService
}

