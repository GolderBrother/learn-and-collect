/**
 * 选择器
 */
const cheerio = require('cheerio');
const html = `
<ul id="fruits">
 <li class="apple">苹果</li>
 <li class="banana">香蕉</li>
 <li class="pear">梨</li>
</ul>
`;
let $ = cheerio.load(html);
console.log($('.apple','#fruits').text());

// let fruits = document.getElementById('fruits');
// fruits.getElementsByClassName('apple');