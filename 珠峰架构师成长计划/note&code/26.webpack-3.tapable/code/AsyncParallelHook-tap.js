// let {AsyncParallelHook } = require('tapable');
class AsyncParallelHook {
    constructor() {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args = Array.from(arguments);
        // 获取回调函数
        let callback = args.pop();
        this.tasks.forEach(task => task(...args));
        (typeof callback === 'function') && callback();
    }
}

let queue = new AsyncParallelHook(['name']);
console.time('time');
queue.tap('1', name => {
    console.log(name, '1')
})
queue.tap('2', name => {
    console.log(name, '2');
})
queue.tap('3', name => {
    console.log(name, '3')
})
queue.callAsync('james', err => {
    console.log(err);
    console.timeEnd('time')
})

// james 1
// james 2
// james 3
// undefined
// time: 7.734ms