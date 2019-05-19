"use strict";
/**
 * 函数的重载
 * Java里面呢重载 是指两个或两个以上的函数，参数的个数和类型不一样
 * TS中的函数重载
 */
//函数的声明  只是用来限制参数的个数和类型
/* function attr(val:string):void;
function attr(val:number):void;
function attr(val:boolean):void; */
function attr(val) {
    if (typeof val == 'string') {
    }
    else if (typeof val == 'number') {
    }
    else if (typeof val == 'boolean') {
    }
}
attr('zfpx');
attr(10);
attr({});
function parse(str) {
    return JSON.parse(str);
}
var obj = parse('{"name":"zfpx"');
console.log(obj);
function multi(a, b) {
    return 1;
}
