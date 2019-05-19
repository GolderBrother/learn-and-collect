//如果希望对一个函数的参数和返回值 进行约束
interface discount{
    (price:number):number
}

let cost:discount = function(price:number):number{
  return price*.8;
}
console.log(cost(100));

