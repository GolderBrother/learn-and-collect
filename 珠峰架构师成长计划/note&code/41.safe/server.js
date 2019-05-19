const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3001;
const bodyParser = require("body-parser");
const svgCaptcha = require("svg-captcha");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));
fs.writeFile(path.join(__dirname, 'public/test.txt'), 'test', function (err, data) {
    if (err) {
        console.log(err);
        return
    }
    console.log(data);
})
app.get("/list", function (req, res) {
    let {
        category
    } = req.query;
    res.header('Content-Type', 'text/html;charset=utf-8');
    res.send(`您输入的分类是: ${category}`);
})

let comments = [{
        avatar: 'http://cn.gravatar.com/avatar/01459f970ce17cd9e1e783160ecc951a',
        username: '张三',
        content: '今天天气不错',
        time: new Date().toLocaleString()
    },
    {
        avatar: 'http://cn.gravatar.com/avatar/01459f970ce17cd9e1e783160ecc951a',
        username: '李四',
        content: '是的',
        time: new Date().toLocaleString()
    }
];

app.get('/api/comments', function (req, res) {
    res.json(comments);
})

app.post('/api/comments', function (req, res) {
    const comment = req.body;
    console.log(comment);
    comments.push({
        ...comment,
        avatar: 'http://cn.gravatar.com/avatar/01459f970ce17cd9e1e783160ecc951a',
        time: new Date().toLocaleString()
    });
    res.json(comments);
})
app.listen(PORT, () => {
    console.log(`The server is starting at port ${PORT}`);
})

let users = [{
    username: 'a',
    password: '123456',
    avatar: 'http://cn.gravatar.com/avatar/01459f970ce17cd9e1e783160ecc951a'
}, {
    username: 'b',
    password: '123456',
    avatar: 'http://cn.gravatar.com/avatar/01459f970ce17cd9e1e783160ecc951a'
}, {
    username: 'admin',
    password: 'admin',
    avatar: 'http://cn.gravatar.com/avatar/01459f970ce17cd9e1e783160ecc951a'
}];
let userSessions = {};
app.post("/api/login", function (req, res) {
    let {
        username,
        password
    } = req.body;
    let user = null;
    for (let _user of users) {
        if (username === _user.username && password === _user.password) {
            user = _user;
            break;
        }
    }
    if (user) {
        const sessionId = `user_${user.username}${Math.random() * 1000}`;
        res.cookie('username', user.username)
        res.cookie('sessionId', sessionId);
        userSessions[sessionId] = user;
        res.json({
            user,
            code: 0
        })
    } else {
        res.json({
            err: "没有该用户",
            code: 1
        })
    }
})

// 数据解析
// username=admin; sessionId=user_admin265.06551636412155
function getdescookie(strcookie,matchcookie){
    var getMatchCookie;
    var arrCookie=strcookie.split(";");
    for(var i=0;i<arrCookie.length;i++){
       var arr=arrCookie[i].trim().split("=");
       if(matchcookie == arr[0]){
          getMatchCookie = arr[1];
          break;
       }
    }
    return getMatchCookie;
  }

app.get("/api/user", (req, res) => {
    let {
        username
    } = userSessions[getdescookie(req.headers.cookie, "sessionId")];
    
    if (username) {
        let user;
        for (let _user of users) {
            if (username === users.username) {
                user = _user;
                break;
            }
        }
        res.json({
            user,
            code: 0
        })
    } else {
        res.json({
            err: "用户没有登录",
            code: 1
        })
    }
});

// refer 验证
app.get("/api/getReferer", (req, res) => {
     let referer = req.headers['referer'];
     console.log(referer);
     const URL_REG = /^http(s)?:\/\/localhost:3001/;
     if(URL_REG.test(referer)) {
 
     }else {
         res.json({
             code: 1,
             error: 'referer不正确'
         })
     }
})

// 转账
// token验证 
app.post("/api/transfer", (req, res) => {
    let {
        target,
        amout,
        captcha,
        clientToken
    } = req.body;
    let {
        username, token
    } = userSessions[getdescookie(req.headers.cookie, "sessionId")];
    console.log(username, token);
    amount = Number.isNaN(amount) ? 0 : amount;
    if (username) {
        if(token == clientToken) {
            let user;
            for (let _user of users) {
                let {
                    _username
                } = _user;
                if (username == _username) {
                    _user.money -= amount;
                } else if (target == _username) {
                    _user.money += amount;
                }
            }
            res.json({
                msg: "success",
                code: 0
            })
        }else {
            res.json({
                code: 1,
                err: "权限认证失败"
            })
        }
        
    } else {
        res.json({
            err: "用户没有登录",
            code: 1
        })
    }
})

// 获取验证码
app.get("/api/captcha", (req, res) => {
    let session = userSessions[getdescookie(req.headers.cookie, "sessionId")];
    if(session) {
        var codeConfig = {
            size: 5,// 验证码长度
            ignoreChars: '0o1i', // 验证码字符中排除 0o1i
            noise: 2, // 干扰线条的数量
            height: 44
        };
        var captcha = svgCaptcha.create({
            ...codeConfig
        });
        // 存session用于验证接口获取文字码,验证前端传过来的文字码是否正确
        session.captcha = captcha.text.toLowerCase();
        res.json({
            code: 0,
            captcha: captcha.data
        })
    }else {
        res.json({
            code: 1,
            err: '没有该用户'
        })
    }
})



