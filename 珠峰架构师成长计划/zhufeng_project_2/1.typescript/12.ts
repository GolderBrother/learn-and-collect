class Person2{
    //静态属性
   static myname='hello' 
    //加上static表示这个属性是静态的属性，是属于类的属性，可以通过类名来调用
   static getName(){

   }
}
let p2 = new Person2();
console.log(Person2.myname);
console.log(Person2.getName);
//console.log(p2.getName);

class Animal2{
    speak(){
        throw new Error('这是一个抽象的方法，不能直接 使用');
    }
}
class Dog extends Animal2{
    speak(){
        console.log('小狗汪汪汪!');
    }
}
class Cat extends Animal2{
    speak(){
        console.log('小猫喵喵喵!');
    }
}
let dog = new Dog();
dog.speak();
let cat = new Cat();
cat.speak();



abstract class Animal3{
    public abstract speak():void;
}
class Cat3 extends Animal3{
    speak(){
        console.log('小猫喵喵喵!');
    }
    speak2(){
        console.log('小猫喵喵喵!');
    }
}