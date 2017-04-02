/**
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 13 Mar 2017 03:22:10 PM CST
 */

/**
 * @module Topics
 * @author IndexXuan
 */

module.exports = app => prefix => {
  /**
   * 返回最新topics列表
   * @method latest
   *
   * @example
   * GET /api/v2/topics/latest
   *
   * Array<Object>
   * [{
   *   id: 350959,
   *   url: "http://www.v2ex.com/t/350959",
   *   title: "MacBook Pro 13 寸顶配 最新款转让",
   *   replies: 1,
   *   content: "由于本人急需用钱，现需要忍痛割爱，电脑于 apple 官方网站购买（有苹果官方发票和可以查看本人购买记录），从 1 月 15 日使用至今，原价 22,328RMB ，现 2w 转让，限北京当面交易。...",
   *   created: 1490693527,
   *   member: {
   *     id: 79264,
   *     username: "richardzhou",
   *     vatar_large: "//v2ex.assets.uxengine.net/gravatar/4b89de587467c780f7f2a6b4460b66ea?s=73&d=retro",
   *     avatar_mini: "//v2ex.assets.uxengine.net/gravatar/4b89de587467c780f7f2a6b4460b66ea?s=24&d=retro",
   *     avatar_normal: "//v2ex.assets.uxengine.net/gravatar/4b89de587467c780f7f2a6b4460b66ea?s=48&d=retro",
   *     tagline: ""
   *   },
   *   node: {
   *     id: 10,
   *     name: "mbp",
   *     title: "MacBook Pro",
   *     title_alternative: "MacBook Pro",
   *     topics: 3021,
   *     url: "http://www.v2ex.com/go/mbp",
   *     avatar_large: "//v2ex.assets.uxengine.net/navatar/d3d9/4468/10_large.png?m=1488347268",
   *     avatar_mini: "//v2ex.assets.uxengine.net/navatar/d3d9/4468/10_mini.png?m=1488347268",
   *     avatar_normal: "//v2ex.assets.uxengine.net/navatar/d3d9/4468/10_normal.png?m=1488347268"
   *   },
   *   last_modified: 1490693527,
   *   last_touched: 1490693347
   * }, {
   *  ...
   * }]
   */
  app.get('v2ex', `${prefix}/topics/latest`, 'topics.latest')

  /**
   * 返回最热topics列表
   * @method hot
   *
   * @example
   * GET /api/v2/topics/hot
   *
   * Array<Object>
   * [{
   *   id: 350959,
   *   url: "http://www.v2ex.com/t/350959",
   *   title: "MacBook Pro 13 寸顶配 最新款转让",
   *   replies: 1,
   *   content: "由于本人急需用钱，现需要忍痛割爱，电脑于 apple 官方网站购买（有苹果官方发票和可以查看本人购买记录），从 1 月 15 日使用至今，原价 22,328RMB ，现 2w 转让，限北京当面交易。...",
   *   created: 1490693527,
   *   member: {
   *     id: 79264,
   *     username: "richardzhou",
   *     vatar_large: "//v2ex.assets.uxengine.net/gravatar/4b89de587467c780f7f2a6b4460b66ea?s=73&d=retro",
   *     avatar_mini: "//v2ex.assets.uxengine.net/gravatar/4b89de587467c780f7f2a6b4460b66ea?s=24&d=retro",
   *     avatar_normal: "//v2ex.assets.uxengine.net/gravatar/4b89de587467c780f7f2a6b4460b66ea?s=48&d=retro",
   *     tagline: ""
   *   },
   *   node: {
   *     id: 10,
   *     name: "mbp",
   *     title: "MacBook Pro",
   *     title_alternative: "MacBook Pro",
   *     topics: 3021,
   *     url: "http://www.v2ex.com/go/mbp",
   *     avatar_large: "//v2ex.assets.uxengine.net/navatar/d3d9/4468/10_large.png?m=1488347268",
   *     avatar_mini: "//v2ex.assets.uxengine.net/navatar/d3d9/4468/10_mini.png?m=1488347268",
   *     avatar_normal: "//v2ex.assets.uxengine.net/navatar/d3d9/4468/10_normal.png?m=1488347268"
   *   },
   *   last_modified: 1490693527,
   *   last_touched: 1490693347
   * }, {
   *  ...
   * }]
   */
  app.get('v2ex', `${prefix}/topics/hot`, 'topics.hot')

  /**
   * 返回特定topics
   * @method show
   * @param {Number|String} id - topic_id
   *
   * @example
   * GET /api/v2/topics/show?id=${id}
   *
   * Object
   * {
   *   id: 350959,
   *   url: "http://www.v2ex.com/t/350959",
   *   title: "MacBook Pro 13 寸顶配 最新款转让",
   *   replies: 1,
   *   content: "由于本人急需用钱，现需要忍痛割爱，电脑于 apple 官方网站购买（有苹果官方发票和可以查看本人购买记录），从 1 月 15 日使用至今，原价 22,328RMB ，现 2w 转让，限北京当面交易。...",
   *   created: 1490693527,
   *   member: {
   *     id: 79264,
   *     username: "richardzhou",
   *     vatar_large: "//v2ex.assets.uxengine.net/gravatar/4b89de587467c780f7f2a6b4460b66ea?s=73&d=retro",
   *     avatar_mini: "//v2ex.assets.uxengine.net/gravatar/4b89de587467c780f7f2a6b4460b66ea?s=24&d=retro",
   *     avatar_normal: "//v2ex.assets.uxengine.net/gravatar/4b89de587467c780f7f2a6b4460b66ea?s=48&d=retro",
   *     tagline: ""
   *   },
   *   node: {
   *     id: 10,
   *     name: "mbp",
   *     title: "MacBook Pro",
   *     title_alternative: "MacBook Pro",
   *     topics: 3021,
   *     url: "http://www.v2ex.com/go/mbp",
   *     avatar_large: "//v2ex.assets.uxengine.net/navatar/d3d9/4468/10_large.png?m=1488347268",
   *     avatar_mini: "//v2ex.assets.uxengine.net/navatar/d3d9/4468/10_mini.png?m=1488347268",
   *     avatar_normal: "//v2ex.assets.uxengine.net/navatar/d3d9/4468/10_normal.png?m=1488347268"
   *   },
   *   last_modified: 1490693527,
   *   last_touched: 1490693347
   * }
   */
  app.get('v2ex', `${prefix}/topics/:id`, 'topics.show')

  /**
   * 返回一个类型下的所有topics
   * @method all
   * @param {String} type - topics的类型
   *   - @enum [ 'username', 'node_name', 'node_id' ]
   * @param {String} value - topics类型的值
   *
   * @example
   * GET /api/v2/topics/node_id/249
   * GET /api/v2/topics/node_name/vim
   * GET /api/v2/topics/username/IndexXuan
   *
   * Array<Object>
   * [{
   *   id: 350959,
   *   url: "http://www.v2ex.com/t/350959",
   *   title: "MacBook Pro 13 寸顶配 最新款转让",
   *   replies: 1,
   *   content: "由于本人急需用钱，现需要忍痛割爱，电脑于 apple 官方网站购买（有苹果官方发票和可以查看本人购买记录），从 1 月 15 日使用至今，原价 22,328RMB ，现 2w 转让，限北京当面交易。...",
   *   created: 1490693527,
   *   member: {
   *     id: 79264,
   *     username: "richardzhou",
   *     vatar_large: "//v2ex.assets.uxengine.net/gravatar/4b89de587467c780f7f2a6b4460b66ea?s=73&d=retro",
   *     avatar_mini: "//v2ex.assets.uxengine.net/gravatar/4b89de587467c780f7f2a6b4460b66ea?s=24&d=retro",
   *     avatar_normal: "//v2ex.assets.uxengine.net/gravatar/4b89de587467c780f7f2a6b4460b66ea?s=48&d=retro",
   *     tagline: ""
   *   },
   *   node: {
   *     id: 10,
   *     name: "mbp",
   *     title: "MacBook Pro",
   *     title_alternative: "MacBook Pro",
   *     topics: 3021,
   *     url: "http://www.v2ex.com/go/mbp",
   *     avatar_large: "//v2ex.assets.uxengine.net/navatar/d3d9/4468/10_large.png?m=1488347268",
   *     avatar_mini: "//v2ex.assets.uxengine.net/navatar/d3d9/4468/10_mini.png?m=1488347268",
   *     avatar_normal: "//v2ex.assets.uxengine.net/navatar/d3d9/4468/10_normal.png?m=1488347268"
   *   },
   *   last_modified: 1490693527,
   *   last_touched: 1490693347
   * }, {
   *  ...
   * }]
   */
  app.get('v2ex', `${prefix}/topics/all/:type/:value`, 'topics.getAllByType')

  /**
   * 创建一个topic,返回创建结果
   * @method create
   *
   * @param {String} title - 标题
   * @param {String} content - 内容 
   * @param {String} node_name - 节点名
   *
   * @example
   * POST /api/v2/topics/new
   * data: { title: ${title}, content: ${content}, node_name: ${node_name} }
   * 
   * Object
   * {
   *   result: true|false,
   *   msg: ${msg}, // 可能的一些信息
   *   url: ${url} // 此新建topic的url
   * }
   */
  app.post('v2ex', `${prefix}/topics/new`, 'topics.create')
  app.get('v2ex', `${prefix}/topics/new`, 'topics.create') // for test, 谨慎实验
}

