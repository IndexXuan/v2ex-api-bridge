/**
 *  @Extend Context
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 24 Mar 2017 11:15:04 AM CST
 */

// sessionid cookie name 
const sessionCookieName = 'PB3_SESSION'

// token cookie name 
const tokenCookieName =  'A2'

module.exports = {
  get sessionCookieName () {
    return sessionCookieName 
  },
  get tokenCookieName () {
    return tokenCookieName 
  },
  get sessionid () {
    return `${sessionCookieName}=${this.cookies.get(sessionCookieName)}`
  },
  get token () {
    return `${tokenCookieName}=${this.cookies.get(tokenCookieName)}`
  },
  // 公共请求头
  get commonHeaders () {
    return {
      "Accept": "text/html,application/xhtml+xml,application/xml",
      "Origin": "https://www.v2ex.com",
      "Referer": "https://www.v2ex.com",
      "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
    }
  },
  get commonCookies () {
    return {
      tab: 'V2EX_TAB="2|1:0|10:1489746039|8:V2EX_TAB|8:dGVjaA==|b72b63fabe0f8faeff147ac38e26299655d713ad1880feef6679b56d8d1e9f47"',
      others: 'v2ex_lang=zhcn; _ga=ga1.2.1254455933.1474272858; _gat=1'
    }
  }
} // /.exports

