function greeting(name:string):void{
  console.log('hello',name)
}
greeting('zfpx');
//ts 形参和实参要完全一样
function greeting2(name:string,age?:number):void{
    console.log('hello',name,age)
}
greeting2('zfpx2');

function ajax(url:string,method:string='GET'){
  console.log(method,url);
}
ajax('/user');
//剩余参数
function sum(...numbers:number[]){
  return numbers.reduce((val,item)=>{
    return val+item;
  },0);
}
let ret = sum(1,2,3,4,5);
console.log(ret);