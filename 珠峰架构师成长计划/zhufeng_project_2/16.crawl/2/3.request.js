// 向服务器发送post请求,请求体的格式是表单格式 
const request = require('request');
let options = {
    url:'http://localhost:8080/form',//请求的URL地址
    method:'POST',//请求的方法
    json:true,//JSON，希望返回的数据是一个JSON格式的
    headers:{//请求头
        "Content-Type":'application/x-www-urlencoded'
    },
    form:{name:'zfpx',age:20}//请求体放在form里
}
request(options,function(err,response,body){
  console.log(err);
  console.log(body);
});