// 1.2.2 向服务器端写入数据、end 、error、destroy,close
// write表示向服务器写入数据
// end 用于结束连接
// error 连接发生错误
// destroy 销毁流
// close 表示连接关闭成功，hasError=true代表有可能有错误
// socket.write(data,[encoding],[callback]);

const net = require('net');
const server = net.createServer(function(socket) {
    console.log('客户端已经连接');
    socket.setEncoding('utf8');
    socket.on('data', data => {
        console.log('已接收客户端发送的数据%s', data);
        socket.write(`服务器:${data}`);
    })
    socket.on('error', err => {
        console.log('与客户端通信过程中发生了错误，错误编码为%s', err.code);
    })
    socket.on('end', err => {
        console.log('客户端已关闭连接');
        socket.destroy()
    })
    socket.on('close', hasError => {
        console.log(hasError ? '异常关闭' : '正常关闭')
    })
})

// 服务端监听函数
server.listen(8080, 'localhost', function() {
    const _server = new net.Socket();
    _server.connect(8080, '127.0.0.1', function() {
        console.log('客户端已连接');
        _server.write('hello world');
        setTimeout(() => {
            _server.end('bye bye~~');
        }, 5000)
    })
    _server.on('data', data => {
        console.log('已经接收到客户端发送过来的数据%s', data);
    })
    _server.on('error', error => {
        console.log('与服务器通信过程中发生了错误，错误编码为%s', err.code);
    })
})