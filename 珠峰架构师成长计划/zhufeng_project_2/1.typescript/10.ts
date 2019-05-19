function attr(key:string):any;
function attr(key:string,val:any):void;
let myobj:any = {};
function attr(key:string,val:any){
    if(arguments.length>1){
        myobj[key] = val;
    }else{
        return myobj[key] ;
    }
}
attr('name','zfpx');
console.log(attr('name'))