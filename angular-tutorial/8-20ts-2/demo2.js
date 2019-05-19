var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.onload = function () {
    //类型别名  type
    function myHello(person) {
        return 'hello' + person;
    }
    ;
    var name = 'sonia';
    var a3;
    a3 = 'a3';
    a3 = [1, 2, 3];
    //a3=true;
    function myHello2(str) {
        return str.length;
    }
    ;
    //类  class  它包含属性和方法
    //es5中通过构造函数实现类的概念
    function Cat(name, color) {
        this.name = name;
        this.color = color;
        //this.type = '动物';
        // this.eat =function(){
        //     console.log('吃老鼠');
        // }
    }
    //原型中
    Cat.prototype.type = '动物';
    Cat.prototype.eat = function () {
        console.log('吃老鼠');
    };
    var cat1 = new Cat('大明', '黑色');
    var cat2 = new Cat('小明', '白色');
    //class 类
    //注意，方法之前不要添加逗号分隔
    var Cat2 = /** @class */ (function () {
        function Cat2(name, color) {
            this.name = name;
            this.color = color;
        }
        Cat2.prototype.eat = function () {
            return '吃老鼠';
        };
        Cat2.prototype.sayName = function () {
            return "my name is " + this.name;
        };
        return Cat2;
    }());
    var cat3 = new Cat2('小小明', '花色'); //类必须使用new调用，否则会报错 ，通过new生成新实例时，会自动调用构造函数
    console.log(cat3.eat());
    //static  静态方法  修饰符 不需要实例化，是可以直接通过类来调用
    var Cat4 = /** @class */ (function () {
        function Cat4() {
        }
        Cat4.eat = function (a) {
            return a;
        };
        return Cat4;
    }());
    ;
    //var c1 = new Cat4('aa');   //错误
    console.log(Cat4.eat('aa'));
    //类继承  
    //动物类
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        Animal.prototype.eat = function () {
            return '吃肉';
        };
        return Animal;
    }());
    ;
    //继承  extends 关键字实现继承  ，子类中使用super来调用父类的构造函数和方法
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog(name) {
            return _super.call(this, name) || this;
        }
        Dog.prototype.sayHi = function () {
            return this.name + ',' + _super.prototype.eat.call(this);
            //return this.name+','+this.eat()
        };
        return Dog;
    }(Animal));
    var d = new Dog('TT');
    console.log(d.sayHi());
    console.log(d.eat());
};
