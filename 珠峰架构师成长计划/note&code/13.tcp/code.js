const net = require('net');
const util = require('util');
// const server = net.createServer(function(socket) {
//     console.log(socket);
//     console.log('客户端已连接');
// })

// 可以使用listen方法通知服务器开始监听客户端的连接

// server.listen(port,[host],[backlog],[callback])
// port 必须指定的端口号
// host 指定需要监听的IP地址或主机名，如果省略的话服务器将监听来自于任何客户端的连接
// backlog指定位于等待队列中的客户端连接的最大数量，默认值为511
// server.listen('8080', 'localhost', 500, function(){
//     console.log('服务器开始监听');
//     console.log(server.address());
//     server.getConnections(function(err, num){
//         console.log(num)
//     })
// })

// let server = net.createServer(function(socket) {
//     server.getConnections((err, count) => {
//         server.maxConnections = 2;
//         console.log('最大连接数量%d, 当前连接数量%d', server.maxConnections, count);
//     });
//     const address = socket.address();
//     console.log('客户端地址%s', util.inspect(address));
// })

// server.listen('3000', 'localhost', function() {
//     console.log('服务器开始监听');
// })

// let server = net.createServer(function(socket) {
//     socket.setEncoding('utf8');
//     socket.on('data', function(data) {
//         console.log('本次收到的内容为%s, 累计收到的字节数为%d', data, socket.bytesRead);
//     })
// })

// server.listen('8080', 'localhost', 500, function(){
//     console.log('服务器开始监听');
//     console.log(server.address());
//     server.getConnections(function(err, num){
//         console.log(num)
//     })
// })

// 1.2.3 监听关闭事件 #
// let server = net.createServer(function(socket) {
//     socket.on('end', function() {
//         console.log('客户端已经关闭');
//     })
// })

// 1.2.4 pipe
// pipe方法可以将客户端发送的数据写到文件或其它目标中。




