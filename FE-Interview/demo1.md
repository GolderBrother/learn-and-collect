# 一线大厂前端面试题 4 天训练营（一）

> 先来几道开胃菜

## 1. 对象(数组)的深克隆和浅克隆（头条）

### JSON.parse(JSON.stringify())缺陷:

- `function、symbol、undefined`会默认被忽略;
- 正则会被转换成`{}`
- 日期对象 `Date` 会被转换成 时间传 `"2019-12-28T06:23:36.880Z"`

### 深克隆函数

```js
let obj = {
  a: 100,
  b: [10, 20, 30],
  c: {
    x: 10
  },
  d: /^\d+$/,
  e: function() {
    console.log("e");
  },
  f: undefined,
  g: Symbol("g"),
  h: new Date()
};

let arr = [
  10,
  [100, 200],
  {
    x: 10,
    y: 20
  }
];

//=>深克隆
function deepClone(obj) {
  //过滤特殊情况
  if (obj === null) return null;
  if (typeof obj === "function")
    return new Function("return " + obj.toString())();
  if (typeof obj === "symbol") return Symbol(obj.description);
  if (typeof obj !== "object") return obj;
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  // 不直接创建空对象目的：克隆的结果和之前保持相同的所属类
  let cloneObj = new obj.constructor();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key]);
    }
  }
  return cloneObj;
}
```

**执行结果：**

```js
obj === obj2; // false

obj.b.push(4); // 4

obj;
// a: 100
// b: (4) [10, 20, 30, 4]
// c: {x: 10}
// d: /^\d+$/
// e: ƒ ()
// f: undefined
// g: Symbol(g)
// h: Sat Dec 28 2019 14:30:21 GMT+0800 (中国标准时间) {}

obj2;
// a: 100
// b: (3) [10, 20, 30]
// c: {x: 10}
// d: /^\d+$/
// e: ƒ ()
// f: undefined
// g: Symbol(g)
// h: Sat Dec 28 2019 14:30:21 GMT+0800 (中国标准时间) {}
```

## 2. BAT 笔试题中几道关于堆栈内存和闭包作用域的题

### One

```js
//example 1
let a={}, b='0', c=0;
a[b]='前端';
a[c]='超神';
console.log(a[b]); // '超神'
​
---------------------
//example 2
let a={}, b=Symbol('1'), c=Symbol('1');
a[b]='前端';
a[c]='超神';
console.log(a[b]); // '前端'
​
---------------------
//example 3
let a={}, b={n:'1'}, c={m:'2'};
a[b]='前端';
a[c]='超神';
console.log(a[b]); // '超神'
```

**分析**：

#### example 1

对象的属性类型一般是字符串类型，非字符串的正常会被转换成`字符串`，所以数值类型的`0`和字符串类型的`'0'`,
是一样的，所以后面的`'超神'`会覆盖前面的。
数组是特殊的对象，它的属性是索引，类型是`数值(number)`

#### example 2

Symbol 类型的值就都是独一无二的，可以保证不会与其他属性名产生冲突

#### example 3

这题可以验证 `example 1`, 对象的属性, 如果是非字符串的类型正常会被转换成`字符串`, `object`类型转换成字符串, 会调用愿原型上的 `toString`方法

```js
let obj = {};
obj.toString(); // "[object Object]"
```

所以上面的代码相当于:

```js
let a = {},
  b = { n: "1" },
  c = { m: "2" };
a["[object Object]"] = "前端";
a["[object Object]"] = "超神";
console.log(a[b]); // '超神'
console.log(a); // {[object Object]: "超神"}
```

### Two

```js
var test = (function(i) {
  return function() {
    alert((i *= 2));
  };
})(2);
test(5); // 4
```

**分析**：

`test`接受一个`自执行匿名函数(IIFE)`表达式, 这个 `IIFE` 执行后返回一个新的匿名函数 `function(){alert(i*=2);`, 并且外层 IIFE 构成了一个`闭包`, 因为返回的匿名函数引用外层的变量 `i`, 也就是使用了外层函数的`执行上下文(Executor Context)`,
所以 test 的值为`function(){alert(i*=2)}`, 并在闭包中声明了一个私有变量`i=2`, 也就是`形参初始化`;

接下来我们执行`test(5)`, 相当于执行 `alert(i*=2)`, 也即是`alert(i = i * 2)`, 所以返回计算后的值`2 * 2 = 4`, 弹出字符串 `4`, 因为 alert 弹出来的值都会被转换成`字符串`;

#### Three

```js
var a = 0,
  b = 0;
function A(a) {
  // 执行A(1)后,A函数被重写为下面的了
  A = function(b) {
    console.log(a + b++);
  };
  console.log(a++);
}
A(1); // 1 a++ a先返回后自增
A(2); // 2 + 2 = 4; b++ b先返回后自增
```

## 3.一道关于面向对象面试题所引发的血案（阿里）

[运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

```js
function Foo() {
  getName = function() {
    console.log(1);
  };
  return this; // 指向window
}
Foo.getName = function() {
  console.log(2);
};
Foo.prototype.getName = function() {
  console.log(3);
};
var getName = function() {
  console.log(4);
};
function getName() {
  console.log(5);
}
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1 执行 Foo() 后, 函数 getName 被重写为function () {console.log(1);}
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3 -> (new Foo()).getName() 从左到右执行
new new Foo().getName(); // 3 -> new (((new Foo()).getName)()) 从左往右 new (带参数列表) new Foo() -> 成员访问(.getName) -> 函数调用(.getName()) -> new (无参数列表 new )
```

总结下优先级:

`圆括号 > 成员访问(xxx.xxx) > new (带参数列表 new xxx ( xxx )) > 函数调用(xxx(xxx)) > new (无参数列表 new xxx)`
优先级相同, **从左到右执行**。

## 4.一道面试题让你彻底掌握 JS 中的 EventLoop（头条）

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function() {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});
console.log("script end");

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```

**分析**：

这道题考到了`事件循环(Event Loop)`的运行机制(顺序)，可以总结成 `同步任务(主线程) > 异步任务(任务队列：宏任务+微任务)`

这边盗张图

![image](https://img-blog.csdn.net/2018041120124254?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xjMjM3NDIzNTUx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

还有一张：

![image](https://img-blog.csdn.net/20180411202638415?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xjMjM3NDIzNTUx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**微任务**有哪些:

- `Promise.then`
- `process.nextTick(Nodejs)`
- `MutationObserver`
- `Object.observe` (废弃)
- `await下面的代码`, 比如：

  ```js
  await 1;
  console.log("end");
  ```

**宏任务**有哪些:

- `setTimeout、setInterval、setImmediate(Nodejs)`
- `postMessage、MessageChannel`
- `IO流、UI 渲染`

> 开胃菜吃完了，是不是得来**实战**几道呢?

### Practice One

```js
var x = 2;
var y = {
  x: 3,
  z: (function(x) {
    this.x *= x;
    x += 2;
    return function(n) {
      this.x *= n;
      x += 3;
      console.log(x);
    };
  })(x)
};
var m = y.z;
m(4); // 7
y.z(5); // 10
console.log(x, y.x); // 16 15
```

**分析**：

1. `var m = y.z;`
   匿名函数 `function(){this.x*=n;x+=3;console.log(x);}`

2. `m(4)`
   匿名函数的 x 来源于全局中的 x, `x+=3 -> x=x+3 -> 7`,这边是直接执行的，所以 this 执行 window，因此里面的 this.x*=x 相当于更改了全局的 x, ```thix.x = 4 * 4 = 16```

3. `y.z(5)`
   这边通过`y.z`来调用 `function(){this.x*=n;x+=3;console.log(x);}` 这个函数，所以这里面的`this隐式指向了y`，并且这边构成了`闭包`，引用了外层函数的 x，也就是 7, 7+3=10;然后 this.x*=x 相当于更改了 y 对象的 x, thix.x = 3 * 5 = 15

### Practice Two

```js
var x = 0,
  y = 1;
function fn() {
  x += 2;
  fn = function(y) {
    console.log(y + --x);
  };
  console.log(x, y);
}
fn(3); // 2 1
fn(4); // 4 + (--2) => 4 + 1 => 5；注意：这边fn重新赋值了个新的函数，里面的y是私有变量，不要跟全局的y搞混淆了;并且这边 --x，所以全局的x更新为1
console.log(x, y); // 1 1
```

### Practice Three

```js
setTimeout(() => {
  console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
  console.log(3);
}, 10);
console.log(4);
console.time("AA");
for (let i = 0; i < 90000000; i++) {
  // do soming
}
console.timeEnd("AA"); //=>AA: 79ms 左右
console.log(5);
setTimeout(() => {
  console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
  console.log(8);
}, 15);
console.log(9);

// 2 4 AA: 38.399169921875ms 5 7 9
// 3 1 6 8
```

**分析**：
这是一道很简单的`事件循环`机制问题:
这么记住就行，**同步任务 > 异步任务(setTimeout)**

**扩展知识**
HTML5 标准规定

- `setTimeout`的最短时间间隔是`4毫秒`；
- `setInterval`的最短间隔时间是`10毫秒`，也就是说，小于 10 毫秒的时间间隔会被调整到 10 毫秒

## 9. 最后

文中所有的代码及测试事例都已经放到我的 [GitHub]() 上了。

觉得有用 ？喜欢就收藏，顺便点个赞吧，你的支持是我最大的鼓励！
