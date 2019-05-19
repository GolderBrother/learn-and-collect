// 6.5.2 async 函数的实现
const fs = require("fs");

function readFile(pathname) {
    return new Promise((resolve, reject) => {
        fs.readFile(pathname, 'utf8', (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data);
        })
    })
}



async function read() {
    const template = await readFile('./static/template.txt');
    const data = await readFile('./static/data.txt');
    return `${template}+${data}`;
}

// 等同于下面的
function read2() {
    return co(function* (){
        const template = yield readFile('./static/template.txt');
        const data = yield readFile('./static/data.txt');
        return `${template}+${data}`;
    })
}
read2().then(res => {
    // This is template+This is data
    console.log(res);
}, err => {
    console.log(err);
})


function co(gen) {
    const it = gen();
    return new Promise((resolve, reject) => {
        !function next(lastValue) {
            const {value, done} = it.next(lastValue);
            if(done) {
                resolve(value) 
            }else {
                // value： Promise { <pending> }
                value.then(next, reason => reject(reason));
            }
        }();
    })
}

