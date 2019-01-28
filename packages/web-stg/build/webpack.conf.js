const CleanWebpackPlugin = require('clean-webpack-plugin')
const { resolve } = require('./utils')

module.exports = {
  mode: 'production',
  entry: resolve('src/index.js'),
  output: {
    filename: 'web-stg.min.js',
    path: resolve('dist'),
    libraryTarget: 'umd',
    library: 'stg',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
}