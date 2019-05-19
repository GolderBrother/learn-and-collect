let request = `GET ws://localhost:8888/ HTTP/1.1
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: j5aqZbr0As8kilhGM3uEIw==

`;
let rows = request.split('\n');
console.log(rows);
rows = rows.slice(1,-2);
console.log(rows);
