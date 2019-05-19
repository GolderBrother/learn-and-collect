window.onload = function(){
    //构造函数   ES5
    function Cat(name,color) {
        this.name=name;
        this.color=color;
        //this.type='动物';
        // this.eat = function(){
        //     console.log('吃老鼠')
        // }
    }
    //原型中
    Cat.prototype.type='动物';
    Cat.prototype.eat = function(){
        console.log('吃老鼠')
    };
    var cat1 = new Cat('大明','白色');
    //clsss类   ES6
    class Cat2 {
        name:string;
        color:string;
        constructor(name:string,color:string){
            this.name=name;
            this.color=color;
        }
        eat(){
            console.log('吃老鼠')
        }
    };
    var cat2 = new Cat2('大明','白色');
    class A{
        a:string;
        name:string;
        constructor(a:string,name:string){
            this.a = a;
            this.name = name;
        }
    }
    class B extends A{
        b:string;
        constructor(a,name){
            super(a,name);   //关键字   调用父类构造函数和方法   
            this.b = '456'
        }
    }
    //var a = new A();
    var b = new B('a','abc');
    b.name  


    //修饰符静态方法  static 不需要实例化处理  可以直接通过类来调用
    class Animal{
        static eat(){
            console.log('吃老鼠')
        }
    }
    //var a = new Animal()   a.eat()  //error
    Animal.eat()

    //ts中三种修饰符 修饰属性和方法 public private  protected
    //public 修饰属性和方法是公共的，任何地方都可以访问
    //private  私有的  不能在外部声明和使用
    //protected 修饰属性和方法是受保护的  区别是子类可以访问
    class Animal2{
        //public name:string; 
        //private name:string;  
        protected name:string;   //不允许子类访问
        constructor(name:string){
            this.name = name;
        }
        public eat():string{
            return '吃老鼠';
        }
    }
    var a = new Animal2('abc') ;
    //a.name
    //a.eat()

    class Dog extends Animal2{
        constructor(name){
            super(name);
        }
        action():string{
            return this.name;   //调用父类的
        }
    }
    var d = new Dog('tom');
    d.action();

    //类实现接口
    //实现  implements
    //门是一个类   防盗门是属于门的子类   防盗门添加一个报警器的功能
    //除了门，车也有报警器的功能
    //报警器提取出来，作为一个接口   门，车去实现它
    //报警器接口
    interface Alarm{
        sing();    //抽象空的方法  规范
    }
    interface Light{
        lightOn();    //抽象空的方法  规范
        lightOff();
    }
    //定义门
    class Door{}
    //防盗门是属于门的子类
    class SecurityDoor extends Door implements Alarm{   //防盗门继承了门实现了报警的功能
        sing(){
            console.log('sing....')
        }
    }
    //车实现报警器  一个类可以实现多个接口
    class Car implements Alarm,Light{
        sing(){
            console.log('....')
        }
        lightOn(){

        }
        lightOff(){
            
        }
    }
    var s2 = new SecurityDoor();
    var car = new Car();
    s2.sing();
    car.sing();

}