// 串行同步执行，有一个返回值不为null则跳过剩下的逻辑
// const {SyncBailHook} = require('tapable');
class SyncBailHook {
    constructor (){
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call() {
        // for(let i = 0, len = this.tasks.length;i<len;i++){
        //     let ret = this.tasks[i](...arguments);
        //     if(ret) break; 
        // }
        let i = 0, ret;
        do {
            // 箭头函数的arguments来源于上层普通函数
            ret = this.tasks[i++](...arguments);
        } while (!ret); // 串行同步执行，有一个返回值不为null则跳过剩下的逻辑
    }
}

let queue = new SyncBailHook(['name']);
queue.tap('1', name => {
    console.log(name, 1);
    return 'wrong'
})
queue.tap('2', name => {
    console.log(name, 2);
})
queue.tap('3', name => {
    console.log(name, 3)
})

queue.call('james')
// james 1
