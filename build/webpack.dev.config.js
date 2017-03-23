const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const util = require('./util')
const baseConfig = require('./webpack.base.config')
const host = '0.0.0.0'
const port = 9000
// 启用HMR有两种方式
// 第一种是直接在cli中调用 webpack-dev-server --hot --inline，这种方式就不需要在devServer配置中添加 hot: true,inline:true，也不需要引入HotModuleReplacementPlugin
// ----------
// 第二种是在配置中添加hot: true,inline:true，在plugins中引入HotModuleReplacementPlugin
// 需要注意的是，如果配置了output.publicPath，则其必须跟html中引用bundle.js的相对路径要一致（最好跟path相对应）
// 如果没有配置output.publicPath，html就得直接引用bundle.js
// ----------
// 切记不要配置devServer.publicPath，否则vue-hot-reload会失效，对.vue文件的改动也会导致页面全部刷新
// 也不要配置devServer.watchContentBase，否则任何contentBase下的改动都会导致页面全部刷新，包括.vue文件的改动
const devConfig = merge(baseConfig, {
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    contentBase: "./",
    open: true,
    compress: true,
    hot: true,
    inline: true,
    host,
    port,
    stats: 'errors-only',
    quiet: true,
    noInfo: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  module: {
    rules: util.styleLoaders({ sourceMap: true })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    // // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})

module.exports = devConfig
