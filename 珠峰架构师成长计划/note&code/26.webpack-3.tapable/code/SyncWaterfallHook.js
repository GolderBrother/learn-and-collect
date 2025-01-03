// const {SyncWaterfallHook} = require('tapable');
class SyncWaterfallHook {
    constructor() {
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call() {
        let [first, ...tasks] = this.tasks;
        tasks.reduce((ret, task) => task(ret), first(...arguments))
    }
}

let queue = new SyncWaterfallHook(['name']);
queue.tap('1', function(name, age) {
    console.log(name, age, 1);
    return 1;
})
queue.tap('2', function(data) {
    console.log(data, 2);
    return 2;
})
queue.tap('3', function(data) {
    console.log(data, 3);
});

queue.call('james', 3)

// james 3 1
// 1 2
// 2 3




