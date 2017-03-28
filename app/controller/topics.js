/**
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 03 Mar 2017 03:23:34 PM CST
 */

/**
 *  @Controller
 *  @file 主题相关API
 *  @author IndexXuan
 *  @module Topics
 */

'use strict'

module.exports = app => {
  return class TopicsController extends app.Controller {
    /**
     * 返回最新topics列表
     * @example
     * GET /api/v2/topics/latest
     *
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
    async latest () {
      const { ctx } = this
      ctx.body = await ctx.service.topics.latest()
    }

    /**
     * 返回最热topics列表
     * @example
     * GET /api/v2/topics/hot
     *
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
    async hot () {
      const { ctx } = this
      ctx.body = await ctx.service.topics.hot()
    }

    /**
     * 返回特定topics
     * @param {Number|String} id - topic_id
     * @example
     * GET /api/v2/topics/show?id=${id}
     *
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
    async show () {
      const { ctx } = this
      // validator
      ctx.validate({
        id: { type: 'id', required: true }
      }, ctx.params)

      ctx.body = await ctx.service.topics.show(ctx.params)
    }

    /**
     * 返回一个类型下的所有topics
     * @param {String} type - topics的类型
     *   - @enum [ 'username', 'node_name', 'node_id' ]
     * @param {String} value - topics类型的值
     * @example
     * GET /api/v2/topics/node_name/vim
     *
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
    async getAllByType () {
      const { ctx } = this
      // validator
      ctx.validate({
        type: { type: 'enum', values: [ 'username', 'node_name', 'node_id' ], required: true },
        value: { type: 'string', required: true },
        page: { type: 'id', required: false }
      }, ctx.params)

      // set default page in controller
      ctx.params = Object.assign(ctx.params, { page: ctx.query.page || 1 })
      ctx.body = await ctx.service.topics.getAllByType(ctx.params)
    }

    /**
     * 创建一个topic,返回创建结果
     *
     * @param {String} title - 标题
     * @param {String} content - 内容 
     * @param {String} node_name - 节点名
     * @example
     * POST /api/v2/topics/new
     * data: { title: ${title}, content: ${content}, node_name: ${node_name} }
     * 
     * {
     *   result: true|false,
     *   msg: ${msg}, // 可能的一些信息
     *   url: ${url} // 此新建topic的url
     * }
     */
    async create () {
      const { ctx } = this
      ctx.validate({
        title: { type: 'string', required: true },
        content: { type: 'string', required: true },
        node_name: { type: 'string', required: true }
      }, ctx.query)

      ctx.body = await ctx.service.topics.create(ctx.query)
    }
  } // /.class=>TopicsController
} // /.exports

