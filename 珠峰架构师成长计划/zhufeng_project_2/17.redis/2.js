const redis = require('redis');
let client1 = redis.createClient(6379,'127.0.0.1');
let client2 = redis.createClient(6379,'127.0.0.1');
let count = 0;
client1.subscribe('channel_a');
client1.subscribe('channel_b');
client1.on('message',function(channel,message){
    //当收到第一条消息后之后，立刻取消订阅频道channel_b,那以后将不再接收频道B发过来的消息
    //不是立即取消b的吗？为什么还能收到world
   console.log(channel,message);
   client1.unsubscribe('channel_b');
});
client2.publish('channel_a','hello');
client2.publish('channel_b','world');
setTimeout(function(){
    client2.publish('channel_a','hello2');
    client2.publish('channel_b','world2');
},2000);