/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 13 Mar 2017 03:22:10 PM CST
 */

/**
 * @module Nodes
 * @author IndexXuan
 */

'use strict'

module.exports = app => prefix => {
  /**
   * 返回全部节点元信息
   * @method all
   *
   * @example
   * GET /api/v2/nodes/all
   *
   * Array<Object>
   * [{
   *   "id": 249,
   *   "name": "vim",
   *   "url": "http://www.v2ex.com/go/vim",
   *   "title": "Vim",
   *   "title_alternative": "Vim",
   *   "topics": 405,
   *   "header": null,
   *   "footer": null,
   *   "created": 1289706010
   * }, {
   * ...
   * }]
   */
  app.get('v2ex', `${prefix}/nodes/all`, 'nodes.all')

  /**
   * 返回一个特定节点信息
   * @method show
   *
   * @example
   * GET /api/v2/nodes/id/249
   * GET /api/v2/nodes/name/vim
   *
   * Object
   * {
   *   "id": 249,
   *   "name": "vim",
   *   "url": "http://www.v2ex.com/go/vim",
   *   "title": "Vim",
   *   "title_alternative": "Vim",
   *   "topics": 405,
   *   "header": null,
   *   "footer": null,
   *   "created": 1289706010
   * }
   */
  app.get('v2ex', `${prefix}/nodes/id/:id`, 'nodes.show')
  app.get('v2ex', `${prefix}/nodes/name/:name`, 'nodes.show')
}

