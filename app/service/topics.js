/**
 *  @Service topic
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Fri 03 Mar 2017 03:31:22 PM CST
 */

module.exports = app => {

  return class TopicsService extends app.Service {

    constructor (ctx) {
      super(ctx)
      this.root = `${app.config.root}/topics`
    }

    async request (query, opts) {
      const url = `${this.root}/${query}.json`
      opts = Object.assign({
        timeout: [ '30s', '30s' ],
        dataType: 'json'
      }, opts)
      return await this.ctx.curl(url, opts)
    }

    async latest () {
      const result = await this.request('latest')

      this.checkSuccess(result)
      return result.data
    }

    async hot () {
      const result = await this.request('hot')

      this.checkSuccess(result)
      return result.data
    }

    async show (params) {
      const result = await this.request('show', {
        data: params
      })

      this.checkSuccess(result)
      return result.data
    }

    async getAllByType (params) {
      const data = {}
      data[params.type] = params.value
      data.page = params.page
      const result = await this.request('show', {
        data: data
      })

      this.checkSuccess(result)
      return result.data
    }

    // 封装统一的调用检查函数，可以在查询，创建和更新等 service 中复用
    checkSuccess (result) {
      if (result.status !== 200) {
        const errorMsg = result.data && result.data.message
          ? `V2EX API REMOTE SERVER: ${result.data.message}`
          : 'unknown error'
        this.ctx.throw(result.status, errorMsg)
      }
      if (result.data.status === 'error') {
        // 远程调用返回格式错误
        this.ctx.throw(500, 'remote response error', { data: result.data, message: result.data.message })
      }
    }

  } // /.class=>TopicsController

}

