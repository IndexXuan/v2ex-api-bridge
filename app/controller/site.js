/**
 *  @Controller 
 *  @Module site
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 10 Mar 2017 02:18:42 PM CST
 */

module.exports = app => {
  return class SiteController extends app.Controller {

    async info (ctx) {
      ctx.body = await ctx.service.site.info()
    }

    async stats (ctx) {
      ctx.body = await ctx.service.site.stats()
    }

  } // /.class=>SiteController
}
