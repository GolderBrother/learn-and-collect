// 2.7 制作代理服务器
const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
    const {path} = url.parse(req.url);
    const options = {
        host: 'localhost',
        port: 9090,
        path,
        headers: req.headers
    }
    const request = http.get(options, _res => {
        console.log(_res);
        res.writeHead(_res.statusCode, _res.headers);
        _res.pipe(res);
    });
    request.on('error', (err) => {
        console.log(err)
    });
    req.pipe(request);
}).listen(8080);