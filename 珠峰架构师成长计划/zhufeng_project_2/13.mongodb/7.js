//主外键关系
const mongoose = require('mongoose');
//mongoose是一个ORM工作 就是对象模型 工具，可以让我们像操作对象一样操作数据库
const conn = mongoose.createConnection('mongodb://localhost:27017/school',{ useNewUrlParser: true });
//定义一个Schema 定义数据库集合的骨架模型 相当于mysql中定义表的操作
let ObjectId = mongoose.Schema.Types.ObjectId;
function checkName(val){
  if(val && val.length >6 && val.length<12){
      return true;
  }else{
      return false;
  }
}
let UserSchema = new mongoose.Schema({
    //unique required enum match max min  validate
    name:{type:String,required:true,validate:checkName},
    age:Number,
    create:{type:Date,default:Date.now}
});

let User = conn.model('User',UserSchema);
let ArticleSchema = new mongoose.Schema({
    title:String,
    content:String,
    user:{type:ObjectId,ref:'User'}
});
let Article = conn.model('Article',ArticleSchema);

User.create({age:100,name:'zfpx'},function(err,doc){
  console.log(err);
});
/**
User.create({name:'zfpx100',age:100},function(err,doc){
  let _id = doc._id;
  Article.create({title:'标题',content:'内容',user:_id},function(err,doc){
      console.log(err,doc);
  });
});

 
//populate 填充的意思，就是把一个属性从一个外键(ObjectId)类型，转成一个对应的文档对象
 Article.findById('5c28839e68e6696d2475f6b2').populate('user').exec().then(function(doc){
   console.log(doc);
 });;
 */