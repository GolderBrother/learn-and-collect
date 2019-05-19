const cheerio = require('cheerio');
//如何读取元素的属性
const html = `
<ul id="fruits">
 <li class="apple">苹果</li>
 <li class="banana">香蕉</li>
 <li class="pear">梨</li>
</ul>
`;
let $ = cheerio.load(html);
//查找元素 find children
//console.log($('#fruits').find('li').length)
//console.log($('#fruits').children('li').length)
//console.log($('li').slice(1).eq(0).text())//=> 'Orange'
//console.log($('li').slice(1, 2).length)//=> 1

//each
let fruits = [];
$('li').each(function(index,item){
    fruits.push($(this).text());
});
console.log(fruits.join(','));
//map函数返回的是一个类数组，而非数组
let lis = $('li').map(function(index,item){
    return $(this).text();
});
console.log(Array.from(lis).join(','));