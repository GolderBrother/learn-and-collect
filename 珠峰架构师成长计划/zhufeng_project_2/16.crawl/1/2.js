//request 是一个模块，封装的是http.request方法
let request = require('request');
let url = 'https://juejin.im/tag/%E5%89%8D%E7%AB%AF';
let fs = require('fs');
/* request(url,(err,response,body)=>{
    console.log(err);
    console.log(response.statusCode);
    console.log(body);
    fs.writeFileSync('tag.html',body);
}); */
request(url,(err,response,body)=>{
    let regexp = /class="title" data-v-\w+>(.+?)<\/a>/g;
    let titles = [];
    body.replace(regexp,(matched,title)=>{
        titles.push(title);
    });
    console.log(titles); 
});