const path = require("path");
const DllPlugin = require("webpack/lib/DllPlugin");
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin");
module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        // 输出的文件都放到 dist 目录下
        path: path.resolve(__dirname, 'dist'),
        //输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称
        filename: '[name]_dll.js',
        //存放动态链接库的全局变量名称,例如对应 react 来说就是 _dll_react 
        library: '_dll_[name]'
    },
    plugins: [
        new DllPlugin({
            // 动态链接库的全局变量名称，需要和output.liabrary 中保持一致
            name: '_dll_[name]',
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            path: path.resolve(__dirname, 'dist', '[name].mainfest.json')
        }),
        // 在配置文件中引入DllPlugin插件打包好的动态连接库
        new DllReferencePlugin({
            manifest: path.resolve(__dirname, './dist/react.manifest.js')
        })
    ]
}