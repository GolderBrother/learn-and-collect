let express = require('express');
let bodyParser = require('body-parser');
let jwt = require('jwt-simple');
let moment = require('moment');
let app = express();
app.use(bodyParser.json());
let users = [];
const JWT_SECRET = 'zfpx';
app.post('/signup',function(req,res){
  let user = req.body;
  users.push(user);
  res.json(user);
});
app.post('/signin',function(req,res){
    let user = req.body;
    let oldUser = users.find(item=>user.username == item.username && user.password == item.password);
    if(oldUser){
        let exp = moment().add(7,'days').valueOf();//得到一个距离 当前时间七天后的时间戳
        let token = jwt.encode({
            user:{username:user.username},
            exp
        },JWT_SECRET);
        res.json({code:0,data:token});
    }else{
        res.json({code:1,error:"登录失败"});
    }
});
//访问/user 的时候，要把用户信息解开返回
app.get('/user',function(req,res){
   let authorization = req.headers['authorization'];
   let token = authorization.split(' ')[1];
   let {user,exp} = jwt.decode(token,JWT_SECRET);
   if(Date.now()> exp){

   }else{
    res.json({code:0,data:user});
   }
   
});
app.listen(8080);