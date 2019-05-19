var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,//限定的总的连接数
  host            : 'localhost',
  user            : 'root',
  password        : process.env.PASSWORD,
  database        : 'cms3'
});
pool.query("SELECT * FROM account",function(err,rows){
    if(err){
        console.error(err);
    }else{
        console.log(rows);
    }
    process.exit(0);
 } );