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
      this.url = 'https://www.v2ex.com/signin'
      this.setCookiestr = '' // 供放在headers里使用
      this.cookies = '' // get到的cookie暂存，供合并给最终的cookies
      this.userKey = ''
      this.passKey = ''
      this.once = ''
    }

    async request (url, opts) {
      opts = Object.assign({
        timeout: [ '30s', '30s' ],
      }, opts)

      return await this.ctx.curl(url, opts)
    }

    getKeys (content) {
      const re = /class="sl"\s*name=\"(\w*)/g
      const onceRe = /type="hidden"\s*value="(\w*)\s*/
      const matches = content && content.match(re)
      this.userKey = matches[0].match(/name="(\w*)/)[1]
      this.passKey = matches[1].match(/name="(\w*)/)[1]
      this.once = content.match(onceRe)[1]
    }

    async getAuthPrepare () {
      const result = await this.request(this.url, {
        method: 'GET',
        dataType: 'text',
        headers: {
          "accept": "text/html,application/xhtml+xml,application/xml",
          "origin": "https://www.v2ex.com",
          "referer": "https://www.v2ex.com/signin",
          "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
      }) 
      this.setCookiestr = result.headers['set-cookie'][0]
      const cs = setCookieParser(result)
      this.cookies = cs

      // set cookies for client
      cs.forEach(c => {
        this.ctx.cookies.set(c.name, c.value, {
          domain: '',
          expires: c.expires,
          path: c.path,
          httpOnly: c.httpOnly
        })
      })
      return this.getKeys(result.data)
    }

    async signin (ctx) {

      await this.getAuthPrepare()

      const opts = {
        method: 'POST',
        headers: {
          "method": "POST",
          "accept": "text/html,application/xhtml+xml,application/xml",
          "origin": "https://www.v2ex.com",
          "referer": "https://www.v2ex.com/signin",
          "Cookie": this.setCookiestr, 
          "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        },
        data: {
          [this.userKey]: "your username",
          [this.passKey]: "your password",
          "once": this.once,
          "next": "/"
        }
      }

      const result = await this.request(this.url, opts)

      const cs = setCookieParser(result)
      // set cookies for client
      cs.forEach(c => {
        this.ctx.cookies.set(c.name, c.value, {
          domain: '',
          path: c.path,
          expires: c.expires,
          httpOnly: c.httpOnly
        })
      })

      // return all cookies to client
      return cs.concat(this.cookies.filter(item => item.name === 'PB3_SESSION'))
    }

  } // /.class=>AuthService
}
