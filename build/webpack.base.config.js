const path = require('path')
const util = require('./util')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.[hash].js'
  },
  resolve: {
    extensions: ['.js', '.json', 'jsx', '.vue'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'muse-components': 'muse-ui/src'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: util.cssLoaders({
            sourceMap: true,
            extract: process.env.NODE_ENV === 'production'
          })
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/img/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10,
          name: 'assets/font/[name].[ext]'
        }
      }
    ]
  }
}
