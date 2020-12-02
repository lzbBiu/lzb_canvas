const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devServer: {
      contentBase: './dist',
      port: 9783
  },
  plugins: [
      // new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      })
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};