window.onload = function(){
    //枚举 enum类型是对JS数据类型的一个补充
    enum Color {red,green,blue};
    let c1:Color = Color.green;  //1
    let c2:string = Color[2];  //blue
    //索引默认从0开始  可以手动修改
    enum Color2 {red=1,green=3,blue=9};
    let c3:Color2 = Color2.green;  //3
    Color[9];  //blue
    //小数
    enum Color3 {red=1.2,green,blue};
    Color3.green ;//2.2
    //任意值
    enum Color4 {red=1.2,green,blue=<any>'b'};
    Color4.blue ;//b

    //变量
    var a='123';
    enum Color5 {red=1.2,green=a.length,blue=<any>a};
    Color4.blue ;//123
    enum Color6 {red=<any>a,green,blue};  //error

    //元组   数组合并了相同类型的对象，元组合并了不同类型的对象
    var lists:number[] =[1,2,3];
    //数组泛型
    var lists2:Array<string> =['a','b']
    //任意值
    var lists3:any[] = ['a',1,true];
    //元组
    var x:[number,string];
    x = [6,'a'];
    x[2] = 3; //越界索引，会使用联合类型（符合某一种就行）
    x //[6,'a',3]
 }
