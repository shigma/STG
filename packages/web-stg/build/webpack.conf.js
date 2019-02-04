const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const { resolve } = require('./utils')

const baseConfig = {
  mode: 'production',
  output: {
    path: resolve('dist'),
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /worker\.js$/,
        use: [
          {
            loader: 'worker-loader',
            options: {
              name: 'web-stg.worker.js',
              inline: true,
              fallback: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              outputStyle: 'compressed',
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{
      from: resolve('dist'),
      to: '../../docs/.vuepress/public/lib/',
    }]),
  ],
}

module.exports = [
  merge(baseConfig, {
    entry: resolve('src/library.js'),
    output: {
      filename: 'stg.common.js',
      libraryTarget: 'commonjs2',
    },
  }),
  merge(baseConfig, {
    entry: resolve('src/runtime.js'),
    output: {
      filename: 'stg.runtime.js',
      libraryTarget: 'umd',
      library: 'stg',
      globalObject: 'typeof self !== "undefined" ? self : this',
    },
  }),
]
