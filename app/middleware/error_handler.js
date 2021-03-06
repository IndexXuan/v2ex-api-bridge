/**
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 03 Mar 2017 03:44:36 PM CST
 */

/**
 *  @module Middleware
 */

'use strict'

module.exports = app => {
  return async (ctx, next) => {
    try {
      // next is the function, should be invoked
      await next()
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx)
      const status = err.status || 500
      // 生产环境 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      /* istanbul ignore next */
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : { from: 'middleware', msg: `${err.message}`, stack: `${err.stack}` }
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error }
      // 422 Unprocessable Entity
      if (status === 422) {
        ctx.body.detail = err.errors
      }
      ctx.status = status
      ctx.logger.info('========== middleware catched error ==========')
    } // /.catch
  } // /.async function
} // /.exports

