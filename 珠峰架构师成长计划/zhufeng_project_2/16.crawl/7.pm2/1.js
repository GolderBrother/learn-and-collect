let express = require('express');
let app = express();
app.get('/',function(req,res){
  res.send('index');
});
app.listen(9090);