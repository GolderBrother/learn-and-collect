// 2.3 散列算法示例 #
const crypto = require('crypto');
// console.log(crypto);
let md5 = crypto.createHash('md5');//返回哈希算法
let md5Sum = md5.update('hello'); //指定要摘要的原始内容,可以在摘要被输出之前使用多次update方法来添加摘要内容
let result = md5Sum.digest('hex');
console.group(result);
// 5d41402abc4b2a76b9719d911017c592



