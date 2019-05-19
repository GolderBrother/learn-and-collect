const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
let shaSum = crypto.createHash('sha1');
let rs = fs.createReadStream('./readme.txt');
rs.on('data', (data) => {
    shaSum.update(data);
});
rs.on('end', () => {
    let result = shaSum.digest('hex');
    fs.writeFile(path.join(__dirname, './rsa_private.key'), result, (err, data) => {
        console.log(err, data);
    });
    // f78a71af8bbf8cc2f6f313549d4da14bd3771359
})