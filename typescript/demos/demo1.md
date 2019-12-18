# TypeScript高级用法详解

## 引言

作为一门强大的静态类型检查工具，如今在许多中大型应用程序以及流行的JS库中均能看到TypeScript的身影。JS作为一门弱类型语言，在我们写代码的过程中稍不留神便会修改掉变量的类型，从而导致一些出乎意料的运行时错误。然而TypeScript在编译过程中便能帮我们解决这个难题，不仅在JS中引入了强类型检查，并且编译后的JS代码能够运行在任何浏览器环境，Node环境和任何支持ECMAScript 3(或更高版本)的JS引擎中。

### 1、类继承
在ES5中，我们一般通过函数或者基于原型的继承来封装一些组件公共的部分方便复用，然而在TypeScript中，我们可以像类似Java语言中以面向对象的方式使用类继承来创建可复用的组件。我们可以通过**class**关键字来创建类，并基于它使用**new**操作符来实例化一个对象。为了将多个类的公共部分进行抽象，我们可以创建一个父类并让子类通过**extends**关键字来继承父类，从而减少一些冗余代码的编写增加代码的可复用性和可维护性。示例如下：

```js
class Parent {
    readonly x: number;
    constructor() {
        this.x = 1;
    }
    
    print() {
        console.log(this.x);
    }
}

class Child extends Parent {
    readonly y: number;
    constructor() {
        // 注意此处必须优先调用super()方法,相当于先实例化父类，子类才能使用this
        super();
        this.y = 2;
    }
    
    print() {
        // 通过super调用父类原型上的方法，但是方法中的this指向的是子类的实例
        super.print();
        console.log(this.y);
    }
}

const child = new Child();
console.log(child.print()) // -> 1 2

```

在上述示例中，```Child```子类中对父类的```print```方法进行重写，同时在内部使用```super.print()```来调用父类的公共逻辑，从而实现逻辑复用。```class```关键字作为构造函数的语法糖，在经过TypeScript编译后，最终会被转换为兼容性好的浏览器可识别的ES5代码。c```lass```在面向对象的编程范式中非常常见，因此为了弄清楚其背后的实现机制，我们不妨多花点时间来看下经过编译转换之后的代码是什么样子的

```js
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
var Parent = /** @class */ (function () {
    function Parent() {
        this.x = 1;
    }
    Parent.prototype.print = function () {
        console.log(this.x);
    };
    return Parent;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        var _this = 
        // 注意此处必须优先调用super()方法
        _super.call(this) || this;
        _this.y = 2;
        return _this;
    }
    Child.prototype.print = function () {
        // 通过super调用父类原型上的方法，但是方法中的this指向的是子类的实例
        _super.prototype.print.call(this);
        console.log(this.y);
    };
    return Child;
}(Parent));
var child = new Child();
console.log(child.print()); // -> 1 2

```

以上就是转换后的完整代码，为了方便对比，这里将原来的注释信息保留，仔细研究这段代码我们会发现以下几个要点：

1. 子类```Child```的构造函数中```super()```方法被转换成了```var _this = _super.call(this) || this```，这里的```_super```指的就是父类Parent，因此这句代码的含义就是调用父类构造函数并将this绑定到子类的实例上，这样的话子类实例便可拥有父类的x属性。因此为了实现属性继承，我们必须在子类构造函数中调用```super()```方法，如果不调用会编译不通过。

2. 子类```Child```的```print```方法中```super.print()```方法被转换成了```_super.prototype.print.call(this)```，这句代码的含义就是调用父类原型上的```print```方法并将方法中的```this```指向子类实例，由于在上一步操作中我们已经继承到父类的x属性，因此这里我们将直接打印出子类实例的x属性的值。

3. extends关键字最终被转换为```__extends(Child, _super)```方法，其中```_super```指的是父类```Parent```，为了方便查看，这里将```_extends```方法单独提出来进行研究。

```js
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        // 第一部分
        extendStatics(d, b);
        
        // 第二部分
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

```

在以上代码中，主要可以分为两个部分来进行理解，第一部分为```extendStatics(d, b)```方法，第二部分为该方法后面的两行代码。

**第一部分**：

在```extendStatics```方法内部虽然代码量相对较多，但是不难发现其实还是主要为了兼容ES5版本的执行环境。在ES6中新增了```Object.setPrototypeOf```方法用于手动设置对象的原型，但是在ES5的环境中我们一般通过一个非标准的```__proto__```属性来进行设置，```Object.setPrototypeOf```方法的原理其实也是通过该属性来设置对象的原型，其实现方式如下：

```js
Object.setPrototypeOf = function(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}
```

在```extendStatics(d, b)```方法中，```d```指子类```Child```，```b```指父类```Parent```，因此该方法的作用可以解释为：

```js
// 将子类Child的__proto__属性指向父类Parent
Child.__proto__ = Parent;
```

可以将这行代码理解为构造函数的继承，或者叫静态属性和静态方法的继承，即属性和方法不是挂载到构造函数的```prototype```原型上的，而是直接挂载到构造函数本身，因为在JS中函数本身也可以作为一个对象，并可以为其赋予任何其他的属性，示例如下：

```js
function Foo() {
  this.x = 1;
  this.y = 2;
}

Foo.bar = function() {
  console.log(3);
}

Foo.baz = 4;
console.log(Foo.bar()) // -> 3
console.log(Foo.baz) // -> 4
```

因此当我们在子类```Child```中以```Child.someProperty```访问属性时，如果子类中不存在就会通过```Child.__proto__```寻找父类的同名属性，通过这种方式来实现静态属性和静态方法的路径查找。

**第二部分**：

在第二部分中仅包含以下两行代码：

```js
function __() { this.constructor = d; }
d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());

```

其中```d```指子类```Child```，```b```指父类Parent，这里对于JS中实现继承的几种方式比较熟悉的同学可以一眼看出，这里使用了寄生组合式继承的方式，通过借用一个中间函数```__()```来避免当修改子类的```prototype```上的方法时对父类的```prototype```所造成的影响。我们知道，在JS中通过构造函数实例化一个对象之后，该对象会拥有一个```__proto__```属性并指向其构造函数的```prototype```属性，示例如下：

```js
function Foo() {
  this.x = 1;
  this.y = 2;
}

const foo = new Foo();
foo.__proto__ === Foo.prototype; // -> true

```

对于本例中，如果通过子类```Child```来实例化一个对象之后，会产生如下关联：

```js
const child = new Child();
child.__proto__ === (Child.prototype = new __());
child.__proto__.__proto__ === __.prototype === Parent.prototype; 

// 上述代码等价于下面这种方式
Child.prototype.__proto__ === Parent.prototype;
```

因此当我们在子类```Child```的实例```child```对象中通过```child.someMethod()```调用某个方法时，如果在实例中不存在该方法，则会沿着```__proto__```继续往上查找，最终会经过父类```Parent```的```prototype```原型，即通过这种方式来实现方法的继承。

因此当我们在子类```Child```的实例```child```对象中通过```child.someMethod()```调用某个方法时，如果在实例中不存在该方法，则会沿着```__proto__```继续往上查找，最终会经过父类```Parent```的```prototype```原型，如果父类```Parent```的```prototype```原型上也找不到，就会返回```undefined```，即通过这种方式来实现方法的继承。

```js
// 表示构造函数的继承，或者叫做静态属性和静态方法的继承，总是指向父类
1. Child.__proto__ === Parent;

// 表示方法的继承，总是指向父类的prototype属性
2. Child.prototype.__proto__ === Parent.prototype;

```

2、访问修饰符
TypeScript为我们提供了访问修饰符(Access Modifiers)来限制在```class```外部对内部属性的访问，访问修饰符主要包含以下三种：

- ```public```：公共修饰符，其修饰的属性和方法都是公有的，可以在任何地方被访问到，默认情况下所有属性和方法都是```public```的。
- ```private```：私有修饰符，其修饰的属性和方法在class外部不可见。
- ```protected```：受保护修饰符，和private比较相似，但是其修饰的属性和方法**在子类内部是被允许访问的**。

我们通过一些示例来对几种修饰符进行对比：

```
class Human {
    public name: string;
    public age: number;
    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const man = new Human('tom', 20);
console.log(man.name, man.age); // -> tom 20
man.age = 21;
console.log(man.age); // -> 21

```

在上述示例中，由于我们将访问修饰符设置为```public```，因此我们通过实例```man```来访问```name```和```age```属性是被允许的，同时对```age```属性重新赋值也是允许的。但是在某些情况下，我们希望某些属性是对外不可见的，同时不允许被修改，那么我们就可以使用```private```修饰符：

```
class Human {
    public name: string;
    private age: number; // 此处修改为使用private修饰符
    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const man = new Human('tom', 20);
console.log(man.name); // -> tom
console.log(man.age);
// -> Property 'age' is private and only accessible within class 'Human'.

我们将age属性的修饰符修改为private后，在外部通过man.age对其进行访问，TypeScript在编译阶段就会发现其是一个私有属性并最终将会报错。
```

我们将```age```属性的修饰符修改为```private```后，在外部通过```man.age```对其进行访问，TypeScript在编译阶段就会发现其是一个私有属性并最终将会报错。

> 注意：在TypeScript编译之后的代码中并没有限制对私有属性的存取操作。

编译后的代码如下：

```js
var Human = /** @class */ (function () {
    function Human(name, age) {
        this.name = name;
        this.age = age;
    }
    return Human;
}());
var man = new Human('tom', 20);
console.log(man.name); // -> tom
console.log(man.age); // -> 20

```

使用```private```修饰符修饰的属性或者方法**在子类中也是不允许访问的**

，示例如下：

```js
class Human {
    public name: string;
    private age: number;
    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Woman extends Human {
    private gender: number = 0;
    public constructor(name: string, age: number) {
        super(name, age);
        console.log(this.age);
    }
}

const woman = new Woman('Alice', 18);
// -> Property 'age' is private and only accessible within class 'Human'.

```

```js
class Human {
    public name: string;
    private age: number;
    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Woman extends Human {
    private gender: number = 0;
    public constructor(name: string, age: number) {
        super(name, age);
        console.log(this.age);
    }
}

const woman = new Woman('Alice', 18);
// -> Property 'age' is private and only accessible within class 'Human'.
```

在上述示例中由于在父类```Human```中```age```属性被设置为```private```，因此在子类```Woman```中无法访问到```age```属性，为了让在子类中允许访问```age```属性，我们可以使用```protected```修饰符来对其进行修饰：

```js
class Human {
    public name: string;
    protected age: number; // 此处修改为使用protected修饰符
    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Woman extends Human {
    private gender: number = 0;
    public constructor(name: string, age: number) {
        super(name, age);
        console.log(this.age);
    }
}

const woman = new Woman('Alice', 18); // -> 18


当我们将private修饰符用于构造函数时，则表示该类不允许被继承或实例化，示例如下：
```

当我们将```private```修饰符用于构造函数时，则表示该类**不允许被继承或实例化**，示例如下：

```js
class Human {
    public name: string;
    public age: number;
    
    // 此处修改为使用private修饰符
    private constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Woman extends Human {
    private gender: number = 0;
    public constructor(name: string, age: number) {
        super(name, age);
    }
}

const man = new Human('Alice', 18);
// -> Cannot extend a class 'Human'. Class constructor is marked as private.
// -> Constructor of class 'Human' is private and only accessible within the class declaration.

```

当我们将```protected```修饰符用于构造函数时，则表示该类**只允许被继承**，示例如下：

```js
class Human {
    public name: string;
    public age: number;
    
    // 此处修改为使用protected修饰符
    protected constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Woman extends Human {
    private gender: number = 0;
    public constructor(name: string, age: number) {
        super(name, age);
    }
}

const man = new Human('Alice', 18);
// -> Constructor of class 'Human' is protected and only accessible within the class declaration.

```

另外我们还可以直接将修饰符放到构造函数的参数中，示例如下：

```js
class Human {
    // public name: string;
    // private age: number;
    
    public constructor(public name: string, private age: number) {
        this.name = name;
        this.age = age;
    }
}

const man = new Human('tom', 20);
console.log(man.name); // -> tom
console.log(man.age);
// -> Property 'age' is private and only accessible within class 'Human'.

```

### 3、接口与构造器签名

当我们的项目中拥有很多不同的类时并且这些类之间可能存在某方面的共同点，为了描述这种共同点，我们可以将其提取到一个接口(interface)中用于集中维护，并使用```implements```关键字来实现这个接口，示例如下：

```js
interface IHuman {
    name: string;
    age: number;
    walk(): void;
}

class Human implements IHuman {
    
    public constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
    }

    walk(): void {
        console.log('I am walking...');
    }
}
```

上述代码在编译阶段能顺利通过，但是我们注意到在```Human```类中包含```constructor```构造函数，如果我们想在接口中为该构造函数定义一个签名并让```Human```类来实现这个接口，看会发生什么：

```js
interface HumanConstructor {
  new (name: string, age: number);    
}

class Human implements HumanConstructor {
    
    public constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
    }

    walk(): void {
        console.log('I am walking...');
    }
}
// -> Class 'Human' incorrectly implements interface 'HumanConstructor'.
// -> Type 'Human' provides no match for the signature 'new (name: string, age: number): any'.

```

然而TypeScript会编译出错，告诉我们错误地实现了```HumanConstructor```接口，这是因为当一个类实现一个接口时，只会对实例部分进行编译检查，类的静态部分是不会被编译器检查的。因此这里我们尝试换种方式，直接操作类的静态部分，示例如下：

```js
interface HumanConstructor {
  new (name: string, age: number);    
}

interface IHuman {
    name: string;
    age: number;
    walk(): void;
}

class Human implements IHuman {
    
    public constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
    }

    walk(): void {
        console.log('I am walking...');
    }
}

// 定义一个工厂方法
function createHuman(constructor: HumanConstructor, name: string, age: number): IHuman {
    return new constructor(name, age);
}

const man = createHuman(Human, 'tom', 18);
console.log(man.name, man.age); // -> tom 18

```

在上述示例中通过额外创建一个工厂方法```createHuman```并将构造函数作为第一个参数传入，此时当我们调用```createHuman(Human, 'tom', 18)```时编译器便会检查第一个参数是否符合```HumanConstructor```接口的构造器签名。

### 4、声明合并
在声明合并中最常见的合并类型就是接口了，因此这里先从接口开始介绍几种比较常见的合并方式。

#### 4.1 接口合并
示例代码如下：

```js
interface A {
    name: string;
}

interface A {
    age: number;
}

// 等价于
interface A {
    name: string;
    age: number;
}

const a: A = {name: 'tom', age: 18};

```

接口合并的方式比较容易理解，即声明多个同名的接口，每个接口中包含不同的属性声明，最终这些来自多个接口的属性声明会被合并到同一个接口中。

> 注意：所有同名接口中的非函数成员必须唯一，如果不唯一则必须保证类型相同，否则编译器会报错。对于函数成员，后声明的同名接口会覆盖掉之前声明的同名接口，即后声明的同名接口中的函数相当于一次重载，具有更高的优先级。

#### 4.2 函数合并
函数的合并可以简单理解为函数的重载，即通过同时定义多个不同类型参数或不同类型返回值的同名函数来实现，示例代码如下：

```js
// 函数定义
function foo(x: number): number;
function foo(x: string): string;

// 函数具体实现
function foo(x: number | string): number | string {
    if (typeof x === 'number') {
        return (x).toFixed(2);
    }
    
    return x.substring(0, x.length - 1);
}

```

#### 4.2 函数合并
函数的合并可以简单理解为函数的重载，即通过同时定义多个不同类型参数或不同类型返回值的同名函数来实现，示例代码如下：

```js
// 函数定义
function foo(x: number): number;
function foo(x: string): string;

// 函数具体实现
function foo(x: number | string): number | string {
    if (typeof x === 'number') {
        return (x).toFixed(2);
    }
    
    return x.substring(0, x.length - 1);
}

```

在上述示例中，我们对```foo```函数进行多次定义，每次定义的函数参数类型不同，返回值类型不同，最后一次为函数的具体实现，在实现中只有在兼容到前面的所有定义时，编译器才不会报错。

> 注意：TypeScript编译器会优先从最开始的函数定义进行匹配，因此如果多个函数定义存在包含关系，则需要将最精确的函数定义放到最前面，否则将始终不会被匹配到。

#### 4.3 类型别名联合
类型别名联合与接口合并有所区别，类型别名不会新建一个类型，只是创建一个新的别名来对多个类型进行引用，同时不能像接口一样被```实现(implements)```和```继承(extends)```，示例如下：

```js
type HumanProperty = {
    name: string;
    age: number;
    gender: number;
};

type HumanBehavior = {
    eat(): void;
    walk(): void;
}

type Human = HumanProperty & HumanBehavior;

let woman: Human = {
    name: 'tom',
    age: 18,
    gender: 0,
    eat() {
        console.log('I can eat.');
    },
    walk() {
        console.log('I can walk.');
    }
}

class HumanComponent extends Human {
    constructor(public name: string, public age: number, public gender: number) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    
    eat() {
        console.log('I can eat.');
    }
    
    walk() {
        console.log('I can walk.');
    }
}
// -> 'Human' only refers to a type, but is being used as a value here.

```

### 5、keyof 索引查询
在TypeScript中的```keyof```有点类似于JS中的```Object.keys()```方法，但是区别在于前者遍历的是类型中的字符串索引，后者遍历的是对象中的键名，示例如下：

```js
interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

type keys = keyof Rectangle;
// 等价于
type keys = "x" | "y" | "width" | "height";

// 这里使用了泛型，强制要求第二个参数的参数名必须包含在第一个参数的所有字符串索引中
function getRectProperty<T extends object, K extends keyof T>(rect: T, property: K): T[K] {
    return rect[property];
} 

let rect: Rectangle = {
    x: 50,
    y: 50,
    width: 100,
    height: 200
};

console.log(getRectProperty(rect, 'width')); // -> 100
console.log(getRectProperty(rect, 'notExist'));
// -> Argument of type '"notExist"' is not assignable to parameter of type '"width" | "x" | "y" | "height"'.

```

在上述示例中我们通过使用```keyof```来限制函数的参数名```property```必须被包含在类型```Rectangle```的所有字符串索引中，如果没有被包含则编译器会报错，可以用来在编译时检测对象的属性名是否书写有误。

### 6、Partial 可选属性
在某些情况下，我们希望类型中的所有属性都不是必需的，只有在某些条件下才存在，我们就可以使用```Partial```来将已声明的类型中的所有属性标识为可选的，示例如下：

```js
// 该类型已内置在TypeScript中
type Partial<T> = {
    [P in keyof T]?: T[P]
};

interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

type PartialRectangle = Partial<Rectangle>;
// 等价于
type PartialRectangle = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

let rect: PartialRectangle = {
    width: 100,
    height: 200
};

```

在上述示例中由于我们使用```Partial```将所有属性标识为可选的，因此最终```rect```对象中虽然只包含```width```和```height```属性，但是编译器依旧没有报错，当我们不能明确地确定对象中包含哪些属性时，我们就可以通过```Partial```来声明。

### 7、Pick 部分选择
在某些应用场景下，我们可能需要从一个已声明的类型中抽取出一个子类型，在子类型中包含父类型中的部分或全部属性，这时我们可以使用```Pick```来实现，示例代码如下：

```js
// 该类型已内置在TypeScript中
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
};

interface User {
    id: number;
    name: string;
    age: number;
    gender: number;
    email: string;
}

type PickUser = Pick<User, "id" | "name" | "gender">;
// 等价于
type PickUser = {
    id: number;
    name: string;
    gender: number;
};

let user: PickUser = {
    id: 1,
    name: 'tom',
    gender: 1
};

```

在上述示例中，由于我们只关心```user```对象中的```id，name```和```gender```是否存在，其他属性不做明确规定，因此我们就可以使用```Pick```从```User```接口中拣选出我们关心的属性而忽略其他属性的编译检查。

### 8、never 永不存在

```never```表示的是那些永不存在的值的类型，比如在函数中抛出异常或者无限循环，```never```类型可以是任何类型的子类型，也可以赋值给任何类型，但是相反却没有一个类型可以作为```never```类型的子类型，示例如下：

```js
// 函数抛出异常
function throwError(message: string): never {
    throw new Error(message);
}

// 函数自动推断出返回值为never类型
function reportError(message: string) {
    return throwError(message);
}

// 无限循环
function loop(): never {
    while(true) {
        console.log(1);
    }
}

// never类型可以是任何类型的子类型
let n: never;
let a: string = n;
let b: number = n;
let c: boolean = n;
let d: null = n;
let e: undefined = n;
let f: any = n;

// 任何类型都不能赋值给never类型
let a: string = '123';
let b: number = 0;
let c: boolean = true;
let d: null = null;
let e: undefined = undefined;
let f: any = [];

let n: never = a;
// -> Type 'string' is not assignable to type 'never'.

let n: never = b;
// -> Type 'number' is not assignable to type 'never'.

let n: never = c;
// -> Type 'true' is not assignable to type 'never'.

let n: never = d;
// -> Type 'null' is not assignable to type 'never'.

let n: never = e;
// -> Type 'undefined' is not assignable to type 'never'.

let n: never = f;
// -> Type 'any' is not assignable to type 'never'.

```

### 9、Exclude 属性排除
与Pick相反，Pick用于拣选出我们需要关心的属性，而Exclude用于排除掉我们不需要关心的属性，示例如下：

```js
// 该类型已内置在TypeScript中
// 这里使用了条件类型(Conditional Type)，和JS中的三目运算符效果一致
type Exclude<T, U> = T extends U ? never : T;

interface User {
    id: number;
    name: string;
    age: number;
    gender: number;
    email: string;
}

type keys = keyof User; // -> "id" | "name" | "age" | "gender" | "email"

type ExcludeUser = Exclude<keys, "age" | "email">;
// 等价于
type ExcludeUser = "id" | "name" | "gender";
````

在上述示例中我们通过在```ExcludeUser```中传入我们不需要关心的```age```和```email```属性，```Exclude```会帮助我们将不需要的属性进行剔除，留下的属性```id，name```和```gender```即为我们需要关心的属性。一般来说，```Exclude```很少单独使用，可以与其他类型配合实现更复杂更有用的功能。

### 10、Omit 属性忽略
在上一个用法中，我们使用Exclude来排除掉其他不需要的属性，但是在上述示例中的写法耦合度较高，当有其他类型也需要这样处理时，就必须再实现一遍相同的逻辑，不妨我们再进一步封装，隐藏这些底层的处理细节，只对外暴露简单的公共接口，示例如下：

```js
// 使用Pick和Exclude组合实现
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface User {
    id: number;
    name: string;
    age: number;
    gender: number;
    email: string;
}

// 表示忽略掉User接口中的age和email属性
type OmitUser = Omit<User, "age" | "email">;
// 等价于
type OmitUser = {
  id: number;
  name: string;
  gender: number;
};

let user: OmitUser = {
    id: 1,
    name: 'tom',
    gender: 1
};
```

在上述示例中，我们需要忽略掉```User```接口中的```age```和```email```属性，则只需要将接口名和属性传入```Omit```即可，对于其他类型也是如此，大大提高了类型的可扩展能力，方便复用。

### 总结
在本文中总结了几种```TypeScript```的使用技巧，如果在我们的```TypeScript```项目中发现有很多类型声明的地方具有共性，那么不妨可以使用文中的几种技巧来对其进行优化改善，增加代码的可维护性和可复用性。


