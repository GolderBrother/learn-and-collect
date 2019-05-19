class EntryOptionWebpackPlugin {
    apply(compiler) {
        compiler.hooks.entryOption.tap('Plugin', option => {
            console.log(option, 'EntryOptionWebpackPlugin');
        })
    }
}

class AfterPlugins {
    apply(compiler) {
        compiler.hooks.afterPlugins.tap('Plugin', option => {
            console.log(option, 'AfterPlugins')
        })
    }
}

class RunPlugin {
    apply(compiler) {
        compiler.hooks.run.tap('Plugin', option => {
            console.log(option, 'RunPlugin')
        })
    }
}

class CompilerWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compile.tap('Plugin', option => {
            console.log(option, 'CompilerWebpackPlugin')
        })
    }
}

class AfterCompilerWebpackPlugin {
    apply(compiler) {
        compiler.hooks.afterCompile.tap('Plugin', option => {
            console.log(option, 'AfterCompilerWebpackPlugin')
        })
    }
}

class EmitWebapckPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('Plugin', option => {
            console.log(option, 'EmitWebapckPlugin')
        })
    }
}

class DoneWebapckPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('Plugin', option => {
            console.log(option, 'DonePlugin')
        })
    }
}

module.exports = {
    EntryOptionWebpackPlugin,
    AfterPlugins,
    RunPlugin,
    CompilerWebpackPlugin,
    AfterCompilerWebpackPlugin,
    EmitWebapckPlugin,
    DoneWebapckPlugin
}