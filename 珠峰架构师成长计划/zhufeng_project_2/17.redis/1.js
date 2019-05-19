const redis = require('redis');
let client = redis.createClient(6379,'127.0.0.1');
//如果说出错的话，会把错误的对象打印在console.error里
client.on('error',function(err){
   console.error(err);
});
//可以正确的设置和读取字符串
client.set('name','zfpx',redis.print);
client.get('name',redis.print);
//这里是对哈希数据类型的操作
client.hset('person','name','zfpx',redis.print);
client.hget('person','name',redis.print);
//列表
client.lpush('links','a',redis.print);
client.lpush('links','b',redis.print);
client.lrange('links',0,-1,redis.print);
//集合
client.sadd('tags','a',redis.print);
//如何在redis中模拟对象操作
client.hset('person','name','zfpx',redis.print);
client.hset('person','age','10',redis.print);
client.hset('person','home','beijing',redis.print);
client.hkeys('person',(err,replies)=>{
    console.log(replies);
    let person = {};
    replies.forEach((key)=>{
        client.hget('person',key,(err,val)=>{
            person[key] = val;
            console.log(person);
        });
    });
  
});

client.multi().hset('user2','name','zfpx2').hset('user2','age',100).exec(redis.print);