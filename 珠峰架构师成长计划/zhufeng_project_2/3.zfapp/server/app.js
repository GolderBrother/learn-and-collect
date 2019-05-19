let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
//会话可 保存在很多地方 比内存，数据库redis mysql mongodb 文件
//let RedisStore = require('connect-redis')(session);
let app = express();
app.use(bodyParser.urlencoded({extended:true}));//解析form格式的请求体
app.use(bodyParser.json());//解析 json格式的请求
app.use(session({
  secret:'zfpx',
  resave:true,
  cookie:{
   maxAge:60*60*1000
  },
 // store: new RedisStore({url:'http://localhost:6379'}),
  saveUninitialized:true
}));
app.listen(3000);
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin','http://localhost:8080');
  res.header('Access-Control-Allow-Methods','GET,POST,OPTIOINS');
  res.header('Access-Control-Allow-Headers','Accept,Content-Type');
  res.header('Access-Control-Allow-Credentials','true');//允许客户端跨域发cookie
  if(req.method == 'options'){
    res.end('');
  }else{
    next();
  }
});
let sliders = require('./mock/sliders');
app.get('/api/sliders',function(req,res){
  res.json(sliders);
});
let lessons = require('./mock/lessons');
// '/api/lessons/react?offset=0&limit=5
app.get('/api/lessons/:category',function(req,res){
  let data = JSON.parse(JSON.stringify(lessons));
  let category = req.params.category;//取得分类名称
  let offset = req.query.offset;
  let limit = req.query.limit;
  offset = isNaN(offset)?0:parseInt(offset);
  limit = isNaN(limit)?5:parseInt(limit);
  //先拿条件过滤一下
  if(category != 'all'){
    data = data.filter(item=>item.category == category);
  }
  //pageSize  pageNumber
  // 10 第一页  0 5 第二页 5 10
  let list = data.slice(offset,offset+limit);//包前不包后 本页的条数
  let hasMore =   data.length > offset+limit;  //是否还有更多
  setTimeout(function(){
    res.json({code:0,data:{list,hasMore}});
   /*  if(Math.random()>.5){// code是1还是0来判断请求是成功还是失败
      res.json({code:0,data:{list,hasMore}});
    }else{
      res.json({code:1,error:'数据加载失败'});
    } */
   
  },1000);
});
let users = [];//比如说这就是我们的数据库了

app.post('/api/reg',function(req,res){
  let body = req.body;//{username,password} 
  body.id = users.length>0?users[users.length-1].id+1:1;
  users.push(body);
  res.json({
    code:0,
    success:'注册成功'
  });
});
//登录功能
app.post('/api/login',function(req,res){
  let user = req.body;//拿到请求体
  let oldUser = users.find(item=>item.username == user.username && item.password == user.password);
  if(oldUser){//如果找到对应的用户的话，说明登录成功了
     //把用户放在当前请求的会话中
     req.session.user = oldUser;
     res.json({
       code:0,
       success:'登录成功',
       user:oldUser
     });
  }else{
    res.json({
      code:1,
      error:'用户名或者密码错误'
    });
  }

});

app.get('/api/logout',function(req,res){
  //把当前用户的会话对象中的user属性删除，则意味着清除会话
  req.session.user = null;
  res.json({
    code:0,
    success:'退出成功'
  });
});
//客户端把它的cookie发过来，服务 器端看看此用户是否登录过，如果登录过则返回用户
app.get('/api/validate',function(req,res){
  let user = req.session.user;
  if(user){
    res.json({
      code:0,
      user,
      success:'自动登录成功'
    });
  }else{
    res.json({
      code:1,
      error:'此用户未登录'
    });
  }
});