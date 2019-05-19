const cheerio = require('cheerio');
//如何读取元素的属性 prop attr
// prop用来表示那些固有的属性比如说checked selected
// attr 自定义属性 id class
const html = `
<input type="checkbox" checked="true"/>
<div data-apple-color="red" data-apple-price="10">苹果</div>
<input type="text" name="username" value="123" class="user"/>
`;
let $ = cheerio.load(html);
console.log($("input[type='checkbox']").prop('checked'));
console.log($('div').data());//{ appleColor: 'red', applePrice: 10 } 获取整个自定义对象
console.log($('div').data('apple-color'));//red 获取苹果颜色，就是获取 某个属性的意思
$('div').data('newcolor','green');
console.log($('div').data('newcolor'));
console.log($('input[name="username"]').val());
$('input[name="username"]').val('456');
console.log($('input[name="username"]').val());
console.log($('input[name="username"]').hasClass('user'));
//hasClass判断是否有某个类名 addClass增加类名 removeClass删除类名 
