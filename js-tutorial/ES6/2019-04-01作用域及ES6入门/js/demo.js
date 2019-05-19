window.onload = function(){
    //同一个作用域  内后面的变量值覆盖
    var a = 1;
    var a = 2;
    console.log(a);
    console.log(b);
    var b = 3;
   // 1、var b; undefined  2、 console.log(b);  3、b=3;

    //分二步： 1、预解析代码   2、逐行执行代码
    //var    function 

    console.log(c)   //c is not defined
    var a = 1;
    var b;
    c = 2;
    d();
    function d() {   //函数声明
        console.log(3)
    };
    e();  //error
    var e = function(){   //函数表达式
         console.log(4)
    };
    //变量和函数重名时，函数的优先级比变量高    注意：预解析
    //函数和函数重名时，遵循由上而下
    var f = 123;
    function f(){
        console.log(456);
    };
    //预解析
    //var f  ;未定义
    //f 的值 函数本身
    //执行过程
   // f = 123;

   console.log(a);
   var a = 1;
   function a(){
       console.log(2);
   };
   console.log(a);
   var a = 3;
   console.log(a);
   function a(){
       console.log(4);
   };
   console.log(a);

   //let const   不存在变量提升
   console.log(x);
   let x = 1;

   //作用域    es5  全局作用域  函数作用域
//    var a1 = 1;
//    function f1(){
        //console.log(a1);    undefined
//       var a1 = 2;
//    };
//     console.log(a1)
//    f1()
    var a1 = 1;
        function f1(){
            console.log(a1);
             a1 = 2;
        }
        console.log(a1);
    //同一个作用域中不能重复定义同一个名称
    let a = 10;
    let a = 20;   //error

    //var 函数作用域   let块级作用域 {}
    function f2(){
        let n = 10;
        if(true){
            let n = 20;
        }
        console.log(n)
    };
    f2();
    //const   定义只读的常量
    const a =2;   
    a = 5;//error
    const a;  //error
    const obj = {};
    obj.name = 'abc';
    const arr = [];
    arr.push(1);

    //箭头函数
    var f = v => v;   //var 变量名 = 参数 =>函数体
    var f = function(v){
        return v;
    };

     var f = function(){
        return 123;
    };
    var f = () => 123;
    var f = function(n1,n2){
        return n1+n2;
    };
    var f = (n1,n2) => n1+n2;
    var f = function(n1,n2){
        list(n1,n2)
    };
    var f = (n1,n2) => ({name:n1,msg:n2});
    //数据结构   数组    对象
   // set   map
   var m = new Map();
   m.set('name','abc')
   m.get('name')
   m.size;   //长度

   var arr = ['a','b','c'];
   for(let v of arr){
       console.log(v)
   }
   for(let [key,value] of m){
       console.log()
   }
}

