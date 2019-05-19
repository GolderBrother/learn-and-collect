let express = require('express');
let app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname,'public')));
const AVATAR = 'http://cn.gravatar.com/avatar';
let users = [
    {username:'zfpx',password:'123456',avatar:AVATAR}
];
let sessions = {};
app.post('/api/login',function(req,res){
  let body = req.body;
  let user = users.find(item=>item.username=body.username && item.password==body.password);
  if(user){
     const sessionId = 'user_'+Math.random()*1000;
     res.cookie('username',user.username);
     res.cookie('sessionId',sessionId,{httpOnly:true});
     sessions[sessionId] = {};
     res.json({code:0,data:user});
  }else{
    res.json({code:1,data:'登录失败'});
  }
});
app.listen(3000,function(){
    console.log('server started at port 3000');
});
