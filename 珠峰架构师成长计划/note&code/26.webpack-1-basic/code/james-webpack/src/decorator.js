function readonly(target, key, descriptor) {
    descriptor.writable = false;
}
class Person {
    @readonly PI = 3.14;
}
let p1 = new Person();
p1.PI = 3.2;
console.log(PI);
