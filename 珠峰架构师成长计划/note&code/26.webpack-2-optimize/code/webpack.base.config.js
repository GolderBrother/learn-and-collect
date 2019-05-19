const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackParallelUglifyPlugin = require('web');
/**
 * 1.尽量减小搜索的范围
 */
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        // 要给网站接入 CDN，需要把网页的静态资源上传到 CDN 服务上去，在服务这些静态资源的时候需要通过 CDN 服务提供的 URL 地址去访问
        // 会改成cdn 线上地址，即为静态资源访问的根地址
        publicPath: 'http://localhost:8080/'
    },
    mode: 'development',
    //当你引入一个模块的时候，要进行解析 
    resolve: {
        extensions: ['.js', '.json'],
        mainFields: ['main', 'browser', 'node'],
        //当你需要指定除node_modules之外的其它模块目录 的话
        modules: [path.resolve('node_modules'), path.resolve('lib')]
    },
    module: {
        rules: [{
            test: /\.js?$/,
            // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
            use: ['happypack/loader?id=babel'],
            //只转换或者编译src 目录 下的文件
            include: path.resolve(__dirname, './src'),
            exclude: path.resolve(__dirname, 'node_modules')
        }, {
            test: /\.css?$/,
            // 把对css文件的处理转交给id为css 的 HappyPack  实例
            use: ['happypack/loader?id=css'],
            // 只转换或者编译 src 目录下的文件
            include: path.resolve(__dirname, './src'),
            // 不要解析 node_modules 模块
            exclude: /node_modules/
        }]
    },
    plugins: [
        // 定义环境变量
        // new HappyPack({
        //     __development__: JSON.stringify(process.env.NODE_ENV)
        // }),
        // happypack 就能让Webpack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。
        new HappyPack({
            //ID是标识符的意思，ID用来代理当前的happypack是用来处理一类特定的文件的
            id: 'babel',
            loaders: ['babel-loader']
        }),
        new HappyPack({
            //ID是标识符的意思,id用来表示当前的happypack实例，用来处理一类特定的文件的
            id: 'js',
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            // 要开启多少个子进程去处理这一类型的文件
            threads: 4,
            // 是否要输出详细的日志
            verbose: true
        }),
        // 自动产出html #
        // 我们希望自动能产出HTML文件，并在里面引入产出后的资源
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        // 在配置文件中引入DllPlugin插件打包好的动态连接库
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, 'dist', 'manifest.json')
        })
    ]
}