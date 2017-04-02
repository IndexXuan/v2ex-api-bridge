/**
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 13 Mar 2017 03:22:10 PM CST
 */

'use strict'

module.exports = app => {

  const prefix = '/api/v2'

  require('./api/auth')(app)(prefix)
  require('./api/profile')(app)(prefix)
  require('./api/site')(app)(prefix)
  require('./api/members')(app)(prefix)
  require('./api/nodes')(app)(prefix)
  require('./api/topics')(app)(prefix)
  require('./api/replies')(app)(prefix)

  /**
   * @examples
   */

  // @auth 建议打开Router配置中注释掉的的GET模式，方便测试 `登录，签到，发帖，回帖` API
  // http://localhost:7001/api/v2/auth/login?username=${username}&password=${password}
  // http://localhost:7001/api/v2/auth/signin
  // http://localhost:7001/api/v2/topics/new?title=${title}&content=${content}&node_name=${node_name: e.g.: sandbox}
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
  // http://localhost:7001/replies/344499?page=1&page_size=20 // page相关貌似都没用...
  
} // /.router map

