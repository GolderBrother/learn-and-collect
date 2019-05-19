// let {AsyncSeriesBailHook} = require('tapable');
class AsyncSeriesBailHook{
    constructor() {
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync() {
        let args = Array.from(arguments);
        let finalCallback = args.pop();
        let i = 0;
        let next = (err) => {
            // 只要返回不为空就退出
            if(err) return finalCallback(err); 
            let task = this.tasks[i++];
            task ? task(...args, next) : finalCallback();
        }
        next();
    }

}
let queue = new AsyncSeriesBailHook(['name']);
console.time('cont')
queue.tapAsync('1', (name, callback) => {
    setTimeout(() => {
        console.log(name);
        callback('wrong')
    }, 1000)
})
queue.tapAsync('2', (name, callback) => {
    setTimeout(() => {
        console.log(2);
    }, 1000)
})
queue.tapAsync('3', (name, callback) => {
    setTimeout(() =>{
        console.log(3);
    }, 3000)
})
queue.callAsync('james', data => {
    console.log(data);
    console.timeEnd('cont')
})
// james
// wrong
// cont: 1008.338ms