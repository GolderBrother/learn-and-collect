window.onload =function(){
    function myHello(person:string){   //:指定变量的类型，：前后可有/无空格
        return 'hello'+person;
    };
    let name = 'sonia';
   // myHello(name);
    //document.getElementById("h1").innerHTML = myHello(name);
    //类型 原始数据类型   和对象类型
    let flag:boolean = false;   //布尔值
    let num:number = 6;   //数值
    let str:string = 'abc'; //字符串
    let un:undefined = undefined;
    let n:null = null;
    let str2:string = `hello,${str}`;
    document.getElementById("h1").innerHTML = str2;
    //任意值 Any 允许赋值为任意类型
    let a:any ='123';
        a=123;
    let a1;
        a1='a1';
        a1=1;
    //相当于
    let a2:any;
        a2='a1';
        a2=1;
    //联合类型 可以设定多个类型中的一种
    let a3:string | number ;
        a3='a3';
        a3=3;
    function myHello2(str:string | number){   //:指定变量的类型，：前后可有/无空格
        return str.length;    //因为number没有length属性
    };
    //联合类型访问的是所有类型共有的属性和方法
    let a4:string | number[] ;
        a4='a3';
        a4=[1,2,3];
    function myHello3(str:string | number[]):number{   //:指定变量的类型，：前后可有/无空格
        return str.length;
    };
    console.log(myHello2(a3))

    //数组  类型+[]
    let arr2:number[] = [1,2,3,4,5];
    let arr3:string[] = ['1','2','3'];
    let arr4:any[] = ['1',2,'3',true];
    //对象 ——接口  接口首字母大写
    interface Person {
        name:string;
        age:number;
    };
    let obj:Person = {
        name:'Tom',
        age:18,
    };
    //定义的变量不符合接口的属性是不允许的
    let obj2:Person = {
        name:'Tom',
        age:18,
        //sex:'男'    //报错
    };
    //可选属性
    interface Person2 {
        name:string;
        age?:number;    //可选属性
    };
    let obj3:Person2 = {
        name:'Tom',
        age:18,    //可有可无
    };
    //任意属性   ****
    //注意 一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性
    interface Person3 {
        name:string;  //确定属性
        age?:number;    //可选属性
        [propName:string]:any;   //任意属性
    };
    let obj4:Person3 = {
        name:'Tom',
        age:18,    //可有可无
        sex:'男'
    };
    //函数  函数定义分函数声明和函数表达式
    //函数声明
    function sum(x,y){
        return x+y;
    };
    //相当于
    function sum1(x:number,y:number):number{
        return x+y;
    };
    sum1(1,3);  //正确
    //sum1(1,3,5);  //报错
    //sum1(1);  //报错
    //参数默认
    function sum4(x:number=5,y:number):number{
        return x+y;
    };
    sum1(1,3); 
    //可选参数
    //注意****  可选参数必须在必须参数的后面  换言之 可选参数是最后一个
    function sum5(x:number,y?:number):number{
        //return x+y;
        if(y){
            return x+y;
        }else {
            return x;
        }
    };
    console.log(sum5(1));

    //函数表达式
    let sum2 = function(x,y){
        return x+y;
    };
    //相当于
    let sum3 = function(x:number,y:number):number{
        return x+y;
    };
}