// let { AsyncSeriesWaterfallHook } = require('tapable');
class AsyncSeriesWaterfallHook {
    constructor() {
        this.tasks = []
    }
    tapPromise(name, task) {
        this.tasks.push(task)
    }
    promise(...args) {
        let [first, ...task] = this.tasks;
        return task.reduce((a, b) => {
            return a.then(data => b(data))
        }, first(...args))
    }

}
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cont');
queue.tapPromise('1', name => {
    return new Promise(resolve => {
        console.log(name, 1);
        resolve(1)
    })
})
queue.tapPromise('2', name => {
    return new Promise(resolve => {
        console.log(name, 2);
        resolve(2)
    })
})
queue.tapPromise('3', name => {
    return new Promise(resolve => {
        console.log(name, 3)
        resolve(3)
    })
})
queue.promise('james').then(data => {
    console.log(data);
    console.timeEnd('cont')
})

// james 1
// 1 2
// 2 3
// 3
// cont: 7.906ms