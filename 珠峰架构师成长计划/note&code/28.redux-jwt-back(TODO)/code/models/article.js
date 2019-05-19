const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = require('./index');
const ArticleSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    }
}, {
    timestamps: true
});

const Article = connection.mongoose('Article', ArticleSchema);

module.exports = Article;