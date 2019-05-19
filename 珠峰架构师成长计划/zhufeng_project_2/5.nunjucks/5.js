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
 */
let str = (`
  {% if score > 90 %}
    优秀
  {% elseif score > 80 %}  
  良好 
  {% elseif score > 70 %}  
  中
  {% elseif score > 60 %}  
  及格
  {% else %}  
  不及格
  {% endif %}  
`);
let ret = nunjucks.renderString(str,{score:71});
console.log(ret);
