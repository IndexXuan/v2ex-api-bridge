/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 13 Mar 2017 03:22:10 PM CST
 */

/**
 * @module Members
 * @author IndexXuan
 */

'use strict'

module.exports = app => prefix => {
  /**
   * 查看一个成员公开信息，无需权限
   * @method show
   *
   * @example
   * GET /api/v2/members/id/105309
   * GET /api/v2/members/username/IndexXuan
   *
   * Object
   * {
   *   "status": "found",
   *   "id": 105309,
   *   "url": "http://www.v2ex.com/member/IndexXuan",
   *   "username": "IndexXuan",
   *   "website": "",
   *   "twitter": "",
   *   "psn": "",
   *   "github": "",
   *   "btc": "",
   *   "location": "",
   *   "tagline": "",
   *   "bio": "",
   *   "avatar_mini": "//v2ex.assets.uxengine.net/gravatar/abda94899b0173bb17e815a5c0bf9e93?s=24&d=retro",
   *   "avatar_normal": "//v2ex.assets.uxengine.net/gravatar/abda94899b0173bb17e815a5c0bf9e93?s=48&d=retro",
   *   "avatar_large": "//v2ex.assets.uxengine.net/gravatar/abda94899b0173bb17e815a5c0bf9e93?s=73&d=retro",
   *   "created": 1426662703
   * }
   */
  app.get('v2ex', `${prefix}/members/username/:username`, 'members.show')
  app.get('v2ex', `${prefix}/members/id/:id`, 'members.show')
}

