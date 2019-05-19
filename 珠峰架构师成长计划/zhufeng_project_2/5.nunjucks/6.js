let nunjucks = require('nunjucks');
nunjucks.configure({autoescape:true});
/**
 * 1.变量
 * 2.过滤器 join replace
 * 3.if 
 *   > 90 优秀
 *   > 80 良好 
 *   > 70 中
 *   > 60 及格
 *        不及格
 * 4.循环
 */
let str = (`
  <ul>
     {% for item in users %}
        <li>{{loop.index0}} -   {{item.id}} {{item.name}}</li>
     {% endfor %}
  </ul> 
`);
let ret = nunjucks.renderString(str,{users:[{id:1,name:'zfpx1'},{id:2,name:'zfpx2'}]});
console.log(ret);
