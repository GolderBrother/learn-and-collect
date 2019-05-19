let {AsyncSeriesWaterfallHook} = require('tapable');
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cont');
queue.tap('1', (name, callback) => {
    console.log(1)
})
queue.tap('2', (data) => {
    console.log(data);
})
queue.tap('3', data => {
    console.log(data)
})
queue.callAsync('james', err => {
    console.log(err);
    console.timeEnd('cont')
})

// 1
// james
// james
// null
// cont: 7.191ms