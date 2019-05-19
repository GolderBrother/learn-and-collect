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
User.find({age:22},function(err,docs){
    console.log(docs);
});
//update的时候即使没有用更新操作符$set,也可只更新指定的字段，不会整体覆盖
User.update({name:'zfpx1'},{age:111},function(err,result){
    console.log(err);
    console.log(result);
});
*/
User.deleteOne({name:'zfpx2'},function(err,result){
    console.log(err);
    console.log(result);
});
User.deleteMany({name:'zfpx3'},function(err,result){
    console.log(err);
    console.log(result);
});

