const path = require('path');
const fs = require('fs');
const babylon = require('babylon');
const babelTypes = require('babel-types');
const generate = require('babel-generator').default;
const traverse = require('babel-traverse').default;
const ejs = require('ejs');

class Compiler {
    constructor(options) {
        this.options = options;
    }
    run() {
        // 获取当前的工作目录
        this.root = process.cwd();
        // 获取入口文件路径
        let {
            entry
        } = this.options;
        // 记录入口文件Id
        this.entryId = null;
        //记录模块ID和内容的对应关系，所有的ID都是相对于根目录的
        this.modules = {};
        this.buildModules(path.resolve(this.root, entry), true);
        console.log(this.modules);
        this.emitFiles();
    }

    // 生成文件
    emitFiles() {
        let mainTemplate = fs.readFileSync(path.join(__dirname, 'main.ejs'), 'utf8');
        let {
            entryId,
            modules
        } = this;
        let main = ejs.compile(mainTemplate)(entryId, modules);
        let {
            output: {
                path: dist,
                filename
            }
        } = this.options;
        // 写文件
        fs.writeFileSync(path.join(dist, filename), main);
    }

    //解析模块和依赖的模块，路径是一个绝对路径
    buildModules(modulePath, isEntry) {
        // 获取源代码
        let source = this.getSource(modulePath);
        //生成相对于工作根目录的模块ID
        let moduleId = './' + path.relative(this.root, modulePath);
        //如果是入口的话把ID赋给入口
        if (isEntry) {
            this.entryId = moduleId;
        }
        //获取AST的编译结果 依赖的模块 转换后的源代码
        let {
            sourcecode,
            dependencies
        } = this.parse(source, path.dirname(moduleId));
        this.modules[moduleId] = sourcecode;
        //递归解析依赖的模块
        dependencies.forEach(dependencie => this.buildModules(path.join(this.root, dependencie)));
    }

    //解析源代码  传入父路径
    parse(source, parentPath) {
        const ast = babylon.parse(source);
        let dependencie = [];
        traverse(ast, {
            CallExpression(p) {
                if (p.node.callee.name === 'require') {
                    let node = p.node;
                    node.callee.name = '__webpack_require__';
                    let modalName = node.arguments[0].value;
                    modalName += (modalName.lastIndexOf('.') > 0 ? '' : '.js');
                    let moduleId = './' + path.join(parentPath, modalName);
                    dependencie.push(moduleId);
                    node.arguments = [babelTypes.stringLiteral(moduleId)];
                }
            }
        })
        let sourcecode = generate(ast).code;
        return {
            sourcecode,
            dependencies
        }
    }

    // 读取文件内容
    // getSource(modulePath) {
    //     return fs.readFileSync(modulePath, 'utf8');
    // }

    getSource(modulePath){
        let self = this;
        let source = fs.readFileSync(modulePath, 'utf8');
        let { module: {rules} } = this.options;
        for(let rule of rules) {
            if(rule.test.test(modulePath)) {
                let loaders = rule.use;
                let loaderIndex = loaders.length - 1;
                function iteratorLoaders() {
                    let loaderName = loaders[loaderIndex--];
                    let loader = require(path.resolve(self.root, 'node_modules', loaderName));
                    source = loader[source];
                    // 递归迭代loader
                    if(loaderIndex >= 0) {
                        iteratorLoaders();
                    }
                }
                iteratorLoaders();
                break;
            }
        }
        return source;
    }
}

module.exports = Compiler;