/**
 *  webpack.dev.conf.js.js
 *  Create By rehellinen
 *  Create On 2018/11/8 16:41
 */
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server');
const {resolve} = require('path')
const baseWebpackConfig = require('./webpack.base.conf')

const r = path => resolve(__dirname, path)

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  devServer: {
    hot: true,
    host: 'localhost',
    port: '5000',
    quiet: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
