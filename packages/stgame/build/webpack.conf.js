const CleanWebpackPlugin = require('clean-webpack-plugin')
const { resolve } = require('./utils')

module.exports = {
  mode: 'production',
  entry: resolve('src/index.js'),
  output: {
    filename: 'stgame.min.js',
    path: resolve('dist'),
    libraryTarget: 'umd',
    library: 'stgame',
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