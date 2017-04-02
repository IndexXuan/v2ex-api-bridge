/**
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Wed 29 Mar 2017 03:40:01 PM CST
 */

/**
 * @module helper
 * utils
 */

'use strict'

/* istanbul ignore next */
module.exports = {
  // copy from: https://segmentfault.com/q/1010000008733200?_ea=1734789
  get htmlTagRe () {
    return /<("[^"]*"|'[^']*'|[^'">])*>/g
  },
  getCurrentUserName () {
    const username = atob(this.ctx.cookies.get('vn'))
    return username
  }
}

