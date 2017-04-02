/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Wed 29 Mar 2017 11:31:06 AM CST
 */

/**
 *  @module ProfileService
 */

'use strict'

// import parser
const cheerio = require('cheerio')

/* istanbul ignore next */
module.exports = app => {
  /**
   * @class ProfileService
   * @extends app.Service
   */
  return class ProfileService extends app.Service {
    /**
     * @constructor
     * @param {Objet} ctx - 请求上下文
     */
    constructor (ctx) {
      super(ctx)
    }

    /**
     * 封装统一的请求方法
     * @member
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
     * 本人全部主题，回复，收支，消息通知
     * @method
     */
    async all () {

    }

    /**
     * 进入我创建的replies页面
     * @member
     * @returns {String} - 页面的HTML String 
     */
    async enterMyRepliesPage () {
      const session = this.ctx.sessionid
      const token = this.ctx.token
      const { tab, others } = this.ctx.commonCookies
      const headers = Object.assign({}, this.ctx.commonHeaders,
        { Referer: 'https://www.v2ex.com/mission/daily' },
        { Cookie: `${session}; ${token}; ${tab}; ${others};` }
      )
      const username = this.ctx.helper.getCurrentUserName()
      const url = `${this.config.baseUrl}/member/${username}/replies`

      return await this.request(url, {
        method: 'GET',
        dataType: 'text',
        headers: headers
      })
    }

    /**
     * 解析我的回复页面
     * @member
     * @returns {Object}
     */
    parseRepliesPage (content) {
      const $ = cheerio.load(content)
      const total = $('.header').find('.snow + .gray').text()
      const items = []
      $('.dock_area').each((index, elem) => {
        let item = {}
        item.fromNow = $(elem).find('.fade').text()
        item.to = $(elem).find('.gray > a').eq(0).text()
        item.toProfileUrl = $(elem).find('.gray > a').attr('href')
        item.node  = $(elem).find('.gray  a').eq(1).text()
        item.nodeUrl = $(elem).find('.gray a').eq(1).attr('href')
        item.title = $(elem).find('.gray > a').eq(2).text()

        let reply = $(elem).next().find('.reply_content')
        // 是否是 `@` 模式
        if (reply && reply.find('.inner').text()) {
          item.at = reply.find('> a').text()
          item.atUrl = reply.find('> a').attr('href')
          reply.find('> a').remove()
          item.text = reply.text().replace('@', '')
        } else {
          item.text = reply.text()
        }
        items.push(item)
      })    
      return {
        total, 
        items
      } 
    }

    /**
     * 我的回复
     * @method
     * @returns {Object}
     */
    async replies () {
      // @step1 进入我的创建replies页面
      const res = await this.enterMyRepliesPage()
      const result = this.parseRepliesPage(res.data)

      return JSON.stringify(result)
    }

    /**
     * 收支
     * @method
     * @returns {Object}
     */
    async balance () {
      return 'balance'
    }

    /**
     * 消息 
     * @method
     * @returns {Object}
     */
    async notification () {
      return 'notification'
    }
  } // /.class=>ProfileService 
} // /.exports

