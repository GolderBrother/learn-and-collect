const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const bootstrap = require('bootstrap/dist/css/bootstrap.css');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const cssExtract = new ExtractTextWebpackPlugin({
    filename: 'css/css.css',
    allChunks: true
});
const lessExtract = new ExtractTextWebpackPlugin({
    filename: 'less/less.less'
});
const sassExtract = new ExtractTextWebpackPlugin({
    filename: 'sass/sass.scss'
})
module.exports = {
    entry: './src/main.js',
    output: {
        // 输出的文件夹，只能是绝对路径
        path: path.join(__dirname, 'dist'),
        //name是entry名字main,hash根据打包后的文件内容计算出来的一个hash值
        filename: '[name].[hash].js'
    },
    resolve: {
        // 引入模块的时候，可以不用扩展名
        extensions: ['.js', '.less', '.json'],
        alias: {
            '@bootstrap': 'bootstrap/dist/css/bootstrap.css'
        }
    },
    // 表示监控源文件的变化，当源文件发生改变后，则重新打包
    watch: false,
    watchOptions: {
        ignored: /node_modules/,
        // 每秒钟询问的次数
        poll: 1000,
        //防止重复保存频繁重新编译,500毫秒内重复保存不打包
        aggregateTimeout: 500
    },
    //devtool: 'source-map',//单独文件，可以定位到哪一列出错了
    // devtool: 'cheap-module-source-map',//单独文件，体积更小，但只能定位到哪一行出错
    // devtool: 'eval-source-map',//不会生成单独文件，
    // devtool: 'cheap-module-eval-source-map',//不会生成单独文件 只定位到行，体积更小
    /*
    loader有三种写法
    use
    loader
    use+loader
    * */
    module: {
        rules: [{
                test: require.resolve('jquery'),
                options: '$'
            },
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                    query: [
                        'env',
                        'stage-0',
                        'react'
                    ]
                }
            },
            {
                // file-loader是歇息图片地址，将图片从源位置拷贝到目标位置并且修改原引用地址
                // 可以处理任意的二进制字体，包括 bootstrap 里面的字体
                // url-loader可以在文件比较小的情况下(下面的limit定义了文件的最小大小),直接转换成base64字符串内嵌到页面中
                test: /.(png|jpg|gif|bmp|svg|eot|woff|woff2|ttf)/,
                loader: {
                    loaders: 'url-loader',
                    options: {
                        limit: 5 * 1024,
                        // 指定拷贝文件的输出目录
                        outputPath: 'images/'
                    }
                }
            },
            {
                // 转换文件的匹配正则   
                test: /\.css$/,
                loader: cssExtract.extract({
                    use: ['css-loader?minimize', 'file-loader']
                })
            },
            {
                test: /\.less/,
                loader: lessExtract.extract({
                    use: ['css-loader?minimize', 'less-loader']
                })
            },
            {
                test: /\.scss/,
                loader: sassExtract.extract({
                    use: ['css-loader?minimize', 'sass-loader']
                })
            },
            {
                test: /\.(html|htm)/,
                loader: 'html-withimg-loader'
            }
        ],
        plugins: [
            // 用来自动向模块内部注入变量
            new webpack.ProvidePlugin({
                '$': 'jquery'
            }),
            // 用来压缩js资源的
            new UglifyjsWebpackPlugin({
                //启动缓存
                cache: true,
                //启动并行压缩 使用多进程运行改进编译速度
                parallel: true,
                //生成sourceMap映射文件
                sourceMap: true
            }),
            //    此插件可以自动产出html文件,并且在html文件中自动引入产出后的js、css等资源文件
            new HtmlWebpackPlugin({
                // 指定产入的HTML模板
                template: './src/index.html',
                // 产出的HTML文件名
                filename: 'index.html',
                title: 'index',
                // 会在引入的js里加入查询字符串避免缓存
                hash: true,
                minify: {
                    removeAttributeQuotes: true
                }
            }),
            //    有时项目中没有引用的文件也需要打包到目标目录
            new CopyWebpackPlugin({
                from: path.resolve(__dirname, 'public'),
                to: path.resolve(__dirname, 'dist/public')
            }),
            // 打包前先清空输出目录
            new CleanWebpackPlugin([
                path.resolve(__dirname, 'dist')
            ]),
            cssExtract,
            lessExtract,
            sassExtract
        ],
        // 配置此静态文件服务器，可以用来预览打包后项目
        devServer: {
            contentBase: './dist',
            host: 'localhost',
            port: 8000,
            //服务器返回给浏览器的时候是否启动gzip压缩
            compress: true
        }
    }
}