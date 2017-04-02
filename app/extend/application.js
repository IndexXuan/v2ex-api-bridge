/**
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Wed 29 Mar 2017 04:10:58 PM CST
 */

/**
 * @module Extend#Application
 * Server启动级别执行
 */

'use strict'

// polyfill
/* istanbul ignore next */
if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str).toString('base64')
  }
}

/* istanbul ignore next */
if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString()
  }
}

module.exports = {
  // foo(param) {
  //   // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
  // }
}

