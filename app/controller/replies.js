/**
 *  @Controller
 *  @Module replies
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 05:28:59 PM CST
 */

module.exports = app => {
  return class RepiesController extends app.Controller {

    async show (ctx) {
      ctx.validate({
        topic_id: { type: 'id', required: true }
      }, ctx.params)

      ctx.params = Object.assign(ctx.params, ctx.query)
      ctx.body = await ctx.service.replies.show(ctx.params)
    }

  } // /.class=>RepiesController
}
