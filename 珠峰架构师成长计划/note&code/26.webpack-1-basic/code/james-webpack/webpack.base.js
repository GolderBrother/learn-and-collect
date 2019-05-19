// 可以把 webpack 的配置按照不同的环境拆分成多个文件，运行时直接根据环境变量加载对应的配置即可

// webpack.base.js：基础部分，即多个文件中共享的配置
// webpack.development.js：开发环境使用的配置
// webpack.production.js：生产环境使用的配置
// webpack.test.js：测试环境使用的配置...