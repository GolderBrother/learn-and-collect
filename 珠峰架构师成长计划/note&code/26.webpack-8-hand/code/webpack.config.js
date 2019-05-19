const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const EmitPlugin = require('./src/plugins/EmitPlugin');
// const FilesPlugin = require('./src/plugins/FilesPlugin');
// const HelloPlugin = require('./src/plugins/HelloPlugin');
// const InlinePlugin = require('./src/plugins/InlinePlugin');
const {
    EntryOptionWebpackPlugin,
    AfterPlugins,
    RunPlugin,
    CompilerWebpackPlugin,
    AfterCompilerWebpackPlugin,
    EmitWebapckPlugin,
    DoneWebapckPlugin
} = require('./src/plugins/cyclePlugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.[hash:4].js'
    },
    // 配置查找loader的目录
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src', 'loader')
        ]
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                'style-loader',
                'less-loader'
            ]
        }]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        // new EmitPlugin(),
        // new FilesPlugin({
        //     filename: 'files-list.md'
        // }),
        // new HelloPlugin({
        //     name: 'james'
        // }),
        // new InlinePlugin()
        new EntryOptionWebpackPlugin(),
        new AfterPlugins(),
        new RunPlugin(),
        new CompilerWebpackPlugin(),
        new AfterCompilerWebpackPlugin(),
        new EmitWebapckPlugin(),
        new DoneWebapckPlugin()
    ]
}