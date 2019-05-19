// let { AsyncSeriesBailHook } = require('tapable');
class AsyncSeriesBailHook {
    constructor(){
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync() {
        let args = Array.from(arguments);
        let finalCallback = args.pop();
        let index = 0,
            len = args.length;
        try {
            // abc
            let next = () => {
                console.log(...args)
                let task = args[index++];
                if(task && typeof task === "function") {
                    task(...args, next);
                }else {
                    finalCallback();
                }
            }
            next();
        } catch (error) {
            finalCallback(error);
        }
    }
}

let queue = new AsyncSeriesBailHook(['name']);
console.time('cont');
queue.tapAsync('1', (name, callback) => {
    setTimeout(() => {
        console.log('1')
        callback()
    }, 1000)
})
queue.tapAsync('2', (name, callback) => {
    setTimeout('2', () => {
        console.log('2');
        callback();
    })
})

queue.tapAsync('3', (name, callback) => {
    setTimeout(() => {
        console.log('3');
        callback()
    }, 3000)
})

queue.callAsync('james', (err) => {
    console.log('end', err);
    console.timeEnd('cont');
})

// james
// end undefined
// cont: 3.006ms

