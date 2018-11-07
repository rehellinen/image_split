/**
 *  server.js
 *  Create By rehellinen
 *  Create On 2018/11/7 10:15
 */
const Koa = require('koa')
const chalk = require('chalk')
const {resolve} = require('path')
const devServer = require('./build/dev-server')
const serve = require('koa-static');

class Server {
  constructor () {
    this.app = new Koa()
    this.host = process.env.HOST || '127.0.0.1'
    this.port = process.env.PORT || 9527
    this.isProd = process.env.NODE_ENV === 'production'
  }

  start () {
    this.isProd ? this._prod() : this._dev()

    // this.app.use(serve(resolve(__dirname, './dist'), {
    //   extensions: ['html']
    // }));

    this.app.listen(this.port, this.host)
    console.log(chalk.blue(`Server listens on ${this.host}:${this.port}`))
  }

  _prod () {

  }

  _dev () {
    new devServer(this.app).start()
  }
}

new Server().start()
