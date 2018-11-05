/**
 *  utils.js
 *  Create By rehellinen
 *  Create On 2018/11/5 12:16
 */
const {resolve} = require('path')

const generateLoader = (loader, loaderOpts) => {

}

exports.r = (path) => resolve(__dirname, path)

exports.cssLoaders = (opts = {}) => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: opts.sourceMap
    }
  }

  return {
    css: generateLoader('css')
  }
}
