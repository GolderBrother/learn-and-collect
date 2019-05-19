// 1.2 启动HTTP服务器
const http = require("http");
const server = http.createServer((req, res) => {
    // console.log(req, res);
    console.log()
});
// server.listen(8080, '127.0.0.1', () => {
//     console.log('The http server is listening on 8000');
// });

// 1.3 关闭HTTP服务器
// 监听http服务器关闭
server.on('close', () => {
    console.log('服务器关闭');
});
server.listen(8080, '127.0.0.1', () => {
    console.log('服务器端开始监听!');
    // server.close();
});

// 1.4 监听服务器错误
// server.on('error', (e) => {
//     console.log(e);
//     if(e.code == 'EADDRINUSE') {
//         console.log('端口号已经被占用!');
//     }
// });

// server.listen(8080, '127.0.0.1', () => {
//     console.log('服务器端开始监听!');
//     // server.close();
// });

// 1.5 connection
server.on('connection', () => {
    console.log('客户端连接已建立')
});

// 1.6 setTimeout #
// 设置超时时间，超时后不可再复用已经建立的连接，需要发请求需要重新建立连接。默认超时时间时2分钟
server.setTimeout(2, () => {
    console.log('setTimeout');
});
server.on('timeout', () => {
    console.log('连接已经超时');
})
