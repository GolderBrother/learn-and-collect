window.onload = function(){
    var name = 'sonia';
    function fun(name:string){
        console.log('hello ' + name);
    };
    fun(name);
    //类型
    var age:number = 18;
    var name:string = 'abc';
    var name:string = `hello,${name}`;
    var flag:boolean = false;
    var u:undefined = undefined;
    var n:null = null;
    //普通类型在赋值过程中改变类型是不允许的
    var name2:string = 'abc';
    name2 = 123;   //error

    //任意类型 any
    let a:any = 'string';
    a = 123;
    //在声明时，未指定类型，会被识别为任意类型
    let a2;
    a2 = 123;
    a2 = 'abc';
    
    //联合类型   表示值可以符合多种类型 
    let a3:string | number[];    //number[]数组
    a3 = 'abc';
    a3 = [1,2,3];
    function fun2(a3:string | number[]){
        return a3.length;      //对于联合类型返回符合所有类型里共有的属性和方法
    };
    fun2(a3)
    //数组   最简单的方法   类型+方括号
    let arr1 :number[] = [1,2,3];
    let arr2 :string[] = ['1','2','3'];
    let arr3 :any[] = ['1',2,'3'];
    //对象    接口  对象的类型——接口
    //接口首字母大写  定义一个接口
    interface Person{
        name: string;
        age: number;
    }
    //对象受到接口的约束
    let ben:Person ={
        name: 'ben',
        age: 12,
    }

}