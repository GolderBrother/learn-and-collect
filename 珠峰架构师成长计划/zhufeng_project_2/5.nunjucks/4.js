let nunjucks = require('nunjucks');
nunjucks.configure({autoescape:true});
/**
 * 1.变量
 * 2.过滤器 join replace
 */

let ret = nunjucks.renderString('{{names|join(",")}}',{names:['1','2','3']});
console.log(ret);
let ret2 = nunjucks.renderString('{{name|replace("world","you")|capitalize}}',{name:'hello world'});
console.log(ret2);