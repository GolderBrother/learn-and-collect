function greeting(name:string):void{
  console.log('hello',name);
}
greeting('zfpx');

let xxx:never;
//xxx = (()=>{
    //throw new Error('Wrong')
//})();


let yy:object = {name:'zfpx2'};
console.log(yy);