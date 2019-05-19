let express = require('express');
let app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname,'public')));
app.listen(4000,function(){
    console.log('server started at port 4000');
});
