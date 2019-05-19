let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let conn = mongoose.createConnection('mongodb://localhost/chat');
let MessageSchema = new Schema({
    username:{type:String,required:true},
    content:{type:String},
    createAt:{type:Date,default:Date.now}
});
let Message = conn.model('Message',MessageSchema);

exports.Message = Message;