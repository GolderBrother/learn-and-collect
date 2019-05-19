const path = require('path');
module.exports = {
    entry: "./src/lib.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash:8].js',
        //  支持 var、commonjs (exports["calculator"] = (function (modules) {}({}))、commonjs2(module.exports = (function (modules) {}({})) 、 this 、window 、global
        libraryTarget: 'commonjs',
        // 导出的全局变量名
        library: 'getName'
    }
}