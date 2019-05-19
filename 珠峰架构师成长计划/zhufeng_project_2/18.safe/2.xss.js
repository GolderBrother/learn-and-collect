let express = require('express');
let app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname,'public')));
const AVATAR = 'http://cn.gravatar.com/avatar';
let comments = [
    {avatar:AVATAR,username:'张三',content:'hello',createAt:new Date()},
    {avatar:AVATAR,username:'李四',content:'world',createAt:new Date()}
]
app.get('/api/comments',function(req,res){
  res.json(comments);
});
app.post('/api/comments',function(req,res){
  let comment = req.body;
  comment.avatar = AVATAR;
  comment.createAt = new Date();
  comments.push(comment);
  res.json(comments);
});
app.listen(3000,function(){
    console.log('server started at port 3000');
});
