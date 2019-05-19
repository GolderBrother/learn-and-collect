// 6.5 Async/ await
// 使用async关键字，你可以轻松地达成之前使用生成器和co函数所做到的工作

// 6.5.1 Async的优点
// 内置执行器
// 更好的语义
// 更广的适用性

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
    return `${template}+${data}`
}

const result = read();
console.log(result);
// Promise { <pending> }
result.then(res => {
    console.log(res);
    // This is template+This is data
}, err => {
    console.log(err);
})