// 如果使用TCP协议服务器模拟一个WEBSOCKET服务 器
let net = require('net');
const crypto = require('crypto');
const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
//创建了一个tcp服务器,参数是一个socket对象
//tcp服务 器传输层，所以可以接收 http请求和 websocket 请求
/**
GET ws://localhost:8888/ HTTP/1.1\r\n
Upgrade: websocket\r\n
Sec-WebSocket-Version: 13\r\n
Sec-WebSocket-Key: j5aqZbr0As8kilhGM3uEIw==\r\n
\r\n
\r\n
请求体

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: vbklBT/qKsyC8+LP3Jgo/sXzCGM=
 */
let server = net.createServer(function(socket){
  console.log('socket');
  //监听客户端发过来的消息 once 表示只监听一次就销毁了
  socket.once('data',function(data){//data就是消息内容 ，是一个Buffer
    data = data.toString();
    //判断正则是否匹配，如果匹配的话，则认为这个请求是一个升级协议的请求
    if(data.match(/Upgrade: websocket/)){
        let rows = data.split('\r\n');
        rows = rows.slice(1,-2);
        const headers = {};
        rows.forEach(row=>{
            let [key,val] = row.split(': ');
            headers[key] = val;
        });
        if(headers['Sec-WebSocket-Version'] == 13){
            let SecWebSocketKey = headers['Sec-WebSocket-Key'];
            let SecWebSocketAccept = crypto.createHash('sha1').update(SecWebSocketKey+CODE).digest('base64');
            //握手的是时候是GET请求，是不支持请求，也不需要请求体 
            let response = [
                `HTTP/1.1 101 Switching Protocols`,
                `Upgrade: websocket`,
                `Connection: Upgrade`,
                `Sec-WebSocket-Accept: ${SecWebSocketAccept}`,
                `\r\n`
            ].join('\r\n');
            socket.write(response);
            //握手只有一次，后面就是不停的收发消息了 这个data就是消息了
            socket.on('data',function(buffers){//data Buffer
                //判断是否是结束帧 _fin是一个boolean
                let _fin = (buffers[0]&0b10000000) === 0b10000000;
                let _opcode = buffers[0]&0b00001111;//取得第一个字节的后四位，得到一是一个十进制数
                let _isMask = (buffers[1]&0b10000000) === 0b10000000;//判断是否有掩码操作
                let _payloadLength =  buffers[1]&0b01111111;//buffer1的后的七位代表负载 的长度
                let _mask = buffers.slice(2,6);//取得掩码 跳过前二个字段，取四个字节
                let _payload = buffers.slice(6);//hello 经过掩码处理过的hello
                if(_isMask){
                    mask(_payload,_mask);
                }
                //拼响应数据
                let response = Buffer.alloc(_payload.length+2);
                response[0] = _opcode | 0b10000000;
                response[1] = _payload.length;
                _payload.copy(response,2);
                socket.write(response);
            });
        }
    }
  });
});
function mask(buffers,mask){//buffer [1,2,3,4]
    for(let i=0;i<buffers.length;i++){
        buffers[i] ^= mask[i%4];
    }
}
server.listen(9999);

/**
GET ws://localhost:9999/ HTTP/1.1
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: gwcdA714VskoxFPo6mX/Ew==


HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: XlBaqgG5WiE271UQ4ywOhHE78pg=
 */