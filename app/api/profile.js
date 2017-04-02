/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 13 Mar 2017 03:22:10 PM CST
 */

/**
 * @module Profile
 * @author IndexXuan
 */

'use strict'

module.exports = app => prefix => {
  /**
   * 返回本人全部信息，包含发布的主题，回复的主题，财富收支，消息通知等
   * @method all 
   *
   * @example
   * GET /api/v2/profile/all
   *
   * Array<Object> 
   * [{
   *   "id": 4096325,
   *   "thanks": 0,
   *   "content": "站长辛苦了😆😆😆",
   *   "content_rendered": "站长辛苦了😆😆😆",
   *   "member": {
   *     "id": 154020,
   *     "username": "misaka19000",
   *     "tagline": "",
   *     "avatar_mini": "//v2ex.assets.uxengine.net/avatar/4271/6be2/154020_mini.png?m=1479258611",
   *     "avatar_normal": "//v2ex.assets.uxengine.net/avatar/4271/6be2/154020_normal.png?m=1479258611",
   *     "avatar_large": "//v2ex.assets.uxengine.net/avatar/4271/6be2/154020_large.png?m=1479258611"
   *   },
   *   "created": 1488489066,
   *   "last_modified": 1488489066
   * }, {me
   * ...
   * }]
   */
  app.get('v2ex', `${prefix}/profile/all`, 'profile.all')

  /**
   * 返回本人发布的所有主题
   * @method topics 
   *
   * @example
   * GET /api/v2/profile/topics
   *
   * Array<Object> 
   * [{
   * }]
   */
  app.get('v2ex', `${prefix}/profile/topics`, 'profile.topics')

  /**
   * 返回本人的所有回复
   * @method show
   *
   * @example
   * GET /api/v2/profile/replies
   *
   * Array<Object> 
   * [{
   * }]
   */
  app.get('v2ex', `${prefix}/profile/replies`, 'profile.replies')

  /**
   * 返回本人所有收支情况
   * @method balance
   *
   * @example
   * GET /api/v2/profile/balance
   *
   * Array<Object> 
   * [{
   * }]
   */
  app.get('v2ex', `${prefix}/profile/balance`, 'profile.balance')

  /**
   * 返回本人所有的消息通知
   * @method notification 
   *
   * @example
   * GET /api/v2/profile/notification
   *
   * Array<Object> 
   * [{
   * }]
   */
  app.get('v2ex', `${prefix}/profile/notification`, 'profile.notification')
} // /.exports

