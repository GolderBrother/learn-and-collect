// 哨兵变量
const fs = require("fs");

const after = function (times, callback) {
    let result = {};
    return function (key, value) {
        result[key] = value;
        if (Object.keys(result).length === 2) {
            callback && callback(result)
        }
    }
}

const done = after(2, (result) => {
    console.log("执行2次后的结果为： ", result);
    // 执行2次后的结果为：  { template: 'This is template', data: 'This is data' }
})

function render() {
    fs.readFile('./static/template.txt', 'utf8', function (err, template) {
        if (err) {
            console.log(err);
            return;
        }
        done('template', template);
    })
    fs.readFile('./static/data.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        done('data', data);
    })
}

render();