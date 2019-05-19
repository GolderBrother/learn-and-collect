const fs = require("fs");
const path = require("path");
// 异步写入 #
// fs.writeFile(file, data[, options], callback)
// fs.writeFile("./temp/1.txt", Date.now() + '\n', (err, data) => {
//     if (err) {
//         console.log(err);
//         return
//     };
//     console.log(data);
// })

// 追加文件(追加内容)
// fs.appendFile(file, data[, options], callback)
// fs.appendFile('./temp/1.txt', Date.now() + '\n', function (err, data) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("ok")
// })

// 3.4 拷贝文件

// function copy(src, target) {
//     fs.readFile(src, function (err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(data);
//             fs.writeFile(target, data)
//         }
//     })
// }

// copy('./temp/1.txt', './temp/2.txt');

/**
 * 4. 从指定位置处开始读取文件 #
 * 4.1 打开文件
 * FileDescriptor 是文件描述符
 * FileDescriptor 可以被用来表示文件
 * in -- 标准输入(键盘)的描述符
 * out -- 标准输出(屏幕)的描述符
 * err -- 标准错误输出(屏幕)的描述符
 */
// fs.open('./1,txt', 'r', 0600, function (err, fd) {});


// fs.open(path.join(__dirname, 'temp/1.txt'), 'w', 0o666, function (err, fd) {
//     console.log(err); // null
//     const buf = Buffer.from("珠峰培训");
//     fs.write(fd, buf, 3, 6, 0, function (err, bytesWritten, buffer) {
//         console.log(bytesWritten); // 6
//         console.log(buf === bytesWritten); // false
//         console.log(buf.toString()); // 珠峰培训
//     })
// })

// 4.4 同步磁盘缓存 #
// fs.fsync(fd,[callback]);

// 4.5 关闭文件 #
// fs.close(fd,[callback]);

// const buf = Buffer.from("珠峰培训");
// fs.open('./temp/2.txt', 'w', function (err, fd) {
//     fs.write(fd, buf, 3, 6, 0, function (err, written, buffer) {
//         console.log(written);
//         fs.fsync(fd, function (err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 fs.close(fd, function (err) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log("写入完毕");
//                     }
//                 })
//             }

//         })
//     })
// })

// 4.6 拷贝文件
const BUFFER_SIZE = 1;

function copy(src, dest, callback) {
    const buf = Buffer.alloc(BUFFER_SIZE);
    fs.open(src, 'r', function (err, readFd) {
        fs.open(dest, 'w', function (err, writeFd) {
            ! function read() {
                fs.read(readFd, buf, 0, BUFFER_SIZE, null, function (err, bytesRead) {
                    if (err) {
                        console.log(err);
                        callback && callback(err);
                    } else if (bytesRead) {
                        fs.write(writeFd, buf, 0, bytesRead, read);
                        callback && callback("success");
                    }
                })
            }();
        })
    })
}
copy(path.join(__dirname, './temp/1.txt'), path.join(__dirname, './temp/2.txt'), (res) => {
    console.log(res)
})

console.log(path.extname(path.join(__dirname, './temp/1.txt')))

// 从后面往前面拼接，只要有一个是绝对路径(/)的，就停止往前面拼接
console.log(path.resolve('/a/b', '/c')); // f:\c
console.log(path.resolve('/a/b', './c')); // f:\a\b\c
console.log(path.resolve('./a/b', 'c')); // f:\front-end\front-end-study\course\zhufeng-study\珠峰架构师成长计划\note&code\10.fs\a\b\c
console.log(path.resolve('./b', 'c')); // f:\front-end\front-end-study\course\zhufeng-study\珠峰架构师成长计划\note&code\10.fs\b\c
console.log(path.resolve('./a', '/b', 'c', 'd')); // b\c\d