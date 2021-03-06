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
  <a href="https://codecov.io/github/IndexXuan/v2ex-api-bridge?branch=master">
    <img src="https://codecov.io/github/IndexXuan/v2ex-api-bridge/coverage.svg?branch=master" alt="Code Coverage">
  </a>
  <img src="https://img.shields.io/badge/Vim-Best%20Editor-green.svg" alt="Vim Best Editor" />
  <br>
  <br>
  <a href="https://github.com/airbnb/javascript">
    <img src="https://cdn.rawgit.com/feross/standard/master/badge.svg" alt="js-standard-style">
  </a>
</p>

## Intro

`V2EX API Bridge`: 提供论坛公开API的封装和私有API的挖掘实现，目前已支持 `登录，签到，发帖，回帖，账户，消息` 等非官方API功能.  
* see `app/router.js` to find full router config & demo api links

- Thanks for：
- [official API] (https://www.v2ex.com/p/7v9TEc53)
- [V2EX-API] (https://github.com/djyde/V2EX-API)

## Development

- require Node.js 7.6.0+ (async & await)
- recommend `yarn install`
- recommend [nvm](https://github.com/creationix/nvm) - the Node.js Version Manager

```bash
$ npm install
$ npm run dev
```
## Features

- ✔︎ Full RESTful Style APIs Wrapped
- ✔︎ 40+ Case, 95%+ Unit Test(`BDD`) with Docs
- ✔︎ Server Hot Reload in Dev
- ✔︎ pre-commit hook to run codecov & build jsdoc, host in Github Pages @see `package.json#pre-commit`
- ✔︎ CI Support

## Docs

- ✔︎ Public API Docs  - [go] (https://indexxuan.github.io/v2ex-api-bridge/api/index.html)
- ✔︎ Project Dev Docs - [go] (https://indexxuan.github.io/v2ex-api-bridge/project/index.html)

## Unit Test

- `mocha`, `thunk-mocha`, `power-assert`, `istanbul` is build-in to `egg-bin`, so you can just use it.
- `power-assert` is very powerful, No API is the best API.
- see [egg unit test docs](https://eggjs.org/core/unittest) for more detail.

## npm scripts

- Use `npm start` to run server in prod mode
- Use `npm run dev` to dev
- Use `npm run lint` to run eslint(eslint not native support es@next now, so...)
- Use `npm test` to run unit test
- Use `npm run cov` to run code coverage

## Todo

- parse the `response html` to get more private APIs
- improve `docs` and 'codecov'
- make `pwa` using the APIs
- make it more `egg best practice`

## Links

- [V2EX] (https://www.v2ex.com/)
- [egg] (https://github.com/eggjs/egg)
- [egg-bin] (https://github.com/eggjs/egg-bin)
- [mocha] (http://mochajs.org)
- [thunk-mocha] (https://npmjs.com/thunk-mocha)
- [power-assert] (https://github.com/power-assert-js/power-assert)
- [istanbul] (https://github.com/gotwarlost/istanbul)
- [circleci] (https://circleci.com/)
- [codecov] (https://codecov.io/)
- [jsdoc] (https://github.com/jsdoc3/jsdoc)

