// 2. UDP
// 2.1 创建socket
// let socket = dgram.createSocket(type,[callback]);
// socket.on('messsage',function(msg,rinfo){});
// type 必须输入，制定时udp4还是udp6

// 2.5 UDP服务器
const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
socket.on('message', (msg, rinfo) => {
    console.log(msg.toString());
    console.log(rinfo);
    socket.send(msg, 0, msg.length, rinfo.port, rinfo.address)
})
socket.bind(41234, 'localhost')

// 2.6 UDP客户端
const dgram2 = require('dgram');
const socket2 = dgram2.createSocket('udp4');
socket2.on('message', (msg, rinfo) => {
    console.log(msg.toString());
    console.log(rinfo);
})

socket2.setTTL(128);
socket2.send(new Buffer('james'), 0, 6, 41234, 'localhost', (err, bytes) => {
    console.log('发送了%s个字节', bytes);
})
socket2.on('error', err => {
    console.error(err);
})




