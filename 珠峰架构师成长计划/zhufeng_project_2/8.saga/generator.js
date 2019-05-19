function* gen(){
    console.log('start');
    let a = yield 1;
    console.log('a',a);
    let b = yield 2;
    console.log('b',b);
    let c = yield 3;
    console.log('c',c);
    console.log('end');
}
let it = gen();
let result = it.next();
console.log(result);//{ value: 1, done: false }
result = it.next();
console.log(result);//{ value: 2, done: false }
result = it.next();
console.log(result);//{ value: 3, done: false }
result = it.next();
console.log(result);//{ value: 3, done: false }
