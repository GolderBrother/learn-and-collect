window.onload = function(){
    var name = 'sonia';
    function fun(name:string):string{    //固定的类型string
        console.log('hello ' + name);
        return name;
    };
    fun(name);
    //对于可复用的方法   要兼容更多的类型
    function fun2(name:any):any{    
        console.log('hello ' + name);
        return name;      //any存在问题，传入值的类型，但无法获取返回值 的类型
    };
    fun2(123);
    //泛型  是指在定义函数/接口/类时，不预先指定具体的类型，而在使用的时候再指定类型的一种特性；
    //T 泛型变量  表示任何类型
    function fun3<T>(name:T):T{    
        console.log('hello ' + name);
        return name;      //any存在问题，传入值的类型，但无法获取返回值 的类型
    };
   // fun3<string>('abc');   //定义了泛型函数后，使用方式传入参数
    //对类型进行了限定
   // fun3<string | number>('abc');    定义多个类型
   //第二种方式  类型推断   编译器会根据参数来自动判断类型
   fun3(123);     //<number>

   //函数定义
   //函数声明
   function fun5<T>(name:T):T{    
       return name
   }
   //函数表达式
   let fun6 = function<A>(name:A):A{
        return name;
   }
   //ES6
   let fun7 =<U>(name:U):U => name;

   //接口在函数中的运用
    function f1(obj:{name:number}):void{    //void无返回值
        console.log(obj.name)
    }
    f1({name:123})
    //接口
    interface ObjName{
        name: string;
    }
    function f2(obj:ObjName):void{    //void无返回值
        console.log(obj.name)
    }
    f2({name:'123'})

    //JS 传入二个参数，第二个参数是否匹配第一个参数的内容
    interface Search{     //接口
        (a:string,b:string):boolean;
    }
    let f3:Search = function(str1:string,str2:string):boolean{    //void无返回值
        let index = str1.indexOf(str2);   //-1
        return index == -1;     //true/false
    }
    f3('https://123.com','c')

    //泛型
    interface Search2{     //接口
        <T>(a:T,b:T):boolean;
    }
    let f4:Search2 = function<T>(str1:T,str2:T):boolean{    //void无返回值
        return str1==str2;     //true/false
    }
    f4<number>(123,456)

    //约束泛型    泛型符合接口的形状
    interface LengthNum{
        length:number;
    }
    function f5<T extends LengthNum>(name:T):T{    
        return name;      
    };
    f5<string>('123');

    //泛型在类中的运用
    class A2<T>{
        n:T;      //表示属性的类型
        constructor(num){    //值的类型
            this.n = num;
        }
        action(x:T):T{
            return x
        }
    };
    var a2 = new A2<number>('2');    //实例化 
    a2.action(3)


    //数组泛型 也可以使用数组泛型 Array<elemType> 来表示数组
    let arr: Array<any> = [1, '1', true, 3, 5];   //number[]
    //这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型
    function createArray(length: number, value: any): Array<any> {
          let result = [];
          for (let i = 0; i < length; i++) {
                result[i] = value;
          }
          return result;
    }
   createArray(3, 'x');  //['x','x','x']
   //我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，
   //在后面的输入 value: T 和输出 Array<T> 中即可使用了。
   function createArray2<T>(length: number, value: T): Array<T> {
          let result: T[] = [];
          for (let i = 0; i < length; i++) {
                result[i] = value;
          }
          return result;
    }
    createArray2<string>(3, 'x'); 

    
}
