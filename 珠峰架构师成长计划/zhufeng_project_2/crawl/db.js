let mysql = require('mysql');
let Promise = require('bluebird');
let connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'crawl',
    user:'root',
    password:''
});
connection.connect();
module.exports = Promise.promisify(connection.query).bind(connection);
