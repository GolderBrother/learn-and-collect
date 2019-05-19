#### webpack-1-basic
2019.4.17
11. 转义ES6/ES7/JSX
Babel其实是一个编译JavaScript的平台,可以把ES6/ES7,React的JSX转义为ES5

11.4 babel runtime
babel 在每个文件都插入了辅助代码，使代码体积过大
babel 对一些公共方法使用了非常小的辅助代码，比如 _extend
默认情况下会被添加到每一个需要它的文件中。你可以引入 @babel/runtime 作为一个独立模块，来避免重复引入

11.5 ESLint校验代码格式规范 #
eslint
eslint-loader
configuring
babel-eslint
Rules
ESlint 语法检测配置说明

12. 如何调试打包后的代码
webpack通过配置可以自动给我们source maps文件，map文件是一种对应编译文件和源文件的方法

source-map 把映射文件生成到单独的文件，最完整最慢
cheap-module-source-map 在一个单独的文件中产生一个不带列映射的Map
eval-source-map 使用eval打包源文件模块,在同一个文件中生成完整sourcemap
cheap-module-eval-source-map sourcemap和打包后的JS同行显示，没有映射列