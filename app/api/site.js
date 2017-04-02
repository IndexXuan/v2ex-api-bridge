/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 03 Mar 2017 03:22:10 PM CST
 */

/**
 * @module Site
 * @author IndexXuan
 */

'use strict'

module.exports = app => prefix => {
  /**
   * 返回站点信息
   * @method info
   *
   * @example
   * GET /api/v2/site/info
   *
   * Object
   * {
   *   "title": "V2EX",
   *   "slogan": "way to explore",
   *   "description": "创意工作者们的社区",
   *   "domain": "www.v2ex.com"
   * }"
   */
  app.get('v2ex', `${prefix}/site/info`, 'site.info')
  /**
   * 返回站点状态
   * @method stats
   *
   * @example
   * GET /api/v2/site/stats
   *
   * Object
   * {
   *   "topic_max":344143,
   *   "member_max":222394
   * }"
   */
  app.get('v2ex', `${prefix}/site/stats`, 'site.stats')
  /**
   * 返回站点财富榜
   * @method topRich
   *
   * @example
   * xxx
   * @todo implemention
   */
  app.get('v2ex', `${prefix}/site/topRich`, 'site.topRich')
  /**
   * 返回站点消费榜
   * @method topPlayer
   *
   * @example
   * xxx
   * @todo implemention
   */
  app.get('v2ex', `${prefix}/site/topPlayer`, 'site.topPlayer')
}

