// 如何将类数组转换为真正的数组
// 1.用扩展运算符转换
var arrayLike = document.getElementsByTagName("p")
console.log(Array.isArray(arrayLike)); // false
var arr = [...arrayLike];
console.log(Array.isArray(arr)); // true

// 2.或者Array.from()方法
var arrayLike = document.getElementsByTagName("p")
console.log(Array.isArray(arrayLike)); // false
var arr = Array.from(arrayLike);
console.log(Array.isArray(arr)); // true


// 3.Array.prototype.slice.call(arguments)

var arrayLike = document.getElementsByTagName("p")
console.log(Array.isArray(arrayLike)); // false
var arr = Array.prototype.slice.call(arrayLike);
console.log(Array.isArray(arr)); // true

// 4.放到set对象中，在转换成数组
var arrayLike = document.getElementsByTagName("p")
console.log(Array.isArray(arrayLike)); // false
var arr = [...new Set(arrayLike)];
console.log(Array.isArray(arr)); // true