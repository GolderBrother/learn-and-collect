const query = require('../db');
const debug = require('debug')('crawl:write:articles');
const elasticsearch = require('../elasticsearch');
const sendMail = require('../mail');
//保存文章的详情和文章和标签的关系
let articles = async function(articleList){
  debug(`写入文章列表`);
  for(let article of articleList){ //循环文章数组的每一个元素
    let oldArticles = await query(`SELECT * FROM articles WHERE id=? LIMIT 1`,[article.id]);
    let isNew;
    if(Array.isArray(oldArticles) && oldArticles.length >0){
        let oldArticle = oldArticles[0];
       await query(`UPDATE articles SET title=?,content=?,href=? WHERE id=?`,[article.title,article.content,article.href,article.id]);
    }else{
        //如果走到 这个分支，就意味着读取了新的文章。则认为文章就更新了
       await  query(`INSERT INTO articles(id,title,href,content) VALUES(?,?,?,?)`,[article.id,article.title,article.href,article.content]);
       isNew = true;
       //此入写入了新的文章，我就可以在此把新的文章插入到全文检索数据库中
       elasticsearch.create({
           index:'crawl',
           type:'article',
           id:article.id,
           body:article
       });
    }
    //处理文章和标签的关系 一般简单处理  全部删除 再全部插入
    await query(`DELETE FROM article_tag WHERE article_id = ?`,[article.id]);
    let where = "'"+article.tagNames.join("','")+"'";//['前端','后端']=>'前端','后端'=>('前端','后端')
    //按照标签的名称去查询标签 的数则个
    const tagSQL = `SELECT id FROM tags WHERE name IN  (${where})`;
    let tagIds = await query(tagSQL);//[{id:1},{id:2}]
    for(row of tagIds){
        await query(`INSERT INTO article_tag(article_id,tag_id) VALUES(?,?)`,[article.id,row.id]);
    }
    let tagIdsString = tagIds.map(item=>item.id).join(',');// 1,2
    if(isNew){
        //在此我们要向所有订阅了此标签的用户发送邮件
        const emailSQL = `SELECT distinct users.email FROM user_tag INNER JOIN users ON user_tag.user_id = users.id
        WHERE tag_id IN (${tagIdsString});`;
        const emails = await query(emailSQL);//[{email:'83687401@qq,com'}]
        for(let i=0;i<emails.length;i++){
            debug(`开始发送邮件`,emails[i].email,article.titl);
            sendMail(emails[i].email,`你订阅的文章更新了`,`<a href="http://localhost:3000/detail/${article.id}">${article.title}</a>`);
        }
    }
  }
}

module.exports = {
    articles
}