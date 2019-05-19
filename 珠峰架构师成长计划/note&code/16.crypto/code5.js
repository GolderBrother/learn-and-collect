// 5. 非对称加密算法
// 为私钥创建公钥

// openssl rsa -in rsa_private.key -pubout -out rsa_public.key
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const key = fs.readFileSync(path.join(__dirname, './rsa_private.key')); // 私钥
const cert = fs.readFileSync(path.join(__dirname, './rsa_private.key')); // 公钥
const buffer = new Buffer()
let secret = crypto.publicDecrypt(cert, buffer);//公钥加密
let result = crypto.privateEncrypt(key, secret); //私钥解密
console.log(result.toString());