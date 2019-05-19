let request = require('request');
//向服务 器发送一个GET请求，请求服务器的数据
request('http://www.baidu.com',function(err,response,body){
    console.log(response.statusCode);
});