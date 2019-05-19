let express = require('express');
let app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname,'public')));
//银行卡网
app.use(session({
    saveUninitialized:true,
    resave:true,
    secret:'zfpx'
}));
let users = [
    {username:'a',password:'123456',amount:100},
    {username:'b',password:'123456',amount:100}
];
app.post('/login',function(req,res){
    let body = req.body;
    let user = users.find(item=>item.username === body.username && item.password == body.password);
    if(user){
        req.session.user = user;
        res.json({code:0,user});
    }else{
        res.json({code:1,data:'登录失败'});
    }
});
//返回当前用户的余额
app.get('/user',function(req,res){
   let user = req.session.user;
   res.json(user);
});
app.post('/transfer',function(req,res){
  let {target,amount} = req.body;
  amount = isNaN(amount)?0:Number(amount);
  for(let i=0;i<users.length;i++){
      let user = users[i];
     
      if(user.username == req.session.user.username){
        console.log(req.session.user,user,amount);
        user.amount = user.amount- amount;
        req.session.user = user;
      }else if(user.username == target){
        user.amount += amount;
      }
  }
  res.json({code:0});
});
app.listen(3000,function(){
    console.log('server started at port 3000');
});
