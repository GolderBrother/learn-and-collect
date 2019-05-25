### 设计模式（简单的几种）

#### 工厂模式

```
function person(name,age){
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.showName = function(){
        return this.name
    }
    return obj;
};
var p1 = person('a1',20);
var p2 = person('a2',20);
```
//缺点：全部都是object date array


```
//构造函数模式
function Person(name,age){
    this.name = name;
    this.age = age;
    this.showName = function(){
    return this.name
    }
};
```
```
var p1 = new Person('a1',20);
var p2 = new Person('a2',20);
```
//缺点：每次创建实例时都要重新创建一次方法


#### 混合模式(原型模式+构造函数模式)
```
function Person(name,age){
    this.name = name;
    this.age = age;
    //this.showName = showName;
    };
    Person.prototype.showName = function(){
    return this.name
}
var p1 = new Person('a1',20);
var p2 = new Person('a2',20);
```

#### 单例模式（单体模式） 只有一个实例
```
function createWindow() {
    var div = document.createElement("div");
    div.innerHTML="hello world";
    div.style.display = "none";
    document.body.appendChild(div);
    return div;
};
    var createWindow = (function() {
    var div;
    return function (){
    if(!div){
    div = document.createElement("div");
    div.innerHTML="hello world";
    div.style.display = "none";
    document.body.appendChild(div);
    };
    return div;
    }
})();
document.getElementById("btn").onclick = function() {
var str = createWindow();
str.style.display ='block';
};
```

#### 观察者模式（订阅模式）
//1、发布 者（卖家）

//2、发布者添加一个缓存列表(用于存入订阅者回调函数）

//3、发布 消息，遍历缓存列表，依次触发订阅者的回调函数

```
var obj ={}; //卖家
obj.list = []; //缓存列表
obj.listen = function(fn) { //订阅者信息（增加）
obj.list.push(fn);
};
obj.trigger = function(){ //发布消息
// for(var i=0,fn;fn=this.list[i++];){
// fn.apply(this,arguments);
// }
for(var i=0;i<this.list.length;i++){
var fn;
fn = this.list[i];
//fn这个函数在当前对象中调用
fn.apply(this,arguments); //arguments内置的属性 类似是Array 
}
};
//小红订阅消息
obj.listen(function(color,size){
console.log('姓名'+'小红');
console.log('颜色'+color);
console.log('尺寸'+size);
});
//小明订阅消息
obj.listen(function(color,size){
console.log('姓名'+'小明');
console.log('颜色'+color);
console.log('尺寸'+size);
});
//发布消息
obj.trigger('红色','s');
```


#### 适配器模式

```
//自行车 bike 人驱动 Hdrive
//电动车 Ebile 电驱动 Edrive

//自行车抽象类 便于扩展功能
var Bike = function() {}
Bike.prototype.wheel = function() {
throw new Error("错误") //自定义错误信息
};
Bike.prototype.Hdrive= function() {
throw new Error("错误")
};
//电动车抽象类 便于扩展功能
var Ebile = function() {}
Ebile.prototype.wheel = function() {
throw new Error("错误")
};
Ebile.prototype.Edrive= function() {
throw new Error("错误")
};
```


```
// 自行车的实现类
var RealizeBike = function() {}
RealizeBike.prototype = new Bike(); //继承
RealizeBike.prototype.wheel = function() {
console.log('我有二个轮子')
};
RealizeBike.prototype.Hdrive= function() {
console.log('人驱动')
};
//电动车的实现类
var RealizeEbile = function() {}
RealizeEbile.prototype = new Ebile(); //继承
RealizeEbile.prototype.wheel = function() {
console.log('我有二个轮子')
};
RealizeEbile.prototype.Edrive= function() {
console.log('电驱动')
};
```


```
//自行车适配器
var BikeAdapter = function(o) {
//Ebile.apply(this);
this.o = o;
};
BikeAdapter.prototype = new Ebile();//继承
BikeAdapter.prototype.Edrive= function() {
console.log(this.o);
console.log(this.o.wheel());
//console.log(this.o.Hdrive());
};
var b1 = new RealizeBike(); //实例化自行车
//b1.Hdrive();//人驱动
var e1 = new RealizeEbile(); //实例化电动车
//e1.Edrive(); //电驱动
//适配器自行车的行为
var aa = new BikeAdapter(b1);
aa.Edrive();
```
