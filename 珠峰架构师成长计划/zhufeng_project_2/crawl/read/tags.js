let debug = require('debug')('crawl:read:tags');
let cheerio = require('cheerio');
let request = require('request-promise');
exports.tags = async function(url){
   debug('开始读取所有的标签列表');
   let options = {
       url,
       //这是一个转换函数，在request得到响应体之后会调用这个函数进行转换
       //transform:function(body){
       //  return cheerio.load(body);//$
      // }
   }
   let body = await request(options);
   let $ = cheerio.load(body);
   let tags = [];
   $('.item').each(function(index,item){
     let $this = $(this);
     let image = $this.find('div.thumb').first();//找到了图片所有的div
     let imageUrl = image.data('src');
     let indexOfSep = imageUrl.indexOf('?');
     if(indexOfSep!=-1){
        imageUrl = imageUrl.slice(0,indexOfSep);
     }
     let title = $this.find('.title').first();
     let name = title.text().trim();
     let subscribe = $this.find('.subscribe').first();//312369 关注
     let article = $this.find('.article').first();//28951 文章
     tags.push({
         image:imageUrl,//标签的图片地址
         name,//标签名
         url:`https://juejin.im/tag/${encodeURIComponent(name)}`,
         subscribe:Number(subscribe.text().match(/(\d+)/)[1]),//订阅数
         article:Number(article.text().match(/(\d+)/)[1])//文章数
     });
     debug(`读取到一个新的标签:${name}`);
   });;
   return tags.slice(0,5);
}

//exports.tags('https://juejin.im/subscribe/all');