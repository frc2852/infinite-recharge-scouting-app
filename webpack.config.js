const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const htmlLoader = require('./helpers/html-loader');

const srcPath = path.resolve('src') + '/';
const outputFolder = path.resolve('dist') + '/';

module.exports = [
    {
        mode: 'development',
        entry: srcPath + 'js/app.js',
        output: {
            path: outputFolder,
            filename: 'js/app.[contentHash].js',
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
            ],
        },
        plugins: htmlLoader(srcPath + 'pages', [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),
            new MiniCssExtractPlugin({
                filename: 'main.css',
                chunkFilename: 'main.css',
            }),
            new HtmlWebpackPlugin({ template: srcPath + 'index.html', filename: 'index.html' }),
        ]),
    },
    {
        entry: srcPath + 'js/service-worker.js',
        output: {
            filename: 'service-worker.js',
        },
    },
];
