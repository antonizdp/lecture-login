const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:7].js',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.s[ca]ss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.m?js$/, use: 'babel-loader' },
      { test: /\.(png|jpe?g|gif|svg)$/, type: 'asset/resource' },
      { test: /\.(woff2?|ttf)$/, type: 'asset/resource' },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '林纳科技领号系统',
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: './dist',
    host: 'local-ip',
    open: true,
    historyApiFallback: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.vue', '.js', '.json'],
  },
}
