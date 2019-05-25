很多同学在面试的时候都会被问到闭包是什么？举例说明下闭包的运用？

今天我就跟大家分享下什么是闭包，闭包的具体使用。

闭包（closure）是javascript的一大难点，也是它的特色。很多高级应用都要依靠闭包来实现。

要理解闭包，首先要理解javascript的全局变量和局部变量。

javascript语言的特别之处就在于：函数内部可以直接读取全局变量，但是在函数外部无法读取函数内部的局部变量。

```
01

function f1(){

     var a=10;

　　　　function f2(){

　　　　　　alert(a); // 10

　　　　}

　　}　　　　
```



如何从外部读取函数内部的局部变量？

我们有时候需要获取到函数内部的局部变量，正常情况下，这是办不到的！只有通过变通的方法才能实现。那就是在函数内部，再定义一个函数。

 

闭包的概念

上面代码中的f2函数，就是闭包。

各种专业文献的闭包定义都非常抽象，我的理解是: 闭包就是能够读取其他函数内部变量的函数。

由于在javascript中，只有函数内部的子函数才能读取局部变量，所以说，闭包可以简单理解成“定义在一个函数内部的函数“。

所以，在本质上，闭包是将函数内部和函数外部连接起来的桥梁。

 

闭包的用途

闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中，不会在f1调用后被自动清除。

为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。

 

在我们平时的代码中经常会用到闭包，比如在构造函数中

```
02

function a(){

    var n = 0;

    this.add = function () {

        n++;

        console.log(n);

    };

}
```

var c = new a();

c.add();    //控制台输出1

c.add();    //控制台输出2

//另一种写法

```
function a(){

    this.n = 0,

    this.add = function () {

        this.n++;
         
        //this指向构造函数a的实例c 
        console.log(this); 

        console.log(this.n);

    };

}


var c = new a();


c.add();    //控制台输出a {n: 1, add: ƒ} 1 

c.add();    //控制台输出a {n: 1, add: ƒ} 2

```

03

//常见闭包的写法

```
function a(){

    var n = 0;

    function add(){

       n++;

       console.log(n);

    }

    return add;

}

var a1 = a(); //注意，函数名只是一个标识（指向函数的指针），而（）才是执行函数；

a1();    //控制台输出1

a1();    //控制台输出2
```



04

//另一种调用方法

```
function a(){

    var n = 0;

    function add(){

       n++;

       console.log(n);

    }

    return add;

}

 a()();
```

 

//定义函数并立即调用

```
var a = (function() {

        var n = 0;

        return function() {

           n++;

           console.log(n);

        };

      }());

a()
```



闭包的实际应用

使用闭包，我们可以做很多事情。比如模拟面向对象的代码风格；更优雅，更简洁的表达出代码；在某些方面提升代码的执行效率。

05

```
//封装

var person = function(){   

    //变量作用域为函数内部，外部无法访问   

    var name = "张三";      

      

    return {   

       getName : function(){   

           return name;   

       },   

       setName : function(newName){   

           name = newName;   

       }   

    }   

}();  
``` 

```
Console.log(person.name);  

```

通过person.name是无法获取到name的值，如果要获取到name的值可以通过

```

Console.log(person.getName());   //直接获取到 张三

person.setName("李四");     //重新设置新的名字

print(person.getName());      //获取 李四
```



06

```
//继承

function Person(){   

    var name = "张三";     

    return {   

       getName : function(){   

           return name;   

       },   

       setName : function(newName){   

           name = newName;   

       }   

    }   
    var BlackPeople = function(){};

    //黑人继承自Person

    BlackPeople.prototype = new Person();

    var p = new BlackPeople();

    p.setName("Tom");

    console.log(p.getName());  // Tom
};  
```





总结：闭包就是一个函数引用另外一个函数的变量，因为变量被引用着所以不会被回收，因此可以用来封装一个私有变量。这是优点也是缺点，不必要的闭包只会徒增内存消耗！
