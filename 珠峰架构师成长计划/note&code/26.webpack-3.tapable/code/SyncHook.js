// const {SyncHook} = require('tapable');
class SyncHook {
    constructor() {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call() {
        // 箭头函数的arguments来源于上层普通函数
        this.tasks.forEach(task => task(...arguments));
    }
}

// 串行同步执行,不关心返回值
let queue = new SyncHook('name');
queue.tap('1', name => {
    console.log(name, 1)
})
queue.tap('2', name => {
    console.log(name, 2)
})
queue.tap('3', name => {
    console.log(name, 3)
})
queue.call('james');

// james 1
// james 2
// james 3