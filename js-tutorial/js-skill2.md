# 灵活运用JavaScript开发技巧

- String Skill：字符串技巧
- Number Skill：数值技巧
- Boolean Skill：布尔值技巧
- Array Skill：数组技巧
- Object Skill：对象技巧
- Function Skill：函数技巧
- DOM Skill：DOM技巧

## String Skill

> 时间对比：时间个位数形式需补0

```
const time1 = "2019-03-31 21:00:00";
const time2 = "2019-05-01 09:00:00";
const overtime = time1 > time2;
// overtime => false
```

> 格式化金钱

```
const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const money = ThousandNum(19941112);
// money => "19,941,112"
```

> 生成随机ID

```
// 这边的长度不能大于10
const getRandomId = len => Math.random().toString(36).substr(3, len)

const id = getRandomId(10);
// id => "jg7zpgiqva"
```

> 生成随机HEX色值

```
const RandomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
const color = RandomColor();

// color => "#f03665"
```

> 生成星级评分
```
const StartScore = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
const start = StartScore(3);
// start => "★★★"
```

> 操作URL查询参数

```
// url:https://juejin.im/?utm_source=w3cplus&utm_medium=word&utm_campaign=q1_website

const params = new URLSearchParams(location.search.replace(/\?/ig, ""));

params.has('utm_source'); // true
params.get('utm_source'); // "w3cplus"
```

## Number Skill

> 取整：代替正数的Math.floor()，代替负数的Math.ceil()

```
const num1 = ~~ 1.69;
const num2 = 1.69 | 0;
const num3 = 1.69 >> 0;
// num1 num2 num3 => 1 1 1
```

> 补零

```
const FillZero = (num, len, str = "0") => num.toString().padStart(len, str);

FillZero(123, 5)
// "00123"
```

> 其他类型转换为数值类型(只对null、""、false、数值字符串有效)

```
const num1 = +null;
const num2 = +"";
const num3 = +false;
const num4 = +"169";
// num1 num2 num3 num4 => 0 0 0 169
```

> 时间戳

const timestamp = +new Date("2019-03-31");
// timestamp => 1553990400000

> 精确小数
```
const RoundNum = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal;
const num = RoundNum(1.696, 2);
```

> 判断奇偶
```
const OddEven = num => !!(num & 1) ? "odd" : "even";
const num = OddEven(2);
// num => "even"
```

> 取最小最大值

```
const arr = [0, 1, 2];
const min = Math.min(...arr);
const max = Math.max(...arr);
// min max => 0 2
```

> 生成指定范围的随机数

```
const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const num = RandomNum(1, 10);
// 7
```

## Boolean Skill

> 短路运算符

```
const a = d && 1; // 满足条件赋值：取假运算，从左到右依次判断，遇到假值返回假值，后面不再执行，否则返回最后一个值
const b = d || 1; // 默认赋值：取真运算，从左到右依次判断，遇到真值返回真值，后面不再执行，否则返回最后一个值
const c = !d; // 取假赋值：单个表达式转换为true则返回false，否则返回true
```

> 判断数据类型：undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap

```
function DataType(target, type) {
    const dataType = Object.prototype.toString.call(target).replace(/\[object /g, "").replace(/\]/g, "").toLowerCase();
    return type ? dataType === type : dataType;
}
DataType("yajun"); // "string"
DataType(19941112); // "number"
DataType(true); // "boolean"
DataType([], "array"); // true
DataType({}, "array"); // false
```

> 是否为空数组

```
const arr = [];
const flag = Array.isArray(arr) && !arr.length;
// flag => true
```

> 是否为空对象

```
const obj = {};
const flag = DataType(obj, "object") && !Object.keys(obj).length;
// flag => true
```

> 满足条件时执行

```
const flagA = true; // 条件A
const flagB = false; // 条件B
(flagA || flagB) && Func(); // 满足A或B时执行
(flagA || !flagB) && Func(); // 满足A或不满足B时执行
flagA && flagB && Func(); // 同时满足A和B时执行
flagA && !flagB && Func(); // 满足A且不满足B时执行
```

> 为非假值时执行

```
const flag = false; // undefined、null、""、0、false、NaN
!flag && Func();
```

> 数组不为空时执行

```
const arr = [0, 1, 2];
arr.length && Func();
```

> 对象不为空时执行

```
const obj = { a: 0, b: 1, c: 2 };
Object.keys(obj).length && Func();
```

> 函数退出代替条件分支退出

```
if (flag) {
    Func();
    return false;
}
// 换成
if (flag) {
    return Func();
}
```

> switch/case使用区间

```
const age = 26;
switch (true) {
    case isNaN(age):
        console.log("not a number");
        break;
    case (age < 18):
        console.log("under age");
        break;
    case (age >= 18):
        console.log("adult");
        break;
    default:
        console.log("please set your age");
        break;
}
```

## Array Skill

> 克隆数组

```
const _arr = [0, 1, 2];
const arr = [..._arr];
// arr => [0, 1, 2]
```

> 合并数组

```
const arr1 = [0, 1, 2];
const arr2 = [3, 4, 5];
const arr = [...arr1, ...arr2];
// arr => [0, 1, 2, 3, 4, 5];
```

> 去重数组

```
const arr = [...new Set([0, 1, 1, null, null])];
// arr => [0, 1, null]
```

> 混淆数组

```
const arr = [0, 1, 2, 3, 4, 5].slice().sort(() => Math.random() - .5);
// arr => [3, 4, 0, 5, 1, 2]
```

> 清空数组

```
const arr = [0, 1, 2];
arr.length = 0;
// arr => []
```

> 截断数组

```
const arr = [0, 1, 2];
arr.length = 2;
// arr => [0, 1]
```

> 交换赋值

```
let a = 0;
let b = 1;
[a, b] = [b, a];
// a b => 1 0
```

> 过滤空值：undefined、null、""、0、false、NaN

```
const arr = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean);
// arr => [1, 2]
```

> 异步累计

```
async function Func(deps) {
    return deps.reduce(async(t, v) => {
        const dep = await t;
        const version = await Todo(v);
        dep[v] = version;
        return dep;
    }, Promise.resolve({}));
}
const result = await Func(); // 需在async包围下使用
```

> 数组首部插入成员

```
let arr = [1, 2]; // 以下方法任选一种
arr.unshift(0);
arr = [0].concat(arr);
arr = [0, ...arr];
// arr => [0, 1, 2]
```

> 数组尾部插入成员

```
let arr = [0, 1]; // 以下方法任选一种
arr.push(2);
arr.concat(2);
arr[arr.length] = 2;
arr = [...arr, 2];
// arr => [0, 1, 2]
```

> 统计数组成员个数

```
const arr = [0, 1, 1, 2, 2, 2];
const count = arr.reduce((t, c) => {
    t[c] = t[c] ? ++ t[c] : 1;
    return t;
}, {});
// count => { 0: 1, 1: 2, 2: 3 }
```

> 解构数组成员嵌套

```
const arr = [0, 1, [2, 3, [4, 5]]];
const [a, b, [c, d, [e, f]]] = arr;
// a b c d e f => 0 1 2 3 4 5
```

> 解构数组成员别名

```
const arr = [0, 1, 2];
const { 0: a, 1: b, 2: c } = arr;
// a b c => 0 1 2
```

> 解构数组成员默认值

```
const arr = [0, 1, 2];
const [a, b, c = 3, d = 4] = arr;
// a b c d => 0 1 2 4
```

> 获取随机数组成员

```
const arr = [0, 1, 2, 3, 4, 5];
const randomItem = arr[Math.floor(Math.random() * arr.length)];
// randomItem => 1
```

> 创建指定长度数组

```
const arr = [...new Array(3).keys()];
// arr => [0, 1, 2]
```

> 创建指定长度且值相等的数组

```
const arr = new Array(3).fill(0);
// arr => [0, 0, 0]
```

> reduce代替map和filter

```
const _arr = [0, 1, 2];
```

```
// map
const arr = _arr.map(v => v * 2);
const arr = _arr.reduce((t, c) => {
    t.push(c * 2);
    return t;
}, []);
// arr => [0, 2, 4]
```

```
// filter
const arr = _arr.filter(v => v > 0);
const arr = _arr.reduce((t, c) => {
    c > 0 && t.push(c);
    return t;
}, []);
// arr => [1, 2]
```

```
// map和filter
const arr = _arr.map(v => v * 2).filter(v => v > 2);
const arr = _arr.reduce((t, c) => {
    c = c * 2;
    c > 2 && t.push(c);
    return t;
}, []);
// arr => [4]
```

## Object Skill
> 克隆对象

```
const _obj = { a: 0, b: 1, c: 2 }; // 以下方法任选一种
const obj = { ..._obj };
const obj = JSON.parse(JSON.stringify(_obj));
// obj => { a: 0, b: 1, c: 2 }
```

> 合并对象

```
const obj1 = { a: 0, b: 1, c: 2 };
const obj2 = { c: 3, d: 4, e: 5 };
const obj = { ...obj1, ...obj2 };
// obj => { a: 0, b: 1, c: 3, d: 4, e: 5 }
```

> 对象字面量：获取环境变量时必用此方法，用它一直爽，一直用它一直爽

```
const env = "prod";
const link = {
    dev: "Development Address",
    test: "Testing Address",
    prod: "Production Address"
}[env];
// link => "Production Address"
```

> 对象变量属性

```
const flag = false;
const obj = {
    a: 0,
    b: 1,
    [flag ? "c" : "d"]: 2
};
// obj => { a: 0, b: 1, d: 2 }
```

> 创建纯空对象

```
const obj = Object.create(null);
Object.prototype.a = 0;
// obj => {}
// obj.a => undefined
```

> 删除对象无用属性

```
const obj = { a: 0, b: 1, c: 2 }; // 只想拿b和c
const { a, ...rest } = obj;
// rest => { b: 1, c: 2 }
```

> 解构对象属性嵌套

```
const obj = { a: 0, b: 1, c: { d: 2, e: 3 } };
const { c: { d, e } } = obj;
// d e => 2 3
```

> 解构对象属性别名

```
const obj = { a: 0, b: 1, c: 2 };
const { a, b: d, c: e } = obj;
// a d e => 0 1 2
```

> 解构对象属性默认值

```
const obj = { a: 0, b: 1, c: 2 };
const { a, b = 2, d = 3 } = obj;
// a b d => 0 1 3
```

## Function Skill

> 函数自执行

```
const Func = function() {}(); // 常用

(function() {})(); // 常用
(function() {}()); // 常用
[function() {}()];

+ function() {}();
- function() {}();
~ function() {}();
! function() {}();

new function() {};
new function() {}();
void function() {}();
typeof function() {}();
delete function() {}();

1, function() {}();
1 ^ function() {}();
1 > function() {}();
```

> 隐式返回值：只能用于单语句返回值箭头函数，如果返回值是对象必须使用()包住

```
const Func = function(name) {
    return "I Love " + name;
};
// 换成
const Func = name => "I Love " + name;
```

> 一次性函数：适用于运行一些只需执行一次的初始化代码

```
function Func() {
    console.log("x");
    Func = function() {
        console.log("y");
    }
}
```

> 惰性载入函数：函数内判断分支较多较复杂时可大大节约资源开销

```
function Func() {
    if (a === b) {
        console.log("x");
    } else {
        console.log("y");
    }
}
// 换成
function Func() {
    if (a === b) {
        Func = function() {
            console.log("x");
        }
    } else {
        Func = function() {
            console.log("y");
        }
    }
    return Func();
}
```

> 检测非空参数

```
function IsRequired() {
    throw new Error("param is required");
}
function Func(name = IsRequired()) {
    console.log("I Love " + name);
}
Func(); // "param is required"
Func("雅君妹纸"); // "I Love 雅君妹纸"
```

> 字符串创建函数

```
const Func = new Function("name", "console.log(\"I Love \" + name)");
```

> 优雅处理错误信息

```
try {
    Func();
} catch (e) {
    location.href = "https://stackoverflow.com/search?q=[js]+" + e.message;
}
```

> 优雅处理Async/Await参数

```
function AsyncTo(promise) {
    return promise.then(data => [null, data]).catch(err => [err]);
}
const [err, res] = await AsyncTo(Func());
```

> 优雅处理多个函数返回值

```
function Func() {
    return Promise.all([
        fetch("/user"),
        fetch("/comment")
    ]);
}
const [user, comment] = await Func(); // 需在async包围下使用
```

## DOM Skill

> 显示全部DOM边框：调试页面元素边界时使用

```
[].forEach.call($$("*"), dom => {
    dom.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});
```

> 自适应页面：页面基于一张设计图但需做多款机型自适应，元素尺寸使用rem进行设置

```
function AutoResponse(width = 750) {
    const target = document.documentElement;
    target.clientWidth >= 600
        ? (target.style.fontSize = "80px")
        : (target.style.fontSize = target.clientWidth / width * 100 + "px");
}
```

> 过滤XSS

```
function FilterXss(content) {
    let elem = document.createElement("div");
    elem.innerText = content;
    const result = elem.innerHTML;
    elem = null;
    return result;
}
```

> 存取LocalStorage：反序列化取，序列化存

```
const love = JSON.parse(localStorage.getItem("love"));
localStorage.setItem("love", JSON.stringify("I Love 丽君妹纸"));
```

> 最后送大家一个键盘！
```
(_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["Bs","Tab","Caps","Enter"][p++]||'Shift',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join`
`)()
```


