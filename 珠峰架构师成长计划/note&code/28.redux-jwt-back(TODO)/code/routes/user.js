const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.get('/users', (req, res) => {
    res.send('users');
});

// 用户注册
router.post('/signup', async (req, res) => {
    try {
        let User = new User(req.body);
        await User.save();
        req.json({
            code: 0,
            data: {
                id: User._id,
                username: User.username
            }
        })
    } catch (error) {
        res.status(403).json({
            code: 1,
            error: error.message || error
        })
    }
})

// 用户登录
router.post('/signin', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    try {
        const user = await User.findOne({
            username
        });
        if (user && user.comparePassword(password)) {
            res.json({
                code: 0,
                data: {
                    token: sign({
                        username: user.username,
                        admin: user.admin
                    })
                }
            })
        } else {
            res.status(403).json({
                code: 1,
                error: "用户名或密码错误"
            })
        }
    } catch (error) {
        res.status(403).json({
            code: 1,
            error: error.message || error
        })
    }
})

// 退出登录
router.get('logout', (req, res) => {
    res.json({
        code: 0,
        data: '退出登录成功'
    })
})
module.exports = router;