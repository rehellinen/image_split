/**
 *  dev-server.js.js
 *  Create By rehellinen
 *  Create On 2018/11/5 11:16
 */
const fs = require('fs')
const {resolve} = require('path')
const webpack = require('webpack')
const chokidar = require('chokidar')
const devConfig = require('./webpack.config')
const MFS = require('memory-fs')
const {promisify} = require('util')
const hotMiddleware = require('webpack-hot-middleware')
const {PassThrough} = require('stream')
const koaWebpack = require('koa-webpack');

class devServer {
  constructor (app) {
    this.app = app
    this.compiler = webpack(devConfig)
  }

  async start () {
    devConfig.entry.app = ['webpack-hot-middleware/client', devConfig.entry.app]
    devConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    )

    const middleware = await koaWebpack({
      compiler: this.compiler
    })
    this.app.use(middleware);


    this.app.use(async ctx => {
      const filename = resolve(devConfig.output.path, 'index.html')
      ctx.response.type = 'html'
      ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
    })



    // 配置热更新
    // this.app.use(this._hot())
    // 配置dev
    // this.app.use(this._dev())
  }

  _dev () {
    const devMiddleware = require('webpack-dev-middleware')(this.compiler, {
      publicPath: devConfig.output.publicPath,
      noInfo: true
    })

    return async (ctx, next) => {
      await devMiddleware(ctx.req, {
        end: (content) => ctx.body = content,
        setHeader: (name, value) => ctx.set(name, value)
      }, next)
    }
  }

  _hot () {
    const hotMiddleware = require('webpack-hot-middleware')(this.compiler, {
      heartbeat: 5000
    })

    return async (ctx, next) => {
      let stream = new PassThrough()
      ctx.body = stream
      await hotMiddleware(ctx.req, {
        write: stream.write.bind(stream),
        writeHead: (status, headers) => {
          ctx.status = status
          ctx.set(headers)
        }
      }, next)
    }
  }

  update () {

  }
}

module.exports = devServer
