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
    //name2 = 123;   //error
    document.getElementById("h1").innerText = name;

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
    //定义的变量与接口保持一致
    let ben2:Person ={    //error
        name: 'ben',
    }
    let ben3:Person ={   //error
        name: 'ben',
        sex:'man'
    }
    //可选属性
    interface Person2{
        name: string;
        age?: number;    //可选属性
    }
    let ben4:Person2 ={   //error
        name: 'ben'
    }
    //任意属性 注意：一旦定义了，确定属性和可选属性必须是它的子属性
    interface Person3{
        name: string;   //确定属性
        age?: number;    //可选属性
        [paropName:string]:any; //任意属性
    } 
    let ben5:Person3 ={   //error
        'name': 'ben',
        'sex':'man'
    }

    //函数声明   二种方式   函数声明   函数表达式  
    //输入和输出
    function f(x:number,y:number):number{    //函数声明 
        return x+y;
    }
    //f(3,5);   //参数个数匹配
    var f2 = function(x:number,y:number):number{   //函数表达式
        return x+y;
    }
    //f2(3,5);
    //参数默认值
    function f3(x:number=5,y:number):number{    //函数声明 
        return x+y;
    }
    //f3(3,5);

    //参数默认值
    function f4(x:number,y:number=5):number{    //函数声明 
        return x+y;
    }
    console.log(f4(3)); //8
    //可选参数   注意：可选参数必须接在必需参数的后面（可选参数后不允许出现必需参数）
    function f5(x:number,y?:number):number{    //函数声明 
        if(y){
            return x+y
        }else {
            return x
        }
    }
  // console.log(f5(3,8));   //11

  //类型别名   type
  type s = string; //类型别名 
  var name:s = 'sonia';
    function fun6(name:s):s{
        return 'hello ' + name;
    };
    fun(name);
    type abc = string | number[];
    type n = number;
    a3 = 'abc';
    a3 = [1,2,3];
    function fun7(a3:abc):n{
        return a3.length;      //对于联合类型返回符合所有类型里共有的属性和方法
    };
}