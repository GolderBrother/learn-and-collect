let chalk = require('chalk');
let colors = ['red','green','yellow','blue','cyan'];
function getRandomColor(){
    let index = Math.floor(Math.random()*colors.length);
    return chalk[colors[index]];
}
function debug(name){
    return function(){
        let start = Date.now();
        let args = Array.from(arguments);
        let DEBUG = process.env.DEBUG;//当前环境变量中的debug的值
        if(DEBUG.indexOf('*')==-1){
            if(DEBUG == name){
                args = [getRandomColor()(name),...args,getRandomColor()(`+${Date.now()- start }ms`)];
                console.log.apply(console,args);
            }
        }else{
            DEBUG = DEBUG.replace('*','\w*');
            let reg = new RegExp(DEBUG);
            if(reg.test(name)){
                args = [getRandomColor()(name),...args,getRandomColor()(`+${Date.now()- start }ms`)];
                console.log.apply(console,args);
            }
        }
        
    }
}
module.exports = debug;