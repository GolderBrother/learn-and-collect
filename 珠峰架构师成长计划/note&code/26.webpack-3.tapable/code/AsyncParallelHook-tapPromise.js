class AsyncParallelBailHook {
    constructor() {
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task)
    }
    promise() {
        let args = Array.from(arguments);
        let promises = this.tasks.map(task => task(...args));
        return Promise.all(promises);
    }
}

let queue = new AsyncParallelBailHook(['name']);
console.time('cont');
queue.tapPromise('1', function (name) {
    console.log(name);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(1);
            resolve();
        }, 1000)
    })
})
queue.tapPromise('2', function (name) {
    console.log(name);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            reject('err');
        }, 2000)
    })
})

queue.tapPromise('3', function (name) {
    console.log(name);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(3);
            resolve();
        }, 3000)
    })
})

queue.promise('james').then((res) => {
    console.log(res);
}, err => {
    console.log(err);
})

// james
// james
// james
// 1
// 2
// err
// 3