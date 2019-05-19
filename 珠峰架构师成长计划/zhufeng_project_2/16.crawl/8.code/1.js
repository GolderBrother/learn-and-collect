let url = 'http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1';
let request = require('request');
let iconv = require('iconv-lite');
let cheerio = require('cheerio');
//告诉request我不需要你帮我把响应体的buffer二进制转成字符串
request({url,encoding:null},function(err,response,body){
    //把一个GBK的buffer转成一个utf8字符串
    body = iconv.decode(body,'gbk');
    let $ = cheerio.load(body);
    let movies = [];
    $('a.list-title').each(function(index,item){
        movies.push({
            title:$(this).text()
        });
    });
    console.log(movies);
});