let express = require('express');
let app = express();
app.get('/news',function(req,res){
  const list = [
        {title:'三位省委书记接连造访华为，有何深意？',image:'http://dingyue.nosdn.127.net/QXmemb11Nd=8L2RtBhW4C6nREuzx55OsM0rw9QY5=N0em1544834913352.jpg',createAt:new Date()},
        {title:'ofo押金难退？网友爆料假装外国人押金秒退',image:'http://e0.ifengimg.com/10/2018/1214/D37737D5F84EFD3CFCB5D1DD7A96BFEA88719140_size64_w728_h638.jpeg',createAt:new Date()},
        {title:'“红通人员”蒋雷归案纪实：曾扬言“此生死也要死在新西兰”',image:'https://imgmini.eastday.com/pushimg/20181215/600x769_1544835900238041.jpg',createAt:new Date()}
  ]
  res.json(list);
});
app.listen(3000);