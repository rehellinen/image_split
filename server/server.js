/**
 *  server.js
 *  Create By rehellinen
 *  Create On 2018/11/12 10:53
 */
import Koa from 'koa'
import Router from 'koa-router'
import chalk from 'chalk'
import {ImageSplit, upload} from "./controller/ImageSplit"

class Server {
  constructor () {
    this.app = new Koa()
    this.host = process.env.HOST || '127.0.0.1'
    this.port = process.env.PORT || 9528
  }

  start () {
    // 加入路由中间件
    this.useRouters()
    // 启动服务器
    this.app.listen(this.port, this.host)
    console.log(chalk.blue(`Server listens on ${this.host}:${this.port}`))
  }

  useRouters () {
    let router = new Router()

    router.post('/image', upload.single('image'), ImageSplit())

    this.app.use(router.routes())
      .use(router.allowedMethods())
  }
}

(new Server()).start()
