// 监听函数返回true表示继续循环，返回undefine表示结束循环
class SyncLoopHook {
    constructor() {
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        this.tasks.forEach(task => {
            let ret = true;
            do {
                ret = task(...args);
            } while (ret && !(ret === undefined));
        })
    }
}
let queue = new SyncLoopHook(['name']);
let count = 0;
queue.tap('1', name => {
    console.log(count++);
    if(count == 3) {
        return;
    }else {
        return false;
    }
})
queue.call('james');
// 0