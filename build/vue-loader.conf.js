/**
 *  vue-loader.conf.js.js
 *  Create By rehellinen
 *  Create On 2018/11/5 16:05
 */
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    extract: isProduction
  })
}

