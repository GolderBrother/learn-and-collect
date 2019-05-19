const mongoose = require('mongoose');
//mongoose是一个ORM工作 就是对象模型 工具，可以让我们像操作对象一样操作数据库
const conn = mongoose.createConnection('mongodb://localhost:27017/school',{ useNewUrlParser: true });
//定义一个Schema 定义数据库集合的骨架模型 相当于mysql中定义表的操作
let UserSchema = new mongoose.Schema({
    name:String,
    age:Number
});
let User = conn.model('User',UserSchema);
/**
User.findOne({},{name:0},function(err,docs){
    console.log(err);
    console.log(docs);
});

User.findById('5c287a392594d823dcef6a96',function(err,docs){
    console.log(err);
    console.log(docs);
});

User.find({age:{$gt:3,$lt:6}},function(err,docs){
    console.log(err);
    console.log(docs);
});
//判断某个字段是否存在
User.find({age:{$exist:true}},function(err,docs){
    console.log(err);
    console.log(docs);
});
*/
let pageNum = 2;
let pageSize = 3;
//1.知道一共多少条 2.拿到当页的对象列表
User.find().skip((pageNum-1)*pageSize).limit(pageSize).sort({age:1}).exec((err,docs)=>{
  console.log(docs);
});
User.count(function(err,total){
   console.log(total);
});