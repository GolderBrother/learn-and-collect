// 6.1 事件发布/订阅模型 #
// 订阅事件实现了一个事件与多个回调函数的关联

const fs = require('fs');
const EventEmitter = require('events');
const eve = new EventEmitter();
let html = {};
eve.on("ready", function(key, value) {
    html[key] = value;
    if(Object.keys(html).length === 2) {
        console.log(`执行完成`, html);
        // { template: 'This is template', data: 'This is data' }
    }
})

function render() {
    fs.readFile('./static/template.txt', 'utf8', function(err, data){
        if(err){
            console.log(err);
            return
        }
        eve.emit('ready', 'template', data)
    })
    fs.readFile('./static/data.txt', 'utf8', function(err, data) {
        if(err) {
            console.log(err);
            return
        }
        eve.emit('ready', 'data', data)
    })
}

render();