let babel = require('babel-core');
let t = require('babel-types');
const code = `const sum = (a,b)=>a+b`;
// path.node  父节点
// path.parentPath 父路径
let transformArrowFunctions = {
    visitor: {
        ArrowFunctionExpression: (path, state) => {
            let node = path.node;
            let id = path.parent.id;
            let params = node.params;
            let body=t.blockStatement([
                t.returnStatement(node.body)
            ]);
            let functionExpression = t.functionExpression(id,params,body,false,false);
            path.replaceWith(functionExpression);
        }
    }
}
const result = babel.transform(code, {
    plugins: [transformArrowFunctions]
});
console.log(result.code);

// const sum = function sum(a, b) {
//     return a + b;
// };