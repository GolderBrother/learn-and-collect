const path = require('path');
const webpack = require('webpack');
/**
 * 1.尽量减小搜索的范围
 *   target: '_dll_[name]' 指定的是导出变量的名称
 *   
 */
module.exports = {
    entry: {
        // 这个 key 即为下面的 [name] 值
        react: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]_dll.js',
        // 配置以何种方式导出库
        //  支持 var、commonjs (exports["calculator"] = (function (modules) {}({}))、commonjs2(module.exports = (function (modules) {}({})) 、 this 、window 、global
        libraryTarget: 'var',
        // 全局变量名，其他会从此变量上获取到里面的模块
        library: '_dll_[name]'
    },
    plugins: [
        new webpack.DllPlugin({
             // 动态链接库的全局变量名称，需要和output.liabrary 中保持一致
            name: '_dll_[name]',
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            path: path.resolve(__dirname, 'dist', '[name].manifest.json')
        })
    ]
}