let express = require('express');
let app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname,'public')));
app.get('/search',function(req,res){
   let {category} = req.query;
   res.header('Content-Type','text/html;charset=utf8');
   res.send(`你输入的分类名称为: ${category}`);
});
app.listen(3000,function(){
    console.log('server started at port 3000');
});
