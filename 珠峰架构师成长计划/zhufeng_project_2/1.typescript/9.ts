/**
 * 函数的重载
 * Java里面呢重载 是指两个或两个以上的函数，参数的个数和类型不一样
 * TS中的函数重载
 */
//函数的声明  只是用来限制参数的个数和类型
/* function attr(val:string):void;
function attr(val:number):void;
function attr(val:boolean):void; */
function attr(val:string|number|boolean):void{
   if(typeof val =='string'){

   }else if(typeof val =='number'){

   }else if(typeof val =='boolean'){

}
}
attr('zfpx');
attr(10);
attr({});


function parse(str:string):any|never{
    return JSON.parse(str);
}
let obj = parse('{"name":"zfpx"');
console.log(obj);

function multi(a:number,b:number):void{
   return 1;
}