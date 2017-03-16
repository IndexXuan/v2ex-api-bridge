/**
 *  @Controller
 *  @Module auth 
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Tue 14 Mar 2017 03:15:19 PM CST
 */

module.exports = app => {
  return class AuthController extends app.Controller {

    async login (ctx) {
      ctx.body = await ctx.service.auth.login(ctx.query)
    }

    async signin (ctx) {
      ctx.body = await ctx.service.auth.signin(ctx.query)
    }

  } // /.class=>AuthController
}
