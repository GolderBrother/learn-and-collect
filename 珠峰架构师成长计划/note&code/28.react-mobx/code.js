// 7.mobx
// MobX为现有的数据结构(如对象，数组和类实例)添加了可观察的功能。
// observable就是一种让数据的变化可以被观察的方法
// 先把数据转化成可以被观察的对象，那么对这些数据的修改就可以备监视

/**
 * 7.1.1 引用类型 (observable) #
 * 类型	描述
 * 对象	
 * 数组
 */
const {
    observable,
    isArrayLike,
    computed
} = require("mobx");

// function myObservable(target) {
//     return new Proxy(target, {})
// }
// const o1 = new myObservable({
//     name: "james"
// });
// console.log(o1.name)

// const o2 = new observable([1, 2, 3]);
// o2.push(4);
// o2.pop();
// console.log(o2); // [ 1, 2, 3 ]
// console.log(Array.isArray(o2)); // true

/**
 * 7.1.2 基本类型(observable.box) #
 * 类型	描述
 * String	字符串
 * Boolean	布尔值
 * Number	数字
 * Symbol	独一无二的值
 */
// let num = observable.box(10),
//     str = observable.box('hello'),
//     bool = observable.box(true);
// num.set(100);
// str.set('world');
// bool.set(false);
// console.log(num.get(), str.get(), bool.get());
// 100 'world' false

/**
 * 7.1.3 decorator
 */
class Store {
    @observable name = "james";
    @observable age = 18;
    @observable isMarried = false;
    @observable hobbies = [];
    @observable area = '0592';
    @observable phonenumber = '12345678';
    @observable province = '福建';
    @observable city = '厦门';
    @computed home() {
        return this.province + this.city
    }
    @observable skills = new Map();

}
const store = new Store();
let cell = computed(() => `${store.area}-${store.phonenumber}`)
console.log(cell.get());
store.area = '020';
store.number = '15718856132';
console.log(cell.get());
console.log(store.home);
store.province = '山东';
store.city = '济南';
console.log(store.home);

/**
 * 8.2 autorun #
 * 如果使用修饰器模式，则不能再用observe方法了
 * 当你想创建一个响应式函数，而该函数本身永远不会有观察者时,可以使用 mobx.autorun
 * 当使用 autorun 时，所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发
 * 数据渲染后自动渲染
 */

autorun(() => {
    //console.log(store.province,store.city);
    console.log(store.home);
});

store.province = '山东';
store.city = '济南';

/**
 * 8.3 when
 * when 观察并运行给定的 predicate，直到返回true。
 * 一旦返回 true，给定的 effect 就会被执行，然后 autorunner(自动运行程序) 会被清理。
 * 该函数返回一个清理器以提前取消自动运行程序。
 */
when(predicate: () => boolean, effect ? : () => void, options ? )

let dispose = when(() => store.age >= 18, () => {
    console.log('你已经成年了!')
});
dispose();
store.age = 10;
store.age = 20;
store.age = 30;