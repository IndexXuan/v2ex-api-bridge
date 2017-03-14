/**
 *  @Service
 *  @Module repies
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Mon 13 Mar 2017 05:35:26 PM CST
 */

module.exports = app => {

  return class RepiesService extends app.Service {

    constructor (ctx) {
      super(ctx)
      this.root = `${app.config.root}/replies`
    }

    async request (query, opts) {
      const url = `${this.root}/${query}.json`
      opts = Object.assign({
        timeout: [ '30s', '30s' ],
        dataType: 'json'
      }, opts)

      return await this.ctx.curl(url, opts)
    }

    async show (params) {
      const result = await this.request('show', {
        data: params
      })

      return result.data
    }

  } // /.class=>RepiesService

}
