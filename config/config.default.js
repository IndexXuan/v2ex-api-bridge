/**
 *  @Config file
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 03 Mar 2017 03:49:18 PM CST
 */

'use strict'

const fs = require('fs')
const path = require('path')

console.log(`========== config.default.js ==========`)

module.exports = appInfo => {

  const config = {}

  config.keys = appInfo.name + '123456'

  // V2EX Base Url
  config.baseUrl = 'https://www.v2ex.com'

  // apiBaseUrl
  config.root = 'https://www.v2ex.com/api'

  // 加载 errorHandler 中间件
  config.middleware = [ 'errorHandler' ],

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api'
  }

  config.siteFile = {
    'favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.png'))
  }

  return config

}
