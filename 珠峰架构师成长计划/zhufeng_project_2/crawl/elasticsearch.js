let elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
    host:'localhost:9200',
    log:'trace'
});
module.exports = client;