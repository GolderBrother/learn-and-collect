"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person2 = /** @class */ (function () {
    function Person2() {
    }
    //加上static表示这个属性是静态的属性，是属于类的属性，可以通过类名来调用
    Person2.getName = function () {
    };
    //静态属性
    Person2.myname = 'hello';
    return Person2;
}());
var p2 = new Person2();
console.log(Person2.myname);
console.log(Person2.getName);
//console.log(p2.getName);
var Animal2 = /** @class */ (function () {
    function Animal2() {
    }
    Animal2.prototype.speak = function () {
        throw new Error('这是一个抽象的方法，不能直接 使用');
    };
    return Animal2;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.speak = function () {
        console.log('小狗汪汪汪!');
    };
    return Dog;
}(Animal2));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.speak = function () {
        console.log('小猫喵喵喵!');
    };
    return Cat;
}(Animal2));
var dog = new Dog();
dog.speak();
var cat = new Cat();
cat.speak();
var Animal3 = /** @class */ (function () {
    function Animal3() {
    }
    return Animal3;
}());
var Cat3 = /** @class */ (function (_super) {
    __extends(Cat3, _super);
    function Cat3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat3.prototype.speak = function () {
        console.log('小猫喵喵喵!');
    };
    Cat3.prototype.speak2 = function () {
        console.log('小猫喵喵喵!');
    };
    return Cat3;
}(Animal3));
