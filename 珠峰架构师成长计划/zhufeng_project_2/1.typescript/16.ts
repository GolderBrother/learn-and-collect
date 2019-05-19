//如何用接口约束类
interface Animal5{
    name:string;
    speak(something:string):void
}
interface Bird{
    fly():void
}
interface MachineBird extends Bird {
    machineFLy():void
}
class Dog5 implements Animal5,MachineBird{
   constructor(public name:string){
    this.name = name;
   }
   speak(something:string):void{
     console.log('小狗汪汪汪');
   }
   fly(){
    console.log('坐在风口上，狗也可以飞起来!');
   }
   machineFLy(){
    console.log('坐在火箭上飞!');
   }
}
let dog5 = new Dog5('zfpx');
console.log(dog5);
dog5.fly();