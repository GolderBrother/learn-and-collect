// 6.4.2 Co
// co是一个为Node.js和浏览器打造的基于生成器的流程控制工具，借助于Promise，你可以使用更加优雅的方式编写非阻塞代码。
const fs = require("fs");
function readFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if(err) return reject(err);
            resolve(data);
        })
    })
}

function* read(){
    const template = yield readFile('./static/template.txt');
    const data = yield readFile('./static/data.txt');
    return `${template}+${data}`;
} 

co(read).then(res => {
    // This is template+This is data
    console.log(res);
}, err => {
    console.log(err);
})

function co(gen) {
    const it = gen();
    return new Promise((resolve, reject) => {
        !function next(lastVal) {
            console.log(lastVal);
            // undefined
            // This is template
            // This is data
            // This is template+This is data
            // next 方法还可以接受参数，这是向 Generator 函数体内输入数据
            let {value, done} = it.next(lastVal);
            if(done) {
                resolve(value)
            }else {
                value.then(next, reason => reject(reason))
            }
        }(); 
    })
}

