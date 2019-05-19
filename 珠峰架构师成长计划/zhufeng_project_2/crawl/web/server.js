let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let {checkLogin} = require('./middleware/auth');
const elasticsearch = require('../elasticsearch');
let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
  resave:true,//每次都要重新保存session
  saveUninitialized:true,//保存未初始化的session
  secret:'zfpx'//指定秘钥
}));
app.use(function(req,res,next){
  res.locals.user = req.session.user;
  next();
});
let path = require('path');
let query = require('../db');
let debug = require('debug')('crawl:web:server');
app.set('view engine','html');
app.set('views',path.resolve(__dirname,'views'));
app.engine('html',require('ejs').__express);
app.get('/',async function(req,res){
  let tagId = req.query.tagId;  
  let tags = await query(`SELECT * FROM tags`);  //查询所有的标签对象
  tagId = tagId||tags[0].id;                        //查询标签的ID
  let articles = await query(`SELECT articles.* FROM article_tag INNER JOIN articles ON article_tag.article_id=articles.id WHERE article_tag.tag_id = ?`,[tagId]);
  res.render('index',{
    tags,
    articles
  }); 
});
app.get('/detail/:id',async function(req,res){
  let id = req.params.id;
  let articles = await query(`SELECT * FROM articles WHERE id =? LIMIT 1`,[id]);
  res.render('detail',{article:articles[0]});
});
//当客户端以get方式访问/login请求的时候执行回调函数
app.get('/login',async function(req,res){
 res.render('login',{title:'登录'});
});
app.post('/login',async function(req,res){
  let {email} = req.body;
  let oldUsers = await query(`SELECT * FROM users WHERE email = ? LIMIT 1`,[email]);
  let user;
  if(Array.isArray(oldUsers) && oldUsers.length >0){
    user = oldUsers[0];
  }else{
    let result = await query(`INSERT INTO users(email) VALUES(?)`,[email]);
    user = {id:result.insertId,email}
  }
  req.session.user = user;
  res.redirect('/');//如果登录成功，则把当前的用户信息放在会话中，并且重定向到首页
});
//订阅
app.get('/subscribe',checkLogin,async function(req,res){
  let tags = await query(`SELECT * FROM tags`);
  let user = req.session.user;//拿到当前会话中的user属性
  let userTags = await query(`SELECT tag_id FROM user_tag WHERE user_id = ? `,[user.id]);
  let userTagIds = userTags.map(item=>item.tag_id);//[1,2,3]
  tags.forEach(tag=>{
    tag.checked = userTagIds.indexOf(tag.id)!=-1?"true":"false";
  });
  res.render('subscribe',{title:'请订阅你感兴趣的标签',tags});
});

app.post('/subscribe',checkLogin,async function(req,res){
   let {tags} = req.body;//[1,2,3]
   let user = req.session.user;
   await query(`DELETE FROM user_tag WHERE user_id = ?`,[user.id]);
   for(let i=0;i<tags.length;i++){
     await query(`INSERT INTO user_tag(user_id,tag_id) VALUES(?,?)`,[user.id,parseInt(tags[i])]);
   }
   res.redirect('back');
});

app.get('/search',async function(req,res){
  res.render('search',{title:'搜索',articles:[]});
});
app.post('/search',async function(req,res){
  let {keyword} = req.body;
  let result = await elasticsearch.search({
    index:'crawl',
    type:'article',
    body:{
      query:{
        match:{
          title:keyword
        }
      }
    }
  });
  let hits = result.hits.hits;
  let articles = hits.map(item=>item._source);
  res.render('search',{title:'搜索',articles});
});
//CronJob是用来实现定时任务的
let CronJob = require('cron').CronJob;
//spawn是用来实现子进程的
let {spawn} = require('child_process');
//每隔30分钟执行一次
 let job = new CronJob('1 */30 * * * *',function(){
    debug('开始执行更新的计划任务');// node ../main.js
    let child = spawn(process.execPath,[path.resolve(__dirname,'../main')]);
    child.stdout.pipe(process.stdout);//把子进程里的正常输出重定向到父进程里
    child.stderr.pipe(process.stderr);//把子进程里的错误输出重定向到父进程里
    child.on('close',function(){
        console.log('更新任务完毕');
    });
}); 

app.listen(3000);