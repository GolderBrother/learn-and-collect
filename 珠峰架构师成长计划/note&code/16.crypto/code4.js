// 4. 对称加密
// blowfish算法是一种对称的加密算法,对称的意思就是加密和解密使用的是同一个密钥

let crypto = require('crypto');
const fs = require('fs');
const path = require('path');
let str = 'hello';
let cipher = crypto.createCipher('blowfish', fs.readFileSync(path.join(__dirname, './rsa_private.key')));
let encry = cipher.update(str, 'utf8', 'hex');
encry += cipher.final('hex');
console.log(encry);
// be57507ef1500154

let decipher = crypto.createDecipher('blowfish', fs.readFileSync(path.join(__dirname, './rsa_private.key')));
let decry = decipher.update(encry, 'hex', 'utf8');
decry += decipher.final('utf8');
console.log(decry);
// hello