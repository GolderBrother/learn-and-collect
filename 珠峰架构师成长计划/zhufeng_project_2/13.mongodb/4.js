const mongoose = require('mongoose');
//mongoose是一个ORM工作 就是对象模型 工具，可以让我们像操作对象一样操作数据库
const conn = mongoose.createConnection('mongodb://localhost:27017/school',{ useNewUrlParser: true });
//定义一个Schema 定义数据库集合的骨架模型 相当于mysql中定义表的操作
let UserSchema = new mongoose.Schema({
    name:String,
    age:Number
});
let User = conn.model('User',UserSchema);
//准备10条数据进行查询
let users = [];
for(let i=1;i<=10;i++){
  users.push({id:i,age:i,name:`zfpx${i}`});
}

/* User.create(users).then(function(docs){
  console.log(docs);
}); */
(async function(){
 let docs = await User.create(users);
 console.log(docs);
})() 
