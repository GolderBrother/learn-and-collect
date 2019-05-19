window.onload = function () {
    function myHello(person) {
        return 'hello' + person;
    }
    ;
    var name = 'sonia';
    // myHello(name);
    //document.getElementById("h1").innerHTML = myHello(name);
    //类型 原始数据类型   和对象类型
    var flag = false; //布尔值
    var num = 6; //数值
    var str = 'abc'; //字符串
    var un = undefined;
    var n = null;
    var str2 = "hello," + str;
    document.getElementById("h1").innerHTML = str2;
    //任意值 Any 允许赋值为任意类型
    var a = '123';
    a = 123;
    var a1;
    a1 = 'a1';
    a1 = 1;
    //相当于
    var a2;
    a2 = 'a1';
    a2 = 1;
    //联合类型 可以设定多个类型中的一种
    var a3;
    a3 = 'a3';
    a3 = 3;
    function myHello2(str) {
        return str.length; //因为number没有length属性
    }
    ;
    //联合类型访问的是所有类型共有的属性和方法
    var a4;
    a4 = 'a3';
    a4 = [1, 2, 3];
    function myHello3(str) {
        return str.length;
    }
    ;
    console.log(myHello2(a3));
    //数组  类型+[]
    var arr2 = [1, 2, 3, 4, 5];
    var arr3 = ['1', '2', '3'];
    var arr4 = ['1', 2, '3', true];
    ;
    var obj = {
        name: 'Tom',
        age: 18
    };
    //定义的变量不符合接口的属性是不允许的
    var obj2 = {
        name: 'Tom',
        age: 18
    };
    ;
    var obj3 = {
        name: 'Tom',
        age: 18
    };
    ;
    var obj4 = {
        name: 'Tom',
        age: 18,
        sex: '男'
    };
    //函数  函数定义分函数声明和函数表达式
    //函数声明
    function sum(x, y) {
        return x + y;
    }
    ;
    //相当于
    function sum1(x, y) {
        return x + y;
    }
    ;
    sum1(1, 3); //正确
    //sum1(1,3,5);  //报错
    //sum1(1);  //报错
    //参数默认
    function sum4(x, y) {
        if (x === void 0) { x = 5; }
        return x + y;
    }
    ;
    sum1(1, 3);
    //可选参数
    //注意****  可选参数必须在必须参数的后面  换言之 可选参数是最后一个
    function sum5(x, y) {
        //return x+y;
        if (y) {
            return x + y;
        }
        else {
            return x;
        }
    }
    ;
    console.log(sum5(1));
    //函数表达式
    var sum2 = function (x, y) {
        return x + y;
    };
    //相当于
    var sum3 = function (x, y) {
        return x + y;
    };
};
