const mongoose = require('mongoose');
const {
    DB_URL
} = require('../config');
const connection = mongoose.createConnection(DB_URL, {
    useNewUrlParser: true
});

module.exports = connection;