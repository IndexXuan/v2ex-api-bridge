/**
 *  @Router 
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Fri 03 Mar 2017 03:22:10 PM CST
 */


module.exports = app => {

  // Todo
  // 1. find way to set prefix
  // 2. 多个API貌似没有分页
  
  // @site
  app.get('v2ex', '/api/v2/site/info', 'site.info')
  app.get('v2ex', '/api/v2/site/stats', 'site.stats')

  // @members
  app.get('v2ex', '/api/v2/members/username/:username', 'members.show')
  app.get('v2ex', '/api/v2/members/id/:id', 'members.show')

  // @nodes
  app.get('v2ex', '/api/v2/nodes/all', 'nodes.all')
  app.get('v2ex', '/api/v2/nodes/id/:id', 'nodes.show')
  app.get('v2ex', '/api/v2/nodes/name/:name', 'nodes.show')

  // @topics
  app.get('v2ex', '/api/v2/topics/latest', 'topics.latest')
  app.get('v2ex', '/api/v2/topics/hot', 'topics.hot')
  app.get('v2ex', '/api/v2/topics/show/:id', 'topics.show')
  app.get('v2ex', '/api/v2/topics/all/:type/:value', 'topics.getAllByType')

  // @repies
  app.get('v2ex', '/api/v2/replies/:topic_id', 'replies.show')

  /**
   * @examples
   */
  // http://localhost:7001/site/info
  // http://localhost:7001/site/stats
  
  // http://localhost:7001/members/username/IndexXuan
  // http://localhost:7001/members/id/105309
  
  // http://localhost:7001/nodes/all
  // http://localhost:7001/nodes/name/vim
  // http://localhost:7001/nodes/id/249
  
  // http://localhost:7001/topics/show/346957
  // http://localhost:7001/topics/all/username/Livid
  // http://localhost:7001/topics/all/node_name/vim?page=2
  // http://localhost:7001/topics/all/node_id/249
  
  // http://localhost:7001/replies/344499/?page=1&page_size=20 // page_size貌似没用...
  
} // /.router
