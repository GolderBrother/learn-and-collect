let express = require('express');
let bodyParser = require('body-parser');
const multer  = require('multer');
let upload = multer({upload:'upload'});
let app = express();
app.use(bodyParser.json());//这是处理JSON格式的请求体
app.use(bodyParser.urlencoded({extended:true}));//这是处理表单格式的请求体
app.post('/post',function(req,res){
  let body = req.body;
  res.send(body);
});
app.post('/form',function(req,res){
    let body = req.body;
    res.send(body);
});
//multer
app.post('/upload',upload.single('avatar'),function(req,res){
  console.log(req.file);//req.file指的是请求体formData里的avatar字段对应的文件内容
  res.send(req.body);
});
app.listen(8080);