/**
 * websocket是依赖http服务器的
 * 1. 一方面我们还需先创建一个http服务 器，提供握手，静态文件服务 等功能
 */
let express = require('express');
let path = require('path');
let app = express();
app.use(express.static(__dirname));
app.get('/',function(req,res){
  res.sendFile(path.resolve(__dirname,'index.html'));
});
let server = require('http').createServer(app);

server.listen(80);


//socket.io是依赖http服务 器来实现握手操作
//io就代表我们的websocket服务器
//websocket服务器和http服务器共享了一个端口号
// http://localhost:80 ws://localhost:80
//node_modules\_socket.io-client@2.2.0@socket.io-client\dist\socket.io.js
let io = require('socket.io')(server);
//监听客户端的连接
//events EventEmitter  on('xxx'); emit('dd')
/**
 * 如何广播? io.emit('message',message);
 */
const SYSTEM = '系统';
const ALL_USERS= {};//这里存放着所有的对应关系 key=用户名 value=Socket对象
/**
 * 1. 情况下 你可以写一个计数器 
 * 2. 使用socket.io的客户端  let roomSockets = io.sockets.adapter.rooms[room].sockets;
 * 
 */

io.of('/').on('connection',function(socket){//每个客户端都会有一个socket对象
  //在函数内部定义一个变量，存放着此用户的用户名
  let username;
  //监听客户端发过来的消息
  socket.on('message',function(message){
    //console.log(message);
    //向客户端发送消息
    //socket.send('server:'+message);
    //socket.emit('message',message);
    //向所有的客户端进行广播
    if(username){
      let changeNameReg = /^changename:(.+)$/;
      let changeNameResult = message.match(changeNameReg);
      let privateReg = /^@(.+) (.+)$/;
      let privateResult = message.match(privateReg);
      if(changeNameResult){
        let newName = changeNameResult[1];
        io.emit('message',{
          username:SYSTEM,
          content:`用户[${username}]改名为[${newName}]`,
          createAt:new Date()
        });
        let oldSocket = ALL_USERS[username];
        delete ALL_USERS[username];
        username = newName;
        ALL_USERS[username] = oldSocket;
      }else if(privateResult){//如果这里进来了就是私聊
        let toUser = privateResult[1];
        let toContent = privateResult[2];
        let toScoket = ALL_USERS[toUser];//找对方用户名对应的socket对象
        if(toScoket){
          toScoket.emit('message',{
            username,
            content:toContent,
            createAt:new Date()
          });
        }else{
          socket.emit('message',{
            username:SYSTEM,
            content:`你想私聊的用户名${toUser}不存在!别瞎写`,
            createAt:new Date()
          });
        }

      }else{
        io.of('/').emit('message',{//第二次发消息就是普通发言了
          username,
          content:message,
          createAt:new Date()
        });
      }
    }else{
      username = message;//用户第一次发消息，会把消息的内容当成用户名
      //当用户名被赋值之后就可以建立用户名和socket对象的关联
      ALL_USERS[username] = socket;
      io.of('/').emit('message',{
        username:SYSTEM,
        content:`欢迎${username}加入聊天室`,
        createAt:new Date()
      });
    }
  });
});



io.of('/chat').on('connection',function(socket){//每个客户端都会有一个socket对象
  //在函数内部定义一个变量，存放着此用户的用户名
  let username;
  //监听客户端发过来的消息
  socket.on('message',function(message){
    //console.log(message);
    //向客户端发送消息
    //socket.send('server:'+message);
    //socket.emit('message',message);
    //向所有的客户端进行广播
    if(username){
      let changeNameReg = /^changename:(.+)$/;
      let changeNameResult = message.match(changeNameReg);
      let privateReg = /^@(.+) (.+)$/;
      let privateResult = message.match(privateReg);
      if(changeNameResult){
        let newName = changeNameResult[1];
        io.emit('message',{
          username:SYSTEM,
          content:`用户[${username}]改名为[${newName}]`,
          createAt:new Date()
        });
        let oldSocket = ALL_USERS[username];
        delete ALL_USERS[username];
        username = newName;
        ALL_USERS[username] = oldSocket;
      }else if(privateResult){//如果这里进来了就是私聊
        let toUser = privateResult[1];
        let toContent = privateResult[2];
        let toScoket = ALL_USERS[toUser];//找对方用户名对应的socket对象
        if(toScoket){
          toScoket.emit('message',{
            username,
            content:toContent,
            createAt:new Date()
          });
        }else{
          socket.emit('message',{
            username:SYSTEM,
            content:`你想私聊的用户名${toUser}不存在!别瞎写`,
            createAt:new Date()
          });
        }

      }else{
        io.of('/chat').emit('message',{//第二次发消息就是普通发言了
          username,
          content:message,
          createAt:new Date()
        });
      }
    }else{
      username = message;//用户第一次发消息，会把消息的内容当成用户名
      //当用户名被赋值之后就可以建立用户名和socket对象的关联
      ALL_USERS[username] = socket;
      io.of('/chat').emit('message',{
        username:SYSTEM,
        content:`欢迎${username}加入聊天室`,
        createAt:new Date()
      });
    }
  });
});
/* Socket.prototype.send = function () {
    var args = Array.from(arguments);//args =['server:hello']
    args.unshift('message');//在数组的队头插入一个元素['message',server:hello']
    socket.emit.apply(this, args);
    socket.emit('message','server:hello');
    return this;
  }; */