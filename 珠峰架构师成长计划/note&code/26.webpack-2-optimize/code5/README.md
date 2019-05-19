10.1 安装
npm install --save-dev webpack-bundle-analyzer
10.2 配置
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
plugins: [
  new BundleAnalyzerPlugin(
           {
              analyzerMode: 'server',
              analyzerHost: '127.0.0.1',
              analyzerPort: 8889,
              reportFilename: 'report.html',
              defaultSizes: 'parsed',
              openAnalyzer: true,
              generateStatsFile: false,
              statsFilename: 'stats.json',
              statsOptions: null,
              logLevel: 'info'
            }
       ),
]
10.3 输出
"analyz": "NODE_ENV=production npm_config_report=true npm run build"
10.4 在线分析
webpack --profile --json > stats.json

profile：记录下构建过程中的耗时信息；
json：以 JSON 的格式输出构建结果，最后只输出一个 .json 文件，这个文件中包括所有构建相关的信息。

Webpack 官方提供了一个可视化分析工具 Webpack Analyse

Modules：展示所有的模块，每个模块对应一个文件。并且还包含所有模块之间的依赖关系图、模块路径、模块ID、模块所属 Chunk、模块大小；

Chunks：展示所有的代码块，一个代码块中包含多个模块。并且还包含代码块的ID、名称、大小、每个代码块包含的模块数量，以及代码块之间的依赖关系图；
Assets：展示所有输出的文件资源，包括 .js、.css、图片等。并且还包括文件名称、大小、该文件来自哪个代码块；
Warnings：展示构建过程中出现的所有警告信息；
Errors：展示构建过程中出现的所有错误信息；
Hints：展示处理每个模块的过程中的耗时。