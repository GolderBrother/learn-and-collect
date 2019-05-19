let { AsyncSeriesBailHook } = require('tapable');
// 只要返回 undefined 就继续执行
let queue = new AsyncSeriesBailHook(['name']);
console.time('time')
queue.tap('1', name => {
    console.log(1, name)
})
queue.tap('2', name => {
    console.log(2, name)
})
queue.tap('3', name => {
    console.log(3, name)
    return 'wrong'
})
queue.callAsync('james', err => {
    console.log(err)
    console.timeEnd('time')
})

// 1 'james'
// null
// time: 6.256ms