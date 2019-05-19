// 异步串行钩子
// let {AsyncSeriesHook} = require('tapable');
class AsyncSeriesHook {
    constructor() {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    callAsync() {
        const args = Array.from(arguments);
        let count = 0,
            total = this.tasks.length,
            callback = args.pop();
        function done(err) {
            if(err) {
                return callback(err)
            }else if(++count === total){
                return callback()
            }
        }
        console.log(total);
        for(let i in total){
            let task = this.tasks[i];
            task(...args, done);
        }
    }
}

let queue = new AsyncSeriesHook(['name']);
console.time('cont');
queue.tap('1', function(name) {
    console.log(1, name)
})
queue.tap('2', function(name) {
    console.log(2, name)
})
queue.tap('3', function(name) {
    console.log(3, name)
})
queue.callAsync('james', err => {
    console.log(err);
    console.timeEnd('cont');
})