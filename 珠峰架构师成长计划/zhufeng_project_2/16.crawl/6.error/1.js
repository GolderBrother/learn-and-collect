//监听 uncaughtException可以捕获那些没有try catch的异步捕获之后则系统将不再退出
process.on('uncaughtException',function(err){
   console.log(err.stack);
});
function go(){
    try{
        setTimeout(function(){
            console.log(a);
        },1000);
        //throw new Error('Wrong');
    }catch(e){
        console.log(e);
    }
}
go();
setTimeout(function(){
 console.log('after go');
},3000);