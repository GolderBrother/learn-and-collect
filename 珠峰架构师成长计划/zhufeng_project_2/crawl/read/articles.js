let debug = require('debug')('crawl:read:tags');
let cheerio = require('cheerio');
let request = require('request-promise');
let articles = async function(url,tagName){
   debug(`开始读取${tagName}标签下面的文章列表`);
   let options = {
       url,
       transform:function(body){
         return cheerio.load(body);//$
       }
   }
   let $ = await request(options);
   let articles = [];
   let items = $('.item .title');
   for(let i=0;i<items.length;i++){
     let item = items[i];  
     let $this  = $(item);
     let href = $this.attr('href').trim();//取出超链接 /post/5c2f2fd66fb9a049ff4e43f0
     if(!href.startsWith('/entry')){
        let title = $this.text().trim();
        let id = href.match(/\/(\w+)$/)[1];
        href = `https://juejin.im`+href;
        let {content,tagNames} = await article(id,href);
        articles.push({
           id,
           title,
           href,
           content,
           tagNames//标签是一个名字的数组，是一个字符串的数组
        });
        debug(`读取到文章: ${title}`);
     }
   }
   return articles;
  // console.log(articles);
}

//articles('https://juejin.im/tag/%E5%89%8D%E7%AB%AF','前端');
//读取某个文章
let article = async function(id,url){
    debug(`开始读取文章内容`);
    let options = {
        url,
        transform:function(body){
          return cheerio.load(body);//$
        }
    }
    let $ = await request(options);
    let article = $('.main-container');
    let title = article.find('h1.article-title').text().trim();//文章的标题
    let content = article.find('.article-content').html();//文章的内容
    let tags = article.find('.tag-title');
    let tagNames = [];
    tags.each(function(index,item){
      let $this = $(item);
      let name = $this.text();
      tagNames.push(name);
    });
    return {
        id,
        title,
        content,
        tagNames
    }
}

exports.articles = articles;
exports.article = article;