const mongoose = require('mongoose');
//mongoose是一个ORM工作 就是对象模型 工具，可以让我们像操作对象一样操作数据库
const conn = mongoose.createConnection('mongodb://localhost:27017/school',{ useNewUrlParser: true });
conn.on('error',function(err){
    console.log('数据库连接失败',err);
});
conn.on('open',function(){
    console.log('数据库连接成功');
});
//1.创建一个集合的Schema,Schema中规定了集合的文档的属性名和属性类型 
//相当于mysql中设计表的操作，
let UserSchema = new mongoose.Schema({
    name:String,
    age:Number
});
// let map = {'User':UserModel}
//2.基于Schema创建模型 
let User = conn.model('User',UserSchema);
//User这个模型 有多的方法，可以操作数据库
//传递的字段如果比Schema中定义的多的话,会被忽略掉
//如果说传递的字段比Schema中定义少的话,则有几个保存几个
/**
User.create({name:'zfpx3'},function(err,doc){
  //err 错误对象  doc是保存后的文档对象
   console.log(doc);
    doc.age = 44;
    doc.save();
});
 */
//entity实体 实体代表某一个实例 个体
//User也是一个构造函数，也可创建实例 ，创建出来的实例我们称为Entity
//Cast to number failed for value "zfpx5" at path "age"
//mongodb 属于非关系型数据库 
let user5 = new User({
    name:5,//如果实际保存的值和定义的类型不一样，它先尝试进行类型转换，如果成功则OK，如果失败则报名
    age:'zfpx5'
});
user5.save(function(err,doc){
    console.log(err);
    console.log(doc);
    //doc.age = 44;
    //doc.save();
});




