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
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        use: 'source-map-loader',
        enforce: "pre"
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
}