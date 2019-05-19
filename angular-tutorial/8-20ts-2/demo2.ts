window.onload = function(){
    //类型别名  type
    function myHello(person:s){   //:指定变量的类型，：前后可有/无空格
        return 'hello'+person;
    };
    type s = string;
    let name:s = 'sonia';

    //联合类型 可以设定多个类型中的一种
    //可以设定多个类型
    type abc = string | number[];
    let a3:abc;
        a3='a3';
        a3=[1,2,3];
        //a3=true;
    function myHello2(str:abc){   //:指定变量的类型，：前后可有/无空格
        return str.length;    
    };
    
    //类  class  它包含属性和方法
    //es5中通过构造函数实现类的概念
    function Cat(name,color) {
        this.name = name;
        this.color = color;
        //this.type = '动物';
        // this.eat =function(){
        //     console.log('吃老鼠');
        // }
    }
    //原型中
    Cat.prototype.type='动物';
    Cat.prototype.eat =function(){
        console.log('吃老鼠');
    };
    var cat1 = new Cat('大明','黑色');
    var cat2 = new Cat('小明','白色');

    //class 类
    //注意，方法之前不要添加逗号分隔
    class Cat2 {
        name:string;
        color:string;
        constructor(name,color){
            this.name = name;
            this.color = color;
        }
        eat(){
            return '吃老鼠';
        }
        sayName(){
            return `my name is ${this.name}`;
        }
    }
    var cat3 = new Cat2('小小明','花色');//类必须使用new调用，否则会报错 ，通过new生成新实例时，会自动调用构造函数
    console.log(cat3.eat());

    //static  静态方法  修饰符 不需要实例化，是可以直接通过类来调用
    class Cat4{
        static eat(a){
            return a;
        }
    };
    //var c1 = new Cat4('aa');   //错误
    console.log(Cat4.eat('aa'));

    //类继承  
    //动物类
    class Animal {
        name:string;
        constructor(name){
            this.name = name;
        }
        eat(){
            return '吃肉';
        }
    };
    //继承  extends 关键字实现继承  ，子类中使用super来调用父类的构造函数和方法
    class Dog extends Animal {
        constructor(name){
            super(name);   //调用父类的constructor(name)
        }
        sayHi(){
            return this.name+','+super.eat()
            //return this.name+','+this.eat()
        }
    }
    var d = new Dog('TT');
    console.log(d.sayHi());
    console.log(d.eat());

    //TS中类的用法
    //TS可以使用三种方问修饰符 public / private  /protected
    //public 修饰的属性或方法都是公共的，任何地方都可以访问
    class Animal1 {
        public name:string;
        public constructor(name){
            this.name = name;
        }
    };
    var p1 = new Animal1('p1');
    p1.name;
    //private  不能外部访问
    class Animal2 {
        private nampublice:string;
        public constructor(name){
            this.name = name;
        }
        eat(){
            return this.name;
        }
    };
    var p2 = new Animal2('p2');
    p2.name;  //无法访问
    //protected  修饰的属性和方法是受保护的，它和private类似，区别：它的子类允许访问
    class Animal3 {
        protected name:string;
        public constructor(name){
            this.name = name;
        }
        private eat(){
            return this.name;
        }
    };
    class Dog2 extends Animal3 {
        constructor(name){
            super(name);   //调用父类的constructor(name)
        }
        sayHi(){
            return this.name+','+super.eat()
            //return this.name+','+this.eat()
        }
    };
    //类的类型
    class Animal4 {
        name:string;
        constructor(name:string){
            this.name = name;
        }
        eat():string{
            return this.name;
        }
    };
    var a = '123';
    var a4:Animal4 = new Animal4(a);

    //类实现接口
    //实现 implements 
    //门是一个类，防盗门是门的子类，防盗门有报警器的功能；为防盗门添加一个报警方法；
    //车是一个类，车是不是报警器的功能；
    //提取报警器提出来，作为一个接口 ；防盗门/车都去实现
    //报警器 
    interface Alarm {
        sing();  //一个抽象空的方法  类似于一个规范
    };
    //定义门
    class Door{

    }
    //防盗门是门的子类
    class securityDoor extends Door implements Alarm {  //防盗门继承门实现报警器的功能
        sing(){
            console.log('securityDoor sing')
        }
    }
    //车实现报警器的功能
    class Car implements Alarm {
        sing(){
            console.log('Car sing')
        }
    }
    var d1 = new securityDoor();
    var sum = 5;
    if(sum >3){
        d1.sing();
    };

    //一个类可以实现多个接口
    interface Alarm2 {
        sing();  //一个抽象空的方法  类似于一个规范
    };
    interface Light {
        lightOn();  //一个抽象空的方法  类似于一个规范
        lightOff();  //一个抽象空的方法  类似于一个规范
    };
    class Car2 implements Alarm2,Light {
        sing(){
            console.log('Car sing')
        }
        lightOn() {

        }
        lightOff(){

        }
    }

    //接口继承接口
    interface Alarm3 {
        sing();  //一个抽象空的方法  类似于一个规范
    };
    interface Abc extends Alarm3 {
        abc();  //一个抽象空的方法  类似于一个规范
    };

    //接口继承类
    class Xyz {
        x:string;
        y?:number;
    }
    interface Aa extends Xyz{
        z:number;
    }
    // interface Person {
    //     name:string;
    //     age:number;
    // };
    let obj:Aa = {
        x:'Tom',
        //y:18,
        z:3
    };
}