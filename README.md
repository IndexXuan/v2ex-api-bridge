<p align="center">
  <a href="https://www.v2ex.com/" target="_blank">
    <img src="https://v2ex.assets.uxengine.net/site/logo@2x.png?m=1346064962" alt="V2EX" title="V2EX" />
  </a>
</p>

<h1 align="center">v2ex-api-bridge</h1>

## Intro

`V2EX API Bridge`: 提供论坛公开API的封装和私有API的挖掘实现，目前支持 `登录，签到，发帖，回帖` 等功能.  

- 参考：
- [官方API] (https://www.v2ex.com/p/7v9TEc53)
- [V2EX-API整理] (https://github.com/djyde/V2EX-API)

## Development

```bash
$ npm install(recommend: yarn install)
$ npm run dev
```

require Node.js 7.6.0+ (async & await)

* 可以在 `app/router.js` 中查看完整路由配置和demo示例链接

## Features

- ✔︎ Full APIs Wrapped
- ✔︎ RESTful Style
- ✔︎ 30+ Case, 90%+ Unit Test(`BDD`)
- ✔︎ Hot Reload in Dev

## Unit Test

- `mocha`, `thunk-mocha`, `power-assert`, `istanbul` is build-in to [egg-bin], so you can just use it.
- `power-assert` is very powerful, No API is the best API.
- see [egg unit test docs](https://eggjs.org/core/unittest) for more detail.

## npm scripts

- Use `npm start` to run server
- Use `npm run dev` to dev
- Use `npm run lint` to run eslint(eslint not native support es@next now)
- Use `npm test` to run unit test
- Use `npm run cov` to run cov

## Todo

- make `pwa` using the APIs

## Links

- [V2EX] (https://www.v2ex.com/)
- [egg] (https://github.com/eggjs/egg)
- [egg-bin] (https://github.com/eggjs/egg-bin)
- [mocha] (http://mochajs.org)
- [thunk-mocha] (https://npmjs.com/thunk-mocha)
- [power-assert] (https://github.com/power-assert-js/power-assert)
- [istanbul] (https://github.com/gotwarlost/istanbul)

