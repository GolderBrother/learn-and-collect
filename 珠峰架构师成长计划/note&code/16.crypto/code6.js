const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
let private = fs.readFileSync(path.join(__dirname, 'rsa_private.key'), 'ascii');
let public = fs.readFileSync(path.join(__dirname, 'rsa_public.key'), 'ascii');
let str = 'zhufengpeixun';
let sign = crypto.createSign('RSA-SHA256');
sign.update(str);
let signed = sign.sign(private, 'hex');
let verify = crypto.createVerify('RSA-SHA256');
verify.update(str);
let verifyResult = verify.verify(public,signed,'hex'); //true
console.log(verifyResult);