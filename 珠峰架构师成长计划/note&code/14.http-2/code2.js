// 1.7 获取客户端请求信息
// request
// method 请求的方法
// url 请求的路径
// headers 请求头对象
// httpVersion 客户端的http版本
// socket 监听客户端请求的socket对

const http = require('http');
const fs = require('fs');
const path = require('path');
// const server = http.createServer((req, res) => {
//     console.log(req);
//     if(req.url !== '/favicon.ico') {
//         let out = fs.createWriteStream(path.join(__dirname, './log/request.log'));
//         out.write(`method=${req.method}`);
//         out.write(`url=${req.url}`);
//         out.write(`headers=${JSON.stringify(req.headers)}`);
//         out.write(`httpVersion=${req.httpVersion}`);
//     }
// })

const server = http.createServer((req, res) => {
    let body = [];
    req.on('data', data => {
        body.push(data);
        console.log(data);
    });
    req.on('end', () => {
        let result = Buffer.concat(body);
        console.log(result.toString());
    })
})

server.listen(8080, '127.0.0.1', () => {
    console.log('The Server is listening on port 8080')
})

