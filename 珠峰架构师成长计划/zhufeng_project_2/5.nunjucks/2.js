let nunjucks = require('nunjucks');
nunjucks.configure('views',{autoescape:true});
let ret = nunjucks.render('index.html',{name:'zfpx'});
console.log(ret);