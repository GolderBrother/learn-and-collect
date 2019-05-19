class AsyncSeriesBailHook {
    constructor(){
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args = Array.from(arguments)
        let finalCallback = this.tasks.pop();
        let index = 0,length = this.tasks;
        let next = () => {
            let task = this.tasks[index++];
            if(task) {
                task(...args, next)
            }else {
                finalCallback() 
            }
        };
        next();
    }
}

let queue = new AsyncSeriesBailHook(['name']);
console.time('cont');
queue.tapAsync('1', function(...args) {
    setTimeout(()=> {
        console.log(1, args);
    }, 1000)
})

queue.tapAsync('2', function(...args) {
    setTimeout(() => {
        console.log(2, args)
    }, 2000)
})

queue.tapAsync('3', function(...args) {
    setTimeout(() => {
        console.log(3, args)
    }, 3000)
})

queue.callAsync('james', err => {
    console.log(err);
    console.timeEnd('cont');
})