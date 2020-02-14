const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const htmlLoader = require('./helpers/html-loader');

const srcPath = path.resolve('src') + '/';
const outputFolder = path.resolve('dist');

module.exports = {
  entry: {
    app: srcPath + 'js/app.js',
    downloadSchedule: srcPath + 'js/download-schedule.js',
    fieldApp: srcPath + 'js/field-app.js',
  },
  output: {
    path: outputFolder + '/js',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(svg|jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'assets/',
              publicPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  plugins: htmlLoader(srcPath, [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
      chunkFilename: 'main.css',
    }),
  ]),
};
