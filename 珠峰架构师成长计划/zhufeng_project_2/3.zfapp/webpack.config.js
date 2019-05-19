const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    mode:'development',
    entry:'./src/index.tsx',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js',
        publicPath:'/'
    },
    devtool:'source-map',
    resolve:{//查找模块的时候使用
        extensions:['.ts','.tsx','.js','.json']
        
    },
    devServer:{
        hot:true, //启用热更新
        contentBase:path.join(__dirname,'dist'),
        publicPath:'/',
        //不管访问什么路径 ，都重定向到index.html
        historyApiFallback:{
            index:'./index.html'
        }
    },
    module:{
        rules:[
            {
               test:/\.tsx?$/,
               loader:'ts-loader' 
            },
            {
                enforce:'pre',//pre的意思是表示这个loader要在正常loader执行前执行
                test:/\.js$/,
                loader:'source-map-loader'
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(jpg|png|gif)$/,
                use:['url-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}