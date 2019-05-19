// let {AsyncParallelBailHook} = require('tapable');
class AsyncParallelBailHook {
    constructor() {
        this.tasks = []
    }
    tapAsync(task) {
        this.tasks.push(task)
    }
    callAsync() {
        let args = Array.from(arguments);
        let finalCallback = args.pop();
        let count = 0,
            total = this.tasks.length;

        function done(err) {
            if (err) {
                return finalCallback(err)
            } else {
                if (++count === total) return finalCallback()
            }
        }
        for (let i = 0; i < total; i++) {
            let task = this.tasks[i];
            task(...args, done);
        }
    }
}

let queue = new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapAsync('1', function (name, callback) {
    console.log(1);
    callback('error')
})
queue.tapAsync('2', function (name, callback) {
    console.log(2);
    callback();
})
queue.tapAsync('3', function (name, callback) {
    console.log('3');
    callback();
})
queue.callAsync('james', err => {
    console.log(err);
    console.timeEnd('const')
})