//长轮训
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.get('/clock',function(req,res){
  setTimeout(function(){
    res.end(new Date().toLocaleString());
  },3000);
});
app.listen(8080);