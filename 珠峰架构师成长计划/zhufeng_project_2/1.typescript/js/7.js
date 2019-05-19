"use strict";
/**
 * any 任何的值
 * void 是any的反面，不能有任何值
 * never 永远不会有返回值
 */
var ak = 10;
function say() { }
//这个函数一旦开始执行，就永远结束的时候，就进入 死循环
function sum() {
    while (true) {
        console.log(1);
    }
}
function multi() {
    throw Error('ok');
    var a = 10;
    var b = 10;
}
function divide(a, b) {
    return a / b;
}
divide(10, 2);
divide(10, 0);
