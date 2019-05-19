class Parent{
    constructor(name){
        this.name = name;
    }
}
class Child extends Parent{
   
    getName(){
        console.log(this.name);
    }
}
//因为子类会默认调用父类的构造函数
let c = new Child();
c.getName();

res.cookie('name','zfpx');
res.cookie('age','9');
res.cookie('connect.sid','9');