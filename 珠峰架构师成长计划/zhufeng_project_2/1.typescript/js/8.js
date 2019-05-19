"use strict";
function greeting(name) {
    console.log('hello', name);
}
greeting('zfpx');
//ts 形参和实参要完全一样
function greeting2(name, age) {
    console.log('hello', name, age);
}
greeting2('zfpx2');
function ajax(url, method) {
    if (method === void 0) { method = 'GET'; }
    console.log(method, url);
}
ajax('/user');
//剩余参数
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (val, item) {
        return val + item;
    }, 0);
}
var ret = sum(1, 2, 3, 4, 5);
console.log(ret);
