/**
 *  index.js
 *  Create By rehellinen
 *  Create On 2018/11/12 10:32
 */
require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-transform-runtime']
})

require('./server')
