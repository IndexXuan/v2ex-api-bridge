/**
 *  @Controller
 *  @Module nodes
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 10 Mar 2017 02:49:54 PM CST
 */

module.exports = app => {
  return class NodesController extends app.Controller {

    async all (ctx) {
      ctx.body = await ctx.service.nodes.all()
    }

    async show (ctx) {
      // validate
      ctx.validate({
        id: { type: 'id', required: false },
        name: { type: 'string', required: false }
      }, ctx.params)

      ctx.body = await ctx.service.nodes.show(ctx.params)
    }

  } // /.class=>NodesController
}
