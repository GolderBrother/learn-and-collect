"use strict";
var Dog5 = /** @class */ (function () {
    function Dog5(name) {
        this.name = name;
        this.name = name;
    }
    Dog5.prototype.speak = function (something) {
        console.log('小狗汪汪汪');
    };
    Dog5.prototype.fly = function () {
        console.log('坐在风口上，狗也可以飞起来!');
    };
    Dog5.prototype.machineFLy = function () {
        console.log('坐在火箭上飞!');
    };
    return Dog5;
}());
var dog5 = new Dog5('zfpx');
console.log(dog5);
dog5.fly();
