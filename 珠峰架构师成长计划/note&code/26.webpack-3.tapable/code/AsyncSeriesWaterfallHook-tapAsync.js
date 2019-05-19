// let {AsyncSeriesWaterfallHook} = require('tapable');
class AsyncSeriesWaterfallHook {
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
        let next = (err, data) => {
            if(err) return finalCallback(err)
            let task = this.tasks[i++];
            if(task) {
                if(i == 1) {
                    task(...args, next)
                }else {
                    task(data, next)
                }
            }else {
                finalCallback(err, data);
            }
        }
        next();
    }
}
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cont')
queue.tapAsync('1', (name, callback) => {
    setTimeout(() => {
        console.log(name, 1);
        callback(null, 1)
    }, 1000)
})

queue.tapAsync('2', (name, callback) => {
    setTimeout(() => {
        console.log(name, 2);
        callback(null, 2)
    }, 2000)
})

queue.tapAsync('3', (name, callback) => {
    setTimeout(() => {
        console.log(name, 3)
        callback(null, 3)
    }, 3000)
})
queue.callAsync('james', (err, data) => {
    console.log(err, data);
    console.timeEnd('cont')
})

// 1
// 2
// 3
// null 3
// cont: 6018.620ms