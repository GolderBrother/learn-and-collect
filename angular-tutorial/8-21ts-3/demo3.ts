window.onload = function(){
    //泛型
    function myHello(name:any):any{
        return name;
    }
    let n = 123;
    myHello(n);
    //捕捉参数的类型  T泛型变量 表示为任何类型 而非值
    function myHello2<T>(name:T):T{
        return name;
    }
    let n1 = 123;
    //myHello2<string>(n1);
    //第一种传入参数
    myHello2<number>(n1);
    //类型推断
    myHello2(n1);

    //泛型类型  使用了泛型的函数几种写法
    //函数声明
    function myHello3<T>(name:T):T{
        return name;
    }
    //函数表达式
    var s = function<U>(name:U):U{
        return name;
    }
    //es6箭头函数
    var s2 = <T>(name:T):T=>name;

    //泛型约束
    // function myHello4<T>(name:T):T{
    //     console.log(name.length);  //并不是所有的类型都有length 比如数值
    //     return name;
    // }
    function myHello4<T>(name:T[]):T[]{
        console.log(name.length);
        return name;
    }
    //泛型T必须符合接口   使用extends
    interface LengthNum {
        length:number;
    };
    function myHello5<T extends LengthNum>(name:T):T{
        console.log(name.length);
        return name;
    }
    //myHello5(123);  //报错
     myHello5('123');  //正常

     //泛型数组
     let arr3:Array<string> = ['1','2','3'];
     let arr2:string[] = ['1','2','3'];

     function cArray(length:number,value:any):any{
        let d =[];
        for(let i = 0;i<length;i++){
            d[i] = value;
        }
        return d;
    };
    cArray(3,'a');   //['a','a','a'...]
    //泛型
     function cArray2<T>(length:number,value:T):Array<T>{
        let d =[];
        for(let i = 0;i<length;i++){
            d[i] = value;
        }
        return d;
    };
    cArray2<string>(3,'1');   //[1,1,1]

    //多个类型参数
    function multi<N,S>(sum:[N,S]):[S,N]{
        return[sum[1],sum[0]]
    }
    console.log(multi([1,'a'])) //['a',1]

    //枚举 enum 类型是对JS数据类型的一个补充
    var q1 = ['a','b','c','d'];   //q1[1]   q1.b
    var o = {name:'a',age:18}; //o.name
    enum Color {Red,Green,Blue};   //索引0
    //let c = Color.Red;  //0
    let c:string = Color[1];   //Green
    console.log(c);
    
    //手动指定成员数值 
    //注意：赋值如果重复了，后面的会覆盖前面的，尽量不要重复
    enum Color1 {Red=3,Green=1,Blue=1};   
    //let c = Color.Red;  //0
    let c1:string = Color1[1];   
    console.log(c1);

    //小数
    enum Color2 {Red=1.5,Green,Blue};   
    let c2 = Color2.Green;  //2.5
    //let c2:string = Color2[1];   
    console.log(c2);

    //任意值
    enum Color3 {Red=1.5,Green,Blue=<any>'b'};   
    //let c3 = Color3.Blue;  //  b
    let c3:string = Color3['b'];  //Blue
    console.log(c3);

    //枚举有二种：常数项和计算所得项
    var a4 = 'abc';
    enum Color4 {Red=1.5,Green=<any>a4,Blue='blue'.length}; 
    //enum Color4 {Red=<any>a4,Green,Blue}; //注意 计算所得项后面不能是未手动赋值，因为无法获得初始值  
    //let c4 = Color4.Blue;  //  4
    let c4 = Color4.Green;  //  abc
    console.log(c4);

    
}