/**
 *  index.js
 *  Create By rehellinen
 *  Create On 2018/11/5 12:26
 */
const {r} = require('../build/utils')

module.exports = {
  dev: {
    // 路径相关

  },
  prod: {
    assetsRoot: r('../dist')
  }
}
