let read = require('./read');
let write = require('./write');
let tagsUrl = 'https://juejin.im/subscribe/all';//所有的标签的列表
(async function(){
    let tags = await read.tags(tagsUrl);
    await write.tags(tags);
    let allArticles = {};
    for(let tag of tags){
        //先获取 每个标签下面的文章的列表
        let articles = await read.articles(tag.url,tag.name);
        //因为不同标签下面的文章可能有重复，所以说要去重
        articles.forEach(item=>allArticles[item.id] = item);
    }
    //Object.keys  Object.values Object.entries K/V数组
    await write.articles(Object.values(allArticles));
    process.exit();
})();