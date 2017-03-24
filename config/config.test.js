/**
 *  @Config file
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 03 Mar 2017 03:49:18 PM CST
 */

const fs = require('fs')
const path = require('path')

console.log(`========== config.test.js ==========`)

module.exports = appInfo => {

  const config = {}

  config.keys = appInfo.name + '123456'

  // apiBaseUrl
  config.root = 'https://www.v2ex.com/api'

  // 测试时不加载任何中间件
  config.middleware = null,

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api'
  }

  config.siteFile = {
    'favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.png'))
  }

  return config

}
