const express = rquire('express');
const router = express.router;
const {
    verify
} = require('../utils/jwt');
const Article = require('../models/article');

// 发表文章
router.post("/post", verify(true), async (req, res, next) => {
    const article = new Article(req.body);
    try {
        await Article.save(article);
        res.json({
            code: 0,
            data: article
        })
    } catch (error) {
        res.status(500).json({
            code: 1,
            error
        })
    }
})

// 获取文章列表
router.get('/list', verify(), async (req, res) => {
    try {
        const articles = Article.find();
        res.json({
            code: 0,
            data: articles
        })
    } catch (error) {
        res.status(500).json({
            code: 1,
            error: error.message || error
        })
    }
})

module.exports = router;