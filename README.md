<p align="center">
  <a href="https://www.v2ex.com/" target="_blank">
    <img src="https://v2ex.assets.uxengine.net/site/logo@2x.png?m=1346064962" alt="V2EX" title="V2EX" />
  </a>
</p>

<h1 align="center">v2ex-api-bridge</h1>

<p align="center">
  <a href="https://circleci.com/gh/IndexXuan/v2ex-api-bridge/tree/master">
    <img src="https://circleci.com/gh/IndexXuan/v2ex-api-bridge/tree/master.svg?style=shield" alt="Build Status">
  </a>
  <img src="https://img.shields.io/badge/Vim-Best%20Editor-green.svg" alt="Vim Best Editor" />
  <br>
  <br>
  <a href="https://github.com/airbnb/javascript">
    <img src="https://cdn.rawgit.com/feross/standard/master/badge.svg" alt="js-standard-style">
  </a>
</p>


## Intro

`V2EX API Bridge`: 提供论坛公开API的封装和私有API的挖掘实现，目前已支持 `登录，签到，发帖，回帖` 等非官方API功能.  

- Thanks for：
- [official API] (https://www.v2ex.com/p/7v9TEc53)
- [V2EX-API] (https://github.com/djyde/V2EX-API)

## Development

- require Node.js 7.6.0+ (async & await)
- recommend yarn install
- recommend [nvm](https://github.com/creationix/nvm) - the Node.js Version Manager

```bash
$ npm install
$ npm run dev
```
* see `app/router.js` to find full router config & demo api links

## Features

- ✔︎ Full APIs Wrapped
- ✔︎ RESTful Style
- ✔︎ 30+ Case, 90%+ Unit Test(`BDD`)
- ✔︎ Hot Reload in Dev

## Unit Test

- `mocha`, `thunk-mocha`, `power-assert`, `istanbul` is build-in to `egg-bin`, so you can just use it.
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
- parse the `response html` to get more private APIs

## Links

- [V2EX] (https://www.v2ex.com/)
- [egg] (https://github.com/eggjs/egg)
- [egg-bin] (https://github.com/eggjs/egg-bin)
- [mocha] (http://mochajs.org)
- [thunk-mocha] (https://npmjs.com/thunk-mocha)
- [power-assert] (https://github.com/power-assert-js/power-assert)
- [istanbul] (https://github.com/gotwarlost/istanbul)

