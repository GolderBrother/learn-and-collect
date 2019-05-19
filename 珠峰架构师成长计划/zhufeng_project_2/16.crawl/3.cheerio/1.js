let html = `<h2 class="title">Hello World</h2>`;
const cheerio = require('cheerio');
const $ = cheerio.load(html);
$('h2.title').text('Hello zfjg');
$('h2').addClass('welcome');
console.log($.html());

