//let str = '123456';
let str = [1,2,3];
console.log(...str);
for(let val of str){
    console.log(val);
}
console.log(str[Symbol.iterator]);
let count = 1;
const obj = {
    [Symbol.iterator] : function () {
      return {
        next: function () {
          return {
            value:count++,
            done: count>=3
          };
        }
      };
    }
  };
let it = obj[Symbol.iterator]();
let result = it.next();
console.log(result);
result = it.next();
console.log(result);
result = it.next();
console.log(result);

typeof effect[Symbol.iterator]=='function'