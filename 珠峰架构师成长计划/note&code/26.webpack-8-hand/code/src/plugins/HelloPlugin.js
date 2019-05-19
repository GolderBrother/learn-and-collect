class HelloPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.plugin('compilation', function(compilation){
            compilation.plugin('optimize-chunk-modules', function() {
                console.log('optimize-chunk-modules')
            })
        })
    }
    //每个插件都需要提供 一个apply方法
    apply(compiler) {
        compiler.hooks.compilation.tap('compilation', function(compilation, params) {
            compilation.hooks.optimiziChunkModules.tap('optimiziChunkModules', function(chunks, modules){
                console.log(chunks, modules);
            })
        })
    }
}

module.exports = HelloPlugin;