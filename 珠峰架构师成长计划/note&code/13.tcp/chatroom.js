/**
 * 1.创建一个服务器
 * 2. 客户端可以连接服务器
 * 3.客户端可以发言，然后广播给大家
 * 4.客户端连接和退出后都要通知大家。
 * 5.显示当前的在线人数
 */
const net = require('net');
const util = require('util');
let clients = {};
const server = net.createServer(socket => {
    server.getConnections((err, count) => {
        console.log(`weclome, There is ${count} users now, please input your nickname\r\n`);
    });
    let nickname;
    socket.setEncoding('utf8');
    socket.on('data', function(data) {
        data = data.replace(/\r\n/, '');
        if(data == 'byebye') {
            socket.end();
        }else{
            if(nickname){
                broadcast(nickname, `${nickname}:${data}`)
            }else {
                nickname = data;
                clients[nickname] = socket;
                broadcast(nickname, `Welcome ${nickname} joined us!`)
            }

        }
    })

    socket.on('close', function() {
        socket.destroy();
    })
}).listen(8080);

function broadcast(nickname, msg) {
    for(let key in clients) {
        if(key !== nickname) {
            clients[key].write(msg);
            clients[nickname].destroy();
            delete clients[nickname];
        }
    }
}