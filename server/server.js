/**
 *  server.js
 *  Create By rehellinen
 *  Create On 2018/11/12 10:53
 */
import Koa from 'koa'
import Router from 'koa-router'
import chalk from 'chalk'
import {ImageSplit} from "./controller/ImageSplit"

class Server {
  constructor () {
    this.app = new Koa()
    this.host = process.env.HOST || '127.0.0.1'
    this.port = process.env.PORT || 9527
  }

  start () {
    this.useRouters()
    this.app.listen(this.port, this.host)
    console.log(chalk.blue(`Server listens on ${this.host}:${this.port}`))
  }

  useRouters () {
    let router = new Router()

    router.post('/', (ctx, next) => {
      ImageSplit(ctx, next)
    })

    this.app.use(router.routes())
      .use(router.allowedMethods())
  }
}

(new Server()).start()
