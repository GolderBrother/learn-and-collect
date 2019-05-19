/**
GET ws://localhost:8888/ HTTP/1.1
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: j5aqZbr0As8kilhGM3uEIw==


HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: vbklBT/qKsyC8+LP3Jgo/sXzCGM=
 */
let crypto = require('crypto');
//这个字符串是协议本身定义好的，写死的一个字符串
const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const secWebsocketKey = 'j5aqZbr0As8kilhGM3uEIw==';
//先把请求头中的key拼接上CODE编码，经过hash计算得到字符串
const websocketAccept = crypto.createHash('sha1').update(secWebsocketKey+CODE).digest('base64');
console.log(websocketAccept);//vbklBT/qKsyC8+LP3Jgo/sXzCGM=

console.log(Math.pow(2,7)-1);//127 126 0~125
console.log(Math.pow(2,16)-1);//65535
console.log(Math.pow(2,64)-1);//18446744073709552000
//如果负载的长度是在0~125字节之间的，这7个位就可以表示了
//如果负载的长度大于125了。如果说2个字节能存的下，就可以设置为126.后面二个字节就是负载的长度了 
//如果说负载的长度二个字节也存不下,可以设置为127.那么后面的8个字节都 是负载的长度

let num = 7;
console.log(num%4);
console.log(num&3);//按位与
// 00000101
// 00000011
