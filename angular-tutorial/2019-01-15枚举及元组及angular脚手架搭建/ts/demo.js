window.onload = function () {
    var name = 'sonia';
    function fun(name) {
        console.log('hello ' + name);
    }
    ;
    fun(name);
    //类型
    var age = 18;
    var name = 'abc';
    var name = "hello," + name;
    var flag = false;
    var u = undefined;
    var n = null;
    //普通类型在赋值过程中改变类型是不允许的
    var name2 = 'abc';
    //name2 = 123;   //error
    document.getElementById("h1").innerText = name;
    //任意类型 any
    var a = 'string';
    a = 123;
    //在声明时，未指定类型，会被识别为任意类型
    var a2;
    a2 = 123;
    a2 = 'abc';
    //联合类型   表示值可以符合多种类型 
    var a3; //number[]数组
    a3 = 'abc';
    a3 = [1, 2, 3];
    function fun2(a3) {
        return a3.length; //对于联合类型返回符合所有类型里共有的属性和方法
    }
    ;
    fun2(a3);
    //数组   最简单的方法   类型+方括号
    var arr1 = [1, 2, 3];
    var arr2 = ['1', '2', '3'];
    var arr3 = ['1', 2, '3'];
    //对象受到接口的约束
    var ben = {
        name: 'ben',
        age: 12
    };
    //定义的变量与接口保持一致
    var ben2 = {
        name: 'ben'
    };
    var ben3 = {
        name: 'ben',
        sex: 'man'
    };
    var ben4 = {
        name: 'ben'
    };
    var ben5 = {
        'name': 'ben',
        'sex': 'man'
    };
    //函数声明   二种方式   函数声明   函数表达式  
    //输入和输出
    function f(x, y) {
        return x + y;
    }
    //f(3,5);   //参数个数匹配
    var f2 = function (x, y) {
        return x + y;
    };
    //f2(3,5);
    //参数默认值
    function f3(x, y) {
        if (x === void 0) { x = 5; }
        return x + y;
    }
    //f3(3,5);
    //参数默认值
    function f4(x, y) {
        if (y === void 0) { y = 5; }
        return x + y;
    }
    console.log(f4(3, 2));
    //可选参数   注意：可选参数必须接在必需参数的后面（可选参数后不允许出现必需参数）
    function f5(x, y) {
        if (y) {
            return x + y;
        }
        else {
            return x;
        }
    }
    // console.log(f5(3,8));
};
