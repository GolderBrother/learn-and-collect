## 详解箭头函数和普通函数的区别以及箭头函数的注意事项、不适用场景

箭头函数是ES6的API，相信很多人都知道，因为其语法上相对于普通函数更简洁，深受大家的喜爱。就是这种我们日常开发中一直在使用的API，大部分同学却对它的了解程度还是不够深...

### 普通函数和箭头函数的区别：

#### 箭头函数的this指向规则：
##### 1. 箭头函数没有prototype(原型)，所以箭头函数本身没有this

```
let a = () =>{};
console.log(a.prototype); // undefined
```

##### 2. 箭头函数的this指向在定义的时候继承自外层第一个普通函数的this。
下面栗子中在一个函数中定义箭头函数，然后在另一个函数中执行箭头函数。

```
let a,
barObj = { msg: 'bar的this指向' },
fooObj = { msg: 'foo的this指向' };
bar.call(barObj); // 将bar的this指向barObj
foo.call(fooObj); // 将foo的this指向fooObj
function foo() {
  a(); // 结果：{ msg: 'bar的this指向' }
}
function bar() {
  a = () => {
    console.log(this, 'this指向定义的时候外层第一个普通函数'); // 
  }; // 在bar中定义 this继承于bar函数的this指向
}
```

从上面栗子中可以得出两点

##### 1.箭头函数的this指向定义时所在的外层第一个普通函数，跟使用位置没有关系。
##### 2.被继承的普通函数的this指向改变，箭头函数的this指向会跟着改变

##### 3. 不能直接修改箭头函数的this指向
上个栗子中的foo函数修改一下，尝试直接修改箭头函数的this指向。

```
let fnObj = { msg: '尝试直接修改箭头函数的this指向' };
function foo() {
  a.call(fnObj); // 结果：{ msg: 'bar的this指向' }
}
```

很明显，call显示绑定this指向失败了，包括aaply、bind都一样。

它们(call、aaply、bind)会默认忽略第一个参数，但是可以正常传参。

然后我又通过隐式绑定来尝试同样也失败了，new 调用会报错，这个稍后再说。

SO，箭头函数不能直接修改它的this指向。

幸运的是，我们可以通过间接的形式来修改箭头函数的指向：

去修改被继承的普通函数的this指向，然后箭头函数的this指向也会跟着改变，这在上一个栗子中有演示。

bar.call(barObj); // 将bar普通函数的this指向barObj 然后内部的箭头函数也会指向barObj

##### 4. 箭头函数外层没有普通函数，严格模式和非严格模式下它的this都会指向window(全局对象)
唔，这个问题实际上是面试官提出来的，当时我认为的箭头函数规则就是：箭头函数的this指向继承自外层第一个普通函数的this，现在看来真是不严谨(少说一个定义的时候)，要是面试官问我：定义和执行不在同一个普通函数中，它又指向哪里，肯定歇菜...

既然箭头函数的this指向在定义的时候继承自外层第一个普通函数的this，那么：

当箭头函数外层没有普通函数，它的this会指向哪里？

这里跟我之前写的this绑定规则不太一样(不懂的可以点进去看一下),普通函数的默认绑定规则是：

在非严格模式下，默认绑定的this指向全局对象，严格模式下this指向undefined

如果箭头函数外层没有普通函数继承，它this指向的规则：

经过测试，箭头函数在全局作用域下，严格模式和非严格模式下它的this都会指向window(全局对象)。

Tip：测试的时候发现严格模式在中途声明无效，必须在全局/函数的开头声明才会生效：

```
a = 1;
'use strict'; // 严格模式无效 必须在一开始就声明严格模式
b = 2; // 不报错
```

箭头函数的
箭头函数的arguments
箭头函数的this指向全局，使用arguments会报未声明的错误
如果箭头函数的this指向window(全局对象)使用arguments会报错，未声明arguments。

```
let b = () => {
  console.log(arguments);
};
b(1, 2, 3, 4); // Uncaught ReferenceError: arguments is not defined
```

PS：如果你声明了一个全局变量为arguments，那就不会报错了，但是你为什么要这么做呢？

箭头函数的this指向普通函数时,它的argumens继承于该普通函数
上面是第一种情况：箭头函数的this指向全局对象，会报arguments未声明的错误。

第二种情况是：箭头函数的this如果指向普通函数,它的argumens继承于该普通函数。

```
function bar() {
  console.log(arguments); // ['外层第二个普通函数的参数']
  bb('外层第一个普通函数的参数');
  function bb() {
    console.log(arguments); // ["外层第一个普通函数的参数"]
    let a = () => {
      console.log(arguments, 'arguments继承this指向的那个普通函数'); // ["外层第一个普通函数的参数"]
    };
    a('箭头函数的参数'); // this指向bb
  }
}
bar('外层第二个普通函数的参数');
```

那么应该如何来获取箭头函数不定数量的参数呢？答案是：ES6的rest参数（...扩展符）

rest参数获取函数的多余参数
这是ES6的API，用于获取函数不定数量的参数数组，这个API是用来替代arguments的，API用法如下：

```
let a = (first, ...abc) => {
  console.log(first, abc); // 1 [2, 3, 4]
};
a(1, 2, 3, 4);
```

上面的栗子展示了，获取函数除第一个确定的参数，以及用一个变量接收其他剩余参数的示例。

也可以直接接收函数的所有参数，rest参数的用法相对于arguments的优点：

箭头函数和普通函数都可以使用。

更加灵活，接收参数的数量完全自定义。

可读性更好

参数都是在函数括号中定义的，不会突然出现一个arguments，以前刚见到的时候，真的好奇怪了！

rest是一个真正的数组，可以使用数组的API。

因为arguments是一个类数组的对象，有些人以为它是真正的数组，所以会出现以下场景：

```
arguments.push(0); // arguments.push is not a function
```

如上，如果我们需要使用数组的API，需要使用扩展符/Array.from来将它转换成真正的数组:

```
arguments = [...arguments]; 或者 ：arguments = Array.from(arguments);
```

rest参数有两点需要注意：

rest必须是函数的最后一位参数：

```
let a = (first, ...rest, three) => {
  console.log(first, rest,three); // 报错：Rest parameter must be last formal parameter
};
a(1, 2, 3, 4);
```

函数的length属性，不包括 rest 参数

```
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1
```

扩展运算符还可以用于数组，这里是[阮一峰老师的文档](http://es6.ruanyifeng.com/)

PS：感觉这里写多了，但比较喜欢把一个知识点讲清楚...

使用new调用箭头函数会报错
无论箭头函数的thsi指向哪里，使用new调用箭头函数都会报错，因为箭头函数没有constructor

```
let a = () => {};
let b = new  a(); // a is not a constructor
```

箭头函数不支持new.target：
new.target是ES6新引入的属性，普通函数如果通过new调用，new.target会返回该函数的引用。

此属性主要：用于确定构造函数是否为new调用的。

箭头函数的this指向全局对象，在箭头函数中使用箭头函数会报错

```
let a = () => {
  console.log(new.target); // 报错：new.target 不允许在这里使用
};
a();
```

箭头函数的this指向普通函数，它的new.target就是指向该普通函数的引用。

```
new bb();
function bb() {
  let a = () => {
    console.log(new.target); // 指向函数bb：function bb(){...}
  };
  a();
}
```

更多关于new.target可以看一下阮一峰老师关于这部分的解释。

箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名
如下示例，普通函数的函数参数支持重命名，后面出现的会覆盖前面的，箭头函数会抛出错误：

```
function func1(a, a) {
  console.log(a, arguments); // 2 [1,2]
}

var func2 = (a,a) => {
  console.log(a); // 报错：在此上下文中不允许重复参数名称
};
func1(1, 2); func2(1, 2);
```

箭头函数相对于普通函数语法更简洁优雅：
讲道理，语法上的不同，也属与它们两个的区别！

箭头函数都是匿名函数，并且都不用写function

只有一个参数的时候可以省略括号:

```
var f = a => a; // 传入a 返回a
```


函数只有一条语句时可以省略{}和return

```
var f = (a,b,c) => a; // 传入a,b,c 返回a

简化回调函数，让你的回调函数更优雅：

```
[1,2,3].map(function (x) {
  return x * x;
}); // 普通函数写法 
[1,2,3].map(x => x * x); // 箭头函数只需要一行
```

### 箭头函数的注意事项及不适用场景
#### 箭头函数的注意事项
一条语句返回对象字面量，需要加括号，或者直接写成多条语句的return形式，

否则像func中演示的一样，花括号会被解析为多条语句的花括号，不能正确解析

```
var func1 = () => { foo: 1 }; // 想返回一个对象,花括号被当成多条语句来解析，执行后返回undefined
var func2 = () => ({foo: 1}); // 用圆括号是正确的写法
var func2 = () => {
  return {
    foo: 1 // 更推荐直接当成多条语句的形式来写，可读性高
  };
};
```

箭头函数在参数和箭头之间不能换行！
```
var func = ()
           => 1;  // 报错： Unexpected token =>
```

箭头函数的解析顺序相对靠前
MDN: 虽然箭头函数中的箭头不是运算符，但箭头函数具有与常规函数不同的特殊运算符优先级解析规则

```
let a = false || function() {}; // ok
let b = false || () => {}; // Malformed arrow function parameter list
let c = false || (() => {}); // ok
```

#### 箭头函数不适用场景：
围绕两点：箭头函数的this意外指向和代码的可读性。

1.定义字面量方法,this的意外指向。
因为箭头函数的简洁

```
const obj = {
  array: [1, 2, 3],
  sum: () => {
    // 根据上文学到的：外层没有普通函数this会指向全局对象
    return this.array.push('全局对象下没有array，这里会报错'); // 找不到push方法
  }
};
obj.sum();
```

上述栗子使用普通函数或者ES6中的方法简写的来定义方法，就没有问题了：

```
// 这两种写法是等价的
sum() {
  return this.array.push('this指向obj');
}
sum: function() {
  return this.array.push('this指向obj');
}
```

还有一种情况是给普通函数的原型定义方法的时候，通常会在普通函数的外部进行定义，比如说继承/添加方法的时候。

这时候因为没有在普通函数的内部进行定义，所以this会指向其他普通函数，或者全局对象上，导致bug！

2.回调函数的动态this
下文是一个修改dom文本的操作，因为this指向错误，导致修改失败：

```
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
    this.innerHTML = 'Clicked button'; // this又指向了全局
});
```

相信你也知道了，改成普通函数就成了。

3.考虑代码的可读性，使用普通函数

函数体复杂：

具体表现就是箭头函数中使用多个三元运算符号，就是不换行，非要在一行内写完，非常恶心！

行数较多

函数内部有大量操作

4.定义构造函数
构造函数中的 this 指向新创建的对象，当执行 new Car() 的时候，构造函数 Car 的上下文就是新创建的对象，也就是说 this instanceof Car === true。显然，箭头函数是不能用来做构造函数， 实际上 JS 会禁止你这么做，如果你这么做了，它就会抛出异常。

换句话说，箭头构造函数的执行并没有任何意义，并且是有歧义的。比如，当我们运行下面的代码 JS Bin：

```
const Message = (text) => {
    this.text = text;
};
// Throws "TypeError: Message is not a constructor"
const helloMessage = new Message('Hello World!');
```

构造新的 Message 实例时，JS 引擎抛了错误，因为 Message 不是构造函数。在笔者看来，相比旧的 JS 引擎在出错时悄悄失败的设计，ES6 在出错时给出具体错误消息是非常不错的实践。可以通过使用函数表达式或者函数声明 来声明构造函数修复上面的例子 JS Bin：

```
const Message = function(text) {
    this.text = text;
};
const helloMessage = new Message('Hello World!');
console.log(helloMessage.text); // => 'Hello World!'
```

5. 追求过短的代码
箭头函数允许你省略参数两边的括号、函数体的花括号、甚至 return 关键词，这对编写更简短的代码非常有帮助。这让我想起大学计算机老师给学生留过的有趣作业：看谁能使用 C 语言编写出最短的函数来计算字符串的长度，这对学习和探索新语言特性是个不错的法子。但是，在实际的软件工程中，代码写完之后会被很多工程师阅读，真正的 write once, read many times，在代码可读性方面，最短的代码可能并不总是最好的。一定程度上，压缩了太多逻辑的简短代码，阅读起来就没有那么直观，比如下面的例子 JS Bin：

```
const multiply = (a, b) => b === undefined ? b => a * b : a * b;
const double = multiply(2);
double(3);      // => 6
multiply(2, 3); // => 6
multiply 函数会返回两个数字的乘积或者返回一个可以继续调用的固定了一个参数的函数。代码看起来很简短，但大多数人第一眼看上去可能无法立即搞清楚它干了什么，怎么让这段代码可读性更高呢？有很多办法，可以在箭头函数中加上括号、条件判断、返回语句，或者使用普通的函数 JS Bin：

function multiply(a, b) {
    if (b === undefined) {
        return function (b) {
            return a * b;
        }
    }
    return a * b;
}

const double = multiply(2);
double(3); // => 6
multiply(2, 3); // => 6
```

为了让代码可读性更高，在简短和啰嗦之间把握好平衡是非常有必要的。

### 文章内容小结：
#### 普通函数和箭头函数的区别：
箭头函数没有prototype(原型)，所以箭头函数本身没有this
箭头函数的this在定义的时候继承自外层第一个普通函数的this。
如果箭头函数外层没有普通函数，严格模式和非严格模式下它的this都会指向window(全局对象)
箭头函数本身的this指向不能改变，但可以修改它要继承的对象的this。
箭头函数的this指向全局，使用arguments会报未声明的错误。
箭头函数的this指向普通函数时,它的argumens继承于该普通函数
使用new调用箭头函数会报错，因为箭头函数没有constructor
箭头函数不支持new.target
箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名
箭头函数相对于普通函数语法更简洁优雅

#### 箭头函数的注意事项及不适用场景
##### 箭头函数的注意事项：

箭头函数一条语句返回对象字面量，需要加括号
箭头函数在参数和箭头之间不能换行
箭头函数的解析顺序相对||靠前
##### 不适用场景：箭头函数的this意外指向和代码的可读性。

### 3.总结
箭头函数无疑是 ES6 带来的重大改进，在正确的场合使用箭头函数能让代码变的简洁、短小，但某些方面的优势在另外一些方面可能就变成了劣势，在需要动态上下文的场景中使用箭头函数你要格外的小心，这些场景包括：定义对象方法、定义原型方法、定义构造函数、定义事件回调函数。
