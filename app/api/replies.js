/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 13 Mar 2017 03:22:10 PM CST
 */

/**
 * @module Replies
 * @author IndexXuan
 */

module.exports = app => prefix => {
  /**
   * 返回一个topic下的全部回复
   * @method show
   *
   * @example
   * GET /api/v2/replies/344499?page=1&pagesize=1
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
   * }, {
   * ...
   * }]
   */
  app.get('v2ex', `${prefix}/replies/:topic_id`, 'replies.show')

  /**
   * 创建某个topic的回复
   * @method new
   *
   * @example
   * POST /api/v2/replies/350205/new?content=${content}
   *
   * Object
   * {
   *   result: true|false,
   *   msg: ${msg},
   *   url: ${topic_url}
   * }
   */
  app.post('v2ex', `${prefix}/replies/:topic_id/new`, 'replies.create')
  app.get('v2ex', `${prefix}/replies/:topic_id/new`, 'replies.create') // for test, 谨慎实验
}

