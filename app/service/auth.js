/**
 *  @Service
 *  @Module auth
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Tue 14 Mar 2017 03:19:07 PM CST
 */

// import parser
const setCookieParser = require('set-cookie-parser')

module.exports = app => {
  return class AuthService extends app.Service {

    /**
     * @constructor
     *
     * @param {Objet} ctx - context object
     */
    constructor (ctx) {
      super(ctx)

      // 首页url
      this.homeUrl = 'https://www.v2ex.com/'

      // login相关
      this.loginUrl = 'https://www.v2ex.com/signin'
      this.sessionCookieStr = '' // 未登录的sessionid, 供 `login` 接口放在请求Headers里的 `Set-Cookie` 项中使用
      this.userField = '' // 用户名 输入框埋下的随机表单域
      this.passField = '' // 密码   输入框埋下的随机表单域
      this.once = ''      // input[type="hidden"][name="once"]的随机令牌值(目前是5位数字)

      // signin相关
      this.signinUrl = 'https://www.v2ex.com/mission/daily'
      this.hasSignin = false // 是否还能签到的标志，不能说明已经签到过了
      this.noAuth = false // 是否有权限签到 
    }

    /**
     * request
     * 封装统一的请求方法
     *
     * @param {String} url - 请求地址
     * @param {Object} opts - 请求选项
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
      const result = await this.request(this.homeUrl)

      const session = setCookieParser(result)
      session.forEach(c => {
        this.ctx.cookies.set(c.name, c.value, {
          httpOnly: c.httpOnly,
          domain: '',
          path: c.path,
          expires: c.expires
        })
      })
    }

    /**
     * getLoginFields
     * 获取登录的各种凭证
     *
     * @param {String} result - 请求登录页返回的response，包含html字符串和Headers
     */
    getLoginFields (result) {
      const content = result.data

      const keyRe = /class="sl" name="([0-9A-Za-z]{64})"/g
      this.userField = keyRe.exec(content)[1]
      this.passField = keyRe.exec(content)[1]

      const onceRe = /value="(\d+)" name="once"/
      this.once = onceRe.exec(content)[1]

      this.sessionCookieStr = result.headers['set-cookie'][0]
    }

    /**
     * enterLoginPage
     * login前的准备
     * 获取sessionid,获取userField, passField, once等
     *
     * @returns {Promise}
     */
    async enterLoginPage () {
      const result = await this.request(this.loginUrl, {
        method: 'GET',
        dataType: 'text',
        headers: this.commonHeaders
      }) 

      return this.getLoginFields(result)
    }

    /**
     * login
     * login获取签名主方法
     *
     * @param {Object} params - 请求参数
     */
    async login (params) {

      // @step1 获取提交的用户名密码
      const { username, password } = params

      // @step2 进入登录页，获取页面隐藏登录域以及once的值
      await this.enterLoginPage()

      // @step3 设置请求参数
      const opts = {
        method: 'POST',
        headers: Object.assign(this.ctx.commonHeaders, { Cookie: this.sessionCookieStr }),
        data: {
          [this.userField]: username,
          [this.passField]: password,
          "once": this.once
        }
      }

      // @step4 发起请求
      const result = await this.request(this.loginUrl, opts)

      // @step5 更新session并设置在客户端
      await this.enterHomePage()
      
      // @step6 解析获取到的cookies
      const cs = setCookieParser(result)
       
      // @step7 判断是否登录成功并种下客户端cookies
      let success = false
      cs.forEach(c => {
        // 查看是否有令牌项的cookie，有就说明登录成功了
        if (c.name === this.ctx.tokenCookieName) success = true
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
        msg: success ? 'ok' : '登录失败，请确认用户名密码无误！',
        data: {
          username: username
        }
      }
    }

    /**
     * getSigninOnce
     * 获取签到的once值
     *
     * @param {String} content - 签到页html字符串
     */
    getSigninOnce (content) {
      // update this.once
      const onceRe = /redeem\?once=(\d+)/
      const onces = onceRe.exec(content)
      if (onces && onces[1]) {
        this.once = onces[1]
      } else {
        // 说明已经签到了
        this.hasSignin = true 
      }
    }

    /**
     * enterSigninPage
     * 进入签到页面，获取once值
     *
     */
    async enterSigninPage () {

      const session = this.ctx.sessionid
      const token = this.ctx.token
      const headers = Object.assign(this.ctx.commonHeaders, { Cookie: `${session}; ${token}` })

      const result = await this.request(this.signinUrl, {
        method: 'GET',
        dataType: 'text',
        headers: headers
      }) 

      // 权限不足，没登录
      if (result.status === 302) {
        this.noAuth = true
      }
      this.getSigninOnce(result.data)
      return
    }

    /**
     * signin
     * 签到领金币
     */
    async signin () {

      // @step1 进入签到页面
      await this.enterSigninPage()

      // @step2 获取客户端凭证和各种cookies
      const session = this.ctx.sessionid
      const token = this.ctx.token
      const { tab, others } = this.ctx.commonCookies

      // @step3 设置Headers
      const headers = Object.assign(this.ctx.commonHeaders,
        { Referer: 'https://www.v2ex.com/mission/daily' },
        { Cookie: `${session}; ${token}; ${tab}; ${others};` }
      )

      // @step4 设置请求选项
      const opts = {
        dataType: 'text',
        method: 'get'
      }

      // @step5 获取请求结果，会302
      const result = await this.request(`${this.signinUrl}/redeem`, Object.assign(opts, { 
        headers: headers,
        data: { 
          'once': this.once
        }
      }))

      // @step6 重新进入签到页面，确认是否签到成功
      const page = await this.request(`${this.signinUrl}`, Object.assign(opts, {
        headers: this.ctx.commonHeaders
      }))

      const p = JSON.stringify(page)

      // 设置API返回值
      if (this.noAuth === true) {
        return {
          result: false,
          msg: '请先登录再签到'
        }
      }
      if (this.hasSignin === true) {
        return {
          result: false,
          msg: '今天已经签到了'
        }
      }
      if (p.includes('查看我的账户余额')) {
        return {
          result: true,
          msg: 'ok'
        }
      }

      return {
        result: false,
        msg: '签到遇到未知错误',
        detail: page
      }
    } // method#signin

  } // /.class=>AuthService
}

