const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const util = require('./util')

const baseConfig = require('./webpack.base.config')
const prodConfig = merge(baseConfig, {
  devtool: '#cheap-module-source-map',
  output: {
    path: 'dist'
  },
  module: {
    rules: util.styleLoaders({
      sourceMap: true,
      extract: true
    })
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'bundle.[contenthash].css'
    })
    // // Copy the images folder and optimize all the images
    // new CopyWebpackPlugin([{
    //   from: 'src/assets/img/',
    //   to: 'assets/img'
    // }])
  ]
})

module.exports = prodConfig
