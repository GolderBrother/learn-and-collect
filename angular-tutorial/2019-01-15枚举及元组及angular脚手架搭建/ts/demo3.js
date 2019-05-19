window.onload = function () {
    var name = 'sonia';
    function fun(name) {
        console.log('hello ' + name);
        return name;
    }
    ;
    fun(name);
    //对于可复用的方法   要兼容更多的类型
    function fun2(name) {
        console.log('hello ' + name);
        return name; //any存在问题，传入值的类型，但无法获取返回值 的类型
    }
    ;
    fun2(123);
    //泛型  是指在定义函数/接口/类时，不预先指定具体的类型，而在使用的时候再指定类型的一种特性；
    //T 泛型变量  表示任何类型
    function fun3(name) {
        console.log('hello ' + name);
        return name; //any存在问题，传入值的类型，但无法获取返回值 的类型
    }
    ;
    // fun3<string>('abc');   //定义了泛型函数后，使用方式传入参数
    //对类型进行了限定
    // fun3<string | number>('abc');    定义多个类型
    //第二种方式  类型推断   编译器会根据参数来自动判断类型
    fun3(123); //<number>
    //函数定义
    //函数声明
    function fun5(name) {
        return name;
    }
    //函数表达式
    var fun6 = function (name) {
        return name;
    };
    //ES6
    var fun7 = function (name) { return name; };
    //接口在函数中的运用
    function f1(obj) {
        console.log(obj.name);
    }
    f1({ name: 123 });
    function f2(obj) {
        console.log(obj.name);
    }
    f2({ name: '123' });
    var f3 = function (str1, str2) {
        var index = str1.indexOf(str2); //-1
        return index == -1; //true/false
    };
    f3('https://123.com', 'c');
    var f4 = function (str1, str2) {
        return str1 == str2; //true/false
    };
    f4(123, 456);
    function f5(name) {
        return name;
    }
    ;
    f5('123');
    //泛型在类中的运用
    var A2 = /** @class */ (function () {
        function A2(num) {
            this.n = num;
        }
        A2.prototype.action = function (x) {
            return x;
        };
        return A2;
    }());
    ;
    var a2 = new A2('我们'); //实例化 
    console.log(a2.n);
    //数组泛型 也可以使用数组泛型 Array<elemType> 来表示数组
    var arr = [1, '1', true, 3, 5]; //number[]
    //这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型
    function createArray(length, value) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    createArray(3, 'x'); //['x','x','x']
    //我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，
    //在后面的输入 value: T 和输出 Array<T> 中即可使用了。
    function createArray2(length, value) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    createArray2(3, 'x');
};
