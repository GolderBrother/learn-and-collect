// 6.3 Promise/Deferred模式
// 6.4 生成器Generators/ yield
// 当你在执行一个函数的时候，你可以在某个点暂停函数的执行，并且做一些其他工作，然后再返回这个函数继续执行， 甚至是携带一些新的值，然后继续执行。
// 上面描述的场景正是JavaScript生成器函数所致力于解决的问题。当我们调用一个生成器函数的时候，它并不会立即执行， 而是需要我们手动的去执行迭代操作（next方法）。也就是说，你调用生成器函数，它会返回给你一个迭代器。迭代器会遍历每个中断点。
// next 方法返回值的 value 属性，是 Generator 函数向外输出数据；next 方法还可以接受参数，这是向 Generator 函数体内输入数据
// 6.4.1 生成器的使用

function* foo() {
    var index = 0;
    while(index < 2) {
        yield index++;
    }
}
 // 返回的其实是一个迭代器
var bar = foo();
console.log(bar.next());
console.log(bar.next());
console.log(bar.next());
// { value: 0, done: false }
// { value: 1, done: false }
// { value: undefined, done: true }
