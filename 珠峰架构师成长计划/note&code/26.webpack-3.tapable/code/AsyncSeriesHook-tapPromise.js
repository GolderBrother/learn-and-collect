// let { AsyncSeriesHook } = require('tapable');
class AsyncSeriesHook {
    constructor() {
        this.tasks = [];
    }
    tapPromise(name, task) {
        console.log(name);
        this.tasks.push(task)
    }
    promise() {
        let args = Array.from(arguments);
        let [first, ...tasks] = this.tasks;
        return tasks.reduce((a, b) => {
            a && a.then(() => b())
        }, first(...args))
    }
}

let queue = new AsyncSeriesHook(['name']);
console.time('time')
queue.tapPromise('1', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(name);
            resolve(name);
        }, 1000)
    })
})
queue.tapPromise('2', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(name);
            resolve(name);
        }, 2000)
    })
})
queue.tapPromise('3', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(name);
            resolve(name);
        }, 3000)
    })
})
queue.promise('james', (data) => {
    console.log(data);
    console.timeEnd('time')
})

