let mysql = require('mysql');
//创建配置对象
let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'cms3'
});

//开始连接数据库
connection.connect();
connection.query("SELECT * FROM account",function(err,rows){
   if(err){
       console.error(err);
   }else{
       console.log(rows);
   }
   process.exit(0);
} );