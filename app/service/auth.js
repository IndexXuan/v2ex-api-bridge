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

    constructor (ctx) {
      super(ctx)
      this.commonHeaders = {
        "Accept": "text/html,application/xhtml+xml,application/xml",
        "Origin": "https://www.v2ex.com",
        "Referer": "https://www.v2ex.com/massion",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
      }

      // sessionid
      this.sessionCookieName = 'PB3_SESSION'

      // token cookie name
      this.tokenCookieName =  'A2'

      // 获取登陆签名
      this.loginUrl = 'https://www.v2ex.com/signin'
      this.sessionCookie = '' // 供 `login`接口放在Header里 `Set-Cookie` 使用
      this.loginCookieArr = '' // get到的cookie暂存，供合并给最终的cookie
      this.userKey = '' // 用户名 输入框埋下的随机key
      this.passKey = '' // 密码   输入框埋下的随机key
      this.once = ''    // input[type="hidden"][name="once"]的随机令牌值(5位数字目前)

      // 签到领金币
      this.signinUrl = 'https://www.v2ex.com/mission/daily'
    }

    async request (url, opts) {
      opts = Object.assign({
        timeout: [ '30s', '30s' ],
      }, opts)

      return await this.ctx.curl(url, opts)
    }

    getLoginTokens (content) {
      const re = /class="sl"\s*name=\"(\w*)/g
      const onceRe = /type="hidden"\s*value="(\w*)\s*/
      const matches = content && content.match(re)
      this.userKey = matches[0].match(/name="(\w*)/)[1]
      this.passKey = matches[1].match(/name="(\w*)/)[1]
      this.once = content.match(onceRe)[1]
    }

    /**
     * getLoginPrepare
     *
     */
    async getLoginPrepare () {
      const result = await this.request(this.loginUrl, {
        method: 'GET',
        dataType: 'text',
        headers: this.commonHeaders
      }) 

      this.sessionCookie = result.headers['set-cookie'][0]

      const cs = setCookieParser(result)

      // 设置到暂存对象中
      this.loginCookieArr = cs.filter(cookie => cookie.name !== 'V2EX_LANG')

      return this.getLoginTokens(result.data)
    }

    /**
     * login
     * 登陆获取签名
     *
     * @param params
     */
    async login (params) {

      await this.getLoginPrepare()

      const { username, password } = params

      const opts = {
        method: 'POST',
        headers: Object.assign(this.commonHeaders, { Cookie: this.sessionCookie }),
        data: {
          [this.userKey]: username,
          [this.passKey]: password,
          "once": this.once
        }
      }

      const result = await this.request(this.loginUrl, opts)

      const cs = setCookieParser(result)
      const tokens = cs.concat(this.loginCookieArr)
      let success = false
      tokens.forEach(c => {
        if (c.name === this.tokenCookieName) success = true
        this.ctx.cookies.set(c.name, c.value, {
          httpOnly: true,
          domain: '',
          path: c.path,
          expires: c.expires
        })
      })

      return {
        result: success,
        msg: success ? 'success' : 'sorry! Not get enough token for you',
        data: {
          username: username
        }
      }
    }

    getSigninOnce (content) {
      // update this.once
      const onceResult = content.match(/once=(\w*)/g)[1]
      this.once = onceResult.match(/once=(\w*)/)[1]
    }

    async getSigninPrepare () {
      const token = `A2=${this.ctx.cookies.get('A2')}`
      const result = await this.request(this.signinUrl, {
        method: 'GET',
        dataType: 'text',
        headers: Object.assign(this.commonHeaders, { Cookie: `${this.sessionCookie} ${token}` })
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
      await this.getSigninPrepare()

      const token = `${this.tokenCookieName}=${this.ctx.cookies.get(this.tokenCookieName)}`
      const session = `${this.sessionCookieName}=${this.ctx.cookies.get(this.sessionCookieName)}`
      const headers = Object.assign(this.commonHeaders, { Cookie: `${session}; ${token}` })
      console.log(headers, this.once)
      const opts = {
        dataType: 'text',
        method: 'get'
      }

      const result = await this.request(`${this.signinUrl}/redeem`, Object.assign(opts, { 
        headers: headers,
        data: { 
          'once': this.once
        }
      }))
      const success = await this.request(`${this.signinUrl}`, Object.assign(opts, {
        headers: this.commonHeaders
      }))
      return success 
    }

  } // /.class=>AuthService
}

