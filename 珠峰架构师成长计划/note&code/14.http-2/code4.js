// 2. HTTP客户端
// 2.1 向其他网站请求数据
// let req = http.request(options,callback);
// req.on('request',callback);
// request.write(chunk,[encoding]);
// request.end([chunk],[encoding]);
// host 指定目标域名或主机名
// hostname 指定目标域名或主机名，如果和host都指定了，优先使用hostname
// port 指定目标服务器的端口号
// localAddress 本地接口
// socketPath 指定Unix域端口
// method 指定HTTP请求的方式
// path 指定请求路径和查询字符串
// headers 指定客户端请求头对象
// auth 指定认证部分
// agent 用于指定HTTP代理，在Node.js中，使用http.Agent类代表一个HTTP代理，默认使用keep-alive连接，同时使用http.Agent对象来实现所有的HTTP客户端请求

const http = require('http');
const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'GET'
}
const req = http.request(options, res => {
    console.log(res);
    console.log('状态吗:' + res.statusCode);
    console.log('响应头:' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log('响应内容',chunk);
    })
})
req.end();