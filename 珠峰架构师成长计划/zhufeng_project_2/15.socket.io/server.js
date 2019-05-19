/**
 * websocket是依赖http服务器的
 * 1. 一方面我们还需先创建一个http服务 器，提供握手，静态文件服务 等功能
 */
let express = require('express');
let path = require('path');
let {Message} = require('./model');
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

io.on('connection',async function(socket){//每个客户端都会有一个socket对象
  //在函数内部定义一个变量，存放着此用户的用户名
  let username;
  //数组里存放着此socket对象所在的房间列表 ['red','green']
  let rooms = [];
  //监听客户端发过来的消息
  socket.on('message',async function(message){
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
        let doc = await Message.create({
          username,
          content:message
        });
        //如果此用户已经在房间内了，则需要向房间内广播，而非全局广播 
        if(rooms.length>0){
          //循环房间的数组，向房间内的所有的客户端进行广播
           rooms.forEach(room=>{
             io.in(room).emit('message',doc);
           });
        }else{//如果不在任何一个房间，则认为是在大厅里，则还是全局广播
          io.emit('message',doc);
        }
      }
    }else{
      username = message;//用户第一次发消息，会把消息的内容当成用户名
      //当用户名被赋值之后就可以建立用户名和socket对象的关联
      ALL_USERS[username] = socket;
      io.emit('message',{
        username:SYSTEM,
        content:`欢迎${username}加入聊天室`,
        createAt:new Date()
      });
    }
  });
  //加入某个房间 一个客户端可以同时在多个房间内
  socket.on('join',function(roomName){
    let index = rooms.findIndex(item=>item === roomName);
    if(index == -1){
      socket.join(roomName);//把当前的客户端加入到房间内
      rooms.push(roomName);
      socket.emit('message',{
        username:SYSTEM,
        content:`你已经成功的加入到了${roomName}房间内`,
        createAt:new Date()
      });
      socket.broadcast.to(roomName).emit('message',{
        username:SYSTEM,
        content:`${username}已经成功的进入了${roomName}房间`,
        createAt:new Date()
      });
      //告诉 客户端我已经成功的进入了某个房间
      socket.emit('joined',roomName);
    }else{
      socket.emit('message',{
        username:SYSTEM,
        content:`别闹!你已经在这个房间内了`,
        createAt:new Date()
      });
    }
  });
  //离开某个房间
  socket.on('leave',function(roomName){
    let index = rooms.findIndex(item=>item === roomName);
    if(index == -1){
      socket.emit('message',{
        username:SYSTEM,
        content:`别闹!你根本就不在这个房间内了`,
        createAt:new Date()
      });
    }else{
      socket.leave(roomName);
      rooms.splice(index,1);
      //给自己发消息，告诉自己说自己离开了某个房间
      socket.emit('message',{
        username:SYSTEM,
        content:`你已经成功的离开了${roomName}房间`,
        createAt:new Date()
      });
      //告诉 其它 人我离开了这个房间
      //向房间内的其它人广播 说,不包括自己
      socket.broadcast.to(roomName).emit('message',{
        username:SYSTEM,
        content:`${username}已经成功的离开了${roomName}房间`,
        createAt:new Date()
      });
      //告诉 客户端我已经成功的离开了某个房间
      socket.emit('leaved',roomName);

    }
  });
  socket.on('getAllMessages',async function(){
    let messages = await Message.find().sort({createAt:-1}).limit(20);
    messages.reverse();
    socket.emit('allMessages',messages);
  });

  socket.on('room',function(roomName){
    let sockets = io.sockets.adapter.rooms[roomName].sockets;;
    let count = Object.keys(sockets);//[ 'ZXS51lyLyr5J7YSAAAAD', 'Msr2AzDQSdZi7l_fAAAE' ]
    //{ NbFM7HKTJZbmizQCAAAD: true }
    console.log(sockets,count);


  });
});

