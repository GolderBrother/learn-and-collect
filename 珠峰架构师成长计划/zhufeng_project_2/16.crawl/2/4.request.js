//如果说我们要向服务器提交文件的话,multipart/form-data
const request = require('request');
const fs = require('fs');
let url = 'http://localhost:8080/upload';
let formData = {
  name:'zfpx',//有一个文件类型的值
  age:10,
  avatar:{//这是一个文件类型
    value:fs.createReadStream('avatar.png'),//这是一个可读流，存放着头像的内容 就是字节
    options:{
      filename:'avatar.png',
      contentType:'image/png'
    }
  }
}
request.post({url,formData},(err,response,body)=>{
  console.log(err);
  console.log(body);
});