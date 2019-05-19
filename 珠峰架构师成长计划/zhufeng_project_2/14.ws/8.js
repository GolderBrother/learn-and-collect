let express = require('express');
let app = express();
//当客户端访问 http://localhost:3000/5.html
app.use(express.static(__dirname));
//http服务器
app.listen(3000);