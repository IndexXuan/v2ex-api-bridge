/**
 *  @Router Config
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 03 Mar 2017 03:22:10 PM CST
 */

'use strict'

module.exports = app => {

  const prefix = '/api/v2'

  // @auth 
  app.post('v2ex', `${prefix}/auth/login`, 'auth.login')
  app.get('v2ex', `${prefix}/auth/login`, 'auth.login') // for test
  app.post('v2ex', `${prefix}/auth/login`, 'auth.login')
  app.get('v2ex', `${prefix}/auth/signin`, 'auth.signin') // for test
  
  // @site
  app.get('v2ex', `${prefix}/site/info`, 'site.info')
  app.get('v2ex', `${prefix}/site/stats`, 'site.stats')

  // @members
  app.get('v2ex', `${prefix}/members/username/:username`, 'members.show')
  app.get('v2ex', `${prefix}/members/id/:id`, 'members.show')

  // @nodes
  app.get('v2ex', `${prefix}/nodes/all`, 'nodes.all')
  app.get('v2ex', `${prefix}/nodes/id/:id`, 'nodes.show')
  app.get('v2ex', `${prefix}/nodes/name/:name`, 'nodes.show')

  // @topics
  app.get('v2ex', `${prefix}/topics/latest`, 'topics.latest')
  app.get('v2ex', `${prefix}/topics/hot`, 'topics.hot')
  app.get('v2ex', `${prefix}/topics/:id`, 'topics.show')
  app.get('v2ex', `${prefix}/topics/all/:type/:value`, 'topics.getAllByType')
  // auth required
  app.post('v2ex', `${prefix}/topics/new`, 'topics.create')
  // app.get('v2ex', `${prefix}/topics/new`, 'topics.create') // for test

  // @repies
  app.get('v2ex', `${prefix}/replies/:topic_id`, 'replies.show')
  // auth required
  app.post('v2ex', `${prefix}/replies/:topic_id/new`, 'replies.create')
  app.get('v2ex', `${prefix}/replies/:topic_id/new`, 'replies.create') // for test

  /**
   * @examples
   */

  // @auth 建议打开Router配置中注释掉的的GET模式，方便测试 `登录，签到，发帖，回帖` API
  // http://localhost:7001/api/v2/auth/login?username=${username}&password=${password}
  // http://localhost:7001/api/v2/auth/signin
  // http://localhost:7001/api/v2/topics/new?title=${title}&content=${content}&node_name=${node_name: e.g.: api}
  // http://localhost:7001/api/v2/replies/${topic_id: e.g.: 349488}/create?content=${content}

  // @site
  // http://localhost:7001/site/info
  // http://localhost:7001/site/stats
  
  // @members
  // http://localhost:7001/members/username/IndexXuan
  // http://localhost:7001/members/id/105309
  
  // @nodes
  // http://localhost:7001/nodes/all
  // http://localhost:7001/nodes/name/vim
  // http://localhost:7001/nodes/id/249
  
  // @topics
  // http://localhost:7001/topics/latest
  // http://localhost:7001/topics/hot
  // http://localhost:7001/topics/346957
  // http://localhost:7001/topics/all/username/Livid
  // http://localhost:7001/topics/all/node_name/vim?page=2
  // http://localhost:7001/topics/all/node_id/249
  
  // @replies
  // http://localhost:7001/replies/344499?page=1&page_size=20 // page_size貌似没用...
  
} // /.router map

