"use strict";
//generic type
function calculate(value) {
    return value;
}
//console.log(calculate<string>('zfpx'))
//console.log(calculate<number>(1));
//类的泛型 如何使用
var MyArray = /** @class */ (function () {
    function MyArray() {
        this.list = []; //定义一个私有的属性list 
    }
    MyArray.prototype.add = function (value) {
        this.list.push(value);
    };
    MyArray.prototype.max = function () {
        var ret = this.list[0];
        for (var i = 1; i < this.list.length; i++) {
            if (this.list[i] > ret) {
                ret = this.list[i];
            }
        }
        return ret;
    };
    return MyArray;
}());
var arr = new MyArray();
arr.add('1');
arr.add('2');
arr.add('3');
console.log(arr.max());
