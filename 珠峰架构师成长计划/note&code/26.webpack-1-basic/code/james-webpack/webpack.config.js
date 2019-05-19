const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const bootstrap = path.resolve(__dirname, 'node_modules/_bootstrap@4.3.1@bootstrap/dist/css/bootstrap.css');

//let pages = ['index', 'base'];
// pages = pages.map(page => new HtmlWebpackPlugin({
//     template: './src/index.html',//指定产的HTML模板
//     filename: `${page}.html`,//产出的HTML文件名
//     title: `${page}`,
//     chunks: ['common', `${page}`],//在产出的HTML文件里引入哪些代码块
//     hash: true,// 会在引入的js里加入查询字符串避免缓存,
//     minify: {
//         removeAttributeQuotes: true
//     }
// }));
//webpack内部有一个事件流，tapable 1.0
// entry: ['./src/base.js', './src/index.js']
// 是一个字符串
// 放一个对象,多入口

const config = {
    // eval-source-map 使用eval打包源文件模块,在同一个文件中生成完整sourcemap
    // devtools: 'eval-source-map',
    mode: 'development',
    // 配置入口文件的地址
    entry: './src/index.js',
    // 配置出口文件的地址
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath指定的是构建后在html里的路径
        publicPath: '/'
    },
    // 如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals
    externals: {
        jquery: 'jquery'
    },
    watch: true,
    // webpack定时获取文件的更新时间，并跟上次保存的时间进行比对，不一致就表示发生了变化,poll就用来配置每秒问多少次
    // 当检测文件不再发生变化，会先缓存起来，等待一段时间后之后再通知监听者，这个等待时间通过aggregateTimeout配置
    // webpack只会监听entry依赖的文件
    // 我们需要尽可能减少需要监听的文件数量和检查频率，当然频率的降低会导致灵敏度下降
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        poll: 1000, //每秒询问的文件变更的次数
        aggregateTimeout: 500 //防止重复保存频繁重新编译,500毫秒内重复保存不打包
    },
    // 指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
    resolve: {
        extentions: ['.js', '.ts', 'jsx', '.css', 'json', '.vue'],
        // 配置别名可以加快webpack查找模块的速度
        // 每当引入bootstrap模块的时候，它会直接引入bootstrap,而不需要从node_modules文件夹中按模块的查找规则查找
        alias: {
            "bootstrap": bootstrap
        },
        // 对于直接声明依赖名的模块（如 react ），webpack 会类似 Node.js 一样进行路径搜索，搜索node_modules目录
        // 这个目录就是使用resolve.modules字段进行配置的 默认配置
        // modules: ['nose_modules'],
        modules: [path.resolve(__dirname, 'node_modules')],
        // 配置 target === "web" 或者 target === "webworker" 时 mainFields 默认值是：
        mainFields: ['browser', 'module', 'main'],
        // target 的值为其他时，mainFields 默认值为：
        mainFields: ["module", "main"],
        // 当目录下没有 package.json 文件时，我们说会默认使用目录下的 index.js 这个文件，其实这个也是可以配置的
        mainFiles: ['index']
    },
    //devtool: 'source-map',//单独文件，可以定位到哪一列出错了
    // devtool: 'cheap-module-source-map',//单独文件，体积更小，但只能定位到哪一行出错
    // devtool: 'eval-source-map',//不会生成单独文件，
    // devtool: 'cheap-module-eval-source-map',//不会生成单独文件 只定位到行，体积更小
    /*
    loader有三种写法
    use
    loader
    use+loader*/
    // 配置模块,主要用来配置不同文件的加载器
    module: {
        // 使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制
        noParse: /jquery|lodash/, // 正则表达式
        // 或者使用函数
        noParse(content) {
            return /jquery|lodash/.test(content)
        },
        rules: [{
            test: /\.css/,
            // loader
            // loader: ['style-loader', 'css-loader'],
            // use
            // css-loader import base from './src/css/base.css' 
            // 解析使用 import 加载 的 CSS 文件后，返回 CSS 代码
            // 从右往左执行的，通过css-loader处理css后才能通过style-loader生成<style></style>标签
            // use: ['style-loader', 'css-loader']
            // use+loader
            use: [{
                loader: 'style-loader',
                options: {
                    insertAt: 'top'
                }
            }, {
                loader: MiniCssExtractPlugin.loader
            }, 'css-loader', 'postcss-loader'],
            include: path.resolve(__dirname, './src'),
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        }, {
            test: /\.scss$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }, {
            test: /\.(jpg|png|bmp|jpeg|gif|svg|ttf|woff|woff2|eot)/,
            use: [{
                // url-loader 当图片小于limit的时候会把图片变为BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    output: 'images',
                    publicPath: '/images'
                }
            }]
        }, {
            test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
            use: ['image-webpack-loader', {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                    optipng: {
                        enabled: false,
                    },
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    webp: {
                        quality: 75
                    }
                }
            }]
        }, {
            test: /\.(html|htm)$/,
            // 在HTML中使用图片
            use: 'html-withimg-loader'
        }, {
            test: /\.jsx$/,
            use: {
                loader: 'babel-loader',
                options: {
                    "plugins": [
                        ["@babel/plugin-proposal-decorators",
                            {
                                "legacy": true
                            }
                        ],
                        [
                            "@babel/plugin-proposal-class-properties",
                            {
                                "loose": true
                            }
                        ]
                    ]
                }
            },
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            use: [
                'eslint-loader',
                {
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            "env",      // 跨平台
                            "stage-0",  // es6
                            "react"
                        ]
                    }
                }
            ],
            include: [path.resolve(__dirname, 'src')], // 指定检查的目录
            exclude: /node_modules/,
            options: {
                fix: true
            }
        }]
    },
    // 配置扩展插件
    plugins: [
        // 自动产出html #
        // 我们希望自动能产出HTML文件，并在里面引入产出后的资源
        new HTMLWebpackPlugin({
            minify: {
                // minify 是对html文件进行压缩，removeAttrubuteQuotes是去掉属性的双引号
                removeAttributeQuotes: true
            },
            // hash 引入产出资源的时候加上查询参数，值为哈希避免缓存
            hash: true,
            chunk: ['index'],
            // template 模版路径
            template: './src/index.html',
            filename: 'index.html'
        }),
        // 有时候我们的页面可以不止一个HTML页面，会有多个页面，所以就需要多入口
        new HTMLWebpackPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            chunk: ['login'],
            template: './src/login.html',
            filename: 'login.html'
        }),
        // 因为CSS的下载和JS可以并行,当一个HTML文件很大的时候，我们可以把CSS单独提取出来加载
        new MiniCssExtractPlugin({
            // filename 打包入口文件
            filename: '[name].css',
            // chunkFilename 用来打包import('module')方法中引入的模块
            chunkFilename: '[id].css'
        }),
        // 插件引入 #
        // _ 函数会自动添加到当前模块的上下文，无需显示声明
        new webpack.ProviderPlugin({
            _: 'lodash'
        }),
        // 添加商标
        new webpack.BannerPlugin('james'),
        // 有时项目中没有引用的文件也需要打包到目标目录
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/assets'), //静态资源目录源地址
            to: path.resolve(__dirname, 'dist/assets') //目标地址，相对于output的path目录
        }]),
        // 打包前先清空输出目录
        new CleanWebpackPlugin([
            path.resolve(__dirname, 'dist')
        ]),
        // DefinePlugin创建一些在编译时可以配置的全局常量
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: 1,
            EXPRESSION: '1+2',
            COPYRIGHT: {
                AUTHOR: "james.zhang"
            }
        }),
        // IgnorePlugin用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去\
        // 第一个是匹配引入模块路径的正则表达式
        // 第二个是匹配模块的对应上下文，即所在目录名
        new webpack.IgnorePlugin(/\.\/locale/, /moment$/)
    ],
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin({
                //启动缓存
                cache: true,
                //启动并行压缩 使用多进程运行改进编译速度
                parallel: true,
                //生成sourceMap映射文件
                sourceMap: true
            }),
            // 压缩css资源的
            new optimizeCssAssetsWebpackPlugin({})
        ]
    },
    // 配置开发服务器
    devServer: {
        // 配置开发服务运行时的文件根目录
        contentBase: path.resolve(__dirname, 'dist'),
        // 开发服务器监听的主机地址
        host: 'localhost',
        // 开发服务器是否启动gzip等压缩
        compress: true,
        // 开发服务器监听的端口
        port: 8080
    },
    proxy: {
        // 不修改路径
        //请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。
        // "/api": 'http://localhost:3000',

        // 修改路径
        "/api": {
            "target": "http://localhost:3000",
            pathRewrite: {
                "^/api": ""
            }
        }
    }
}

module.exports = config;