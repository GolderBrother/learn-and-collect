// 3. HMAC算法 #
// HMAC算法将散列算法与一个密钥结合在一起，以阻止对签名完整性的破坏
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
let pem = fs.readFileSync(path.join(__dirname, './rsa_private.key'));
let private_key = pem.toString();
let hmac = crypto.createHmac('sha1', private_key);
let rs = fs.createReadStream(path.join(__dirname, './1.txt'));
rs.on('data', data => {
    hmac.update(data)
})
rs.on('end', () => {
    let result = hmac.digest('hex');
    console.log(result);
    // fe4efd1d2153bafd3872484765e4abaf4f324023
})