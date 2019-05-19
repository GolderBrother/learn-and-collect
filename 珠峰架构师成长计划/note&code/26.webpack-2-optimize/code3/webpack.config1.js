// const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: './src/lazy.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash:4].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // new ModuleConcatenationPlugin({})
    ]
}