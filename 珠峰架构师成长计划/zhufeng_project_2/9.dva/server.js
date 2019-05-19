let express = require('express');
let cors = require('cors');
let app = express();
app.use(cors());
app.get('/amount',function(req,res){
 setTimeout(function(){
    res.json({code:0,data:3});
 },3000);
});
app.listen(8080);