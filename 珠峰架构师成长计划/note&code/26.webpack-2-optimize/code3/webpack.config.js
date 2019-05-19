const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Scope Hoisting 可以让 Webpack 打包出来的代码文件更小、运行的更快， 它又译作 "作用域提升"，是在 Webpack3 中新推出的功能。
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
module.exports = {
    entry: "./src/lazy.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:4].js'
    },
    devServer: {
        open: true,
        inline: true, //在打包后文件里注入一个websocket客户端
        hot: true //启动模块热加载
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons : {
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0 // This is example is too small to create commons chunks
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        "env",
                        {
                            // "modules": false 的含义是关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法。
                            modules: false
                        }
                    ]
                }
            },
            include: path.resolve('./src'),
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // // 开启 Scope Hoisting
        new ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin() // 用名称代替ID
        
    ]
}