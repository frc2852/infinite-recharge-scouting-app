const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const htmlLoader = require('./helpers/html-loader');

const srcPath = path.resolve('src') + '/';
const outputFolder = path.resolve('dist') + '/';

module.exports = {
    entry: srcPath + 'js/app.js',
    output: {
        path: outputFolder,
        filename: 'app.js',
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
                test: /\.html$/,
                use: ['html-loader']
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
                            publicPath: 'assets/'
                        }
                    }
                ]
            }
        ],
    },
    plugins: htmlLoader(srcPath + 'pages', [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css',
            chunkFilename: 'main.css',
        }),
        new HtmlWebpackPlugin({ template: srcPath + 'index.html', filename: 'index.html' }),
    ]),
};
