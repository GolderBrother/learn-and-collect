/**
 * 接口 本质上是一种约束
 * 约束对象
 */
interface userInterface{
    home?:string,
    height?:number,
    name:string,
    age:number
}
function getUserInfo(user:userInterface):void{
   console.log(`${user.name} ${user.age} ${user.home}`)
}
function getVipInfo(user:userInterface):void{
    console.log(`${user.name} ${user.age}`)
 }
getUserInfo({name:'zfpx',age:10,home:'beijing'});
getVipInfo({name:'zfpx',age:10});
