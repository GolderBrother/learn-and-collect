const jwt = require('jsonwebtoken');
const {
    SERECT
} = require('../config');

// 签名
const sign = user => {
    return jwt.sign(user, SERECT, {
        expiresIn: 10 //过期时间：10秒
    })
}

// 校验
const verify = mustAdmin => (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, SERECT, (err, data) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        code: 1,
                        error: 'token已过期'
                    })
                } else {
                    return res.status(401).json({
                        code: 1,
                        error: 'token认证失败'
                    })
                }
            } else {
                // next(data);
                if (mustAdmin) {
                    const {
                        admin
                    } = data;
                    if (admin) {
                        next();
                    } else {
                        res.status(403).json({
                            code: 1,
                            error: '必须是管理员才能进行此项操作!'
                        })
                    }
                } else {
                    next()
                }
            }
        })
    } else {
        res.status(401).json({
            code: 1,
            error: '请提供token'
        })
    }
}

module.exports = {
    sign,
    verify
}