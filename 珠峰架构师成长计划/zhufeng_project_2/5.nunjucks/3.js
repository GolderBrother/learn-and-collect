let express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
let app = express();
nunjucks.configure(path.join(__dirname,'views'),{
    autoescape:true,
    express:app
});
app.get('/',function(req,res){
  res.render('index.html',{name:'zfpx'});
});
app.get('/layout',function(req,res){
  res.render('layout.html',{name:'layout'});
});
app.get('/about',function(req,res){
  res.render('about.html',{name:'about',users:[{id:1,name:'zfpx1'},{id:2,name:'zfpx2'}]});
});
app.get('/login',function(req,res){
  res.render('login.html',{name:'login'});
});
app.get('/home',function(req,res){
  res.render('home.html',{users:[{id:1,name:'zfpx1'},{id:2,name:'zfpx2'}]});
});
app.listen(3000);