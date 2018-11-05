/**
 *  webpack-base.conf.js.js
 *  Create By rehellinen
 *  Create On 2018/11/5 11:37
 */
const {resolve} = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const r = path => resolve(__dirname, path)

module.exports = {
  context: r('../'),
  entry: {
    app: './src/index.js'
  },
  output: {
    path: r('../dist'),
    filename: '[name].bundle.js',
    chunkFilename: "[name].chunk.js"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [r('src')]
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
