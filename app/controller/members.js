/**
 *  @Controller
 *  @Module members
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 10 Mar 2017 03:21:40 PM CST
 */

module.exports = app => {
  return class MembersController extends app.Controller {

    async show (ctx) {
      ctx.validate({
        username: { type: 'string', required: false },
        id: { type: 'string', required: false } 
      }, ctx.params)

      ctx.body = await ctx.service.members.show(ctx.params)
    }

  } // /.class=>MemberController
}

