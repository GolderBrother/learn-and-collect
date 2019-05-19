import { Component,ViewChild,ElementRef } from '@angular/core';

interface Type {
    name:string;
    state:boolean;
}
var arr: Type[]=[
    {name:'手机',state:true},
    {name:'包包',state:false},
    {name:'衣服',state:true},
];
@Component({
  selector: 'app-root',  
  templateUrl:'./app.component.html' ,
  styles: []
})
export class AppComponent {
    date = new Date();
    lists = arr;    //列表数据 
    input = 'abc';   //表单
    num:number;
    checkAll:boolean = false;   //全选
    //添加事件
    add():void{
        if(this.input =="") return;
        this.lists.unshift({name:this.input,state:false});
        this.input = "";
        this.checkAll = false;
    }
    
    //全选事件
    checkAllChange():void{
       // var self = this;
        this.lists.forEach((item,index)=>{
            item.state = this.checkAll
        })
    }
    //子传参到父触发的方法
    checkChange(n:boolean){
        this.checkAll = n;
        this.num = this.table.getNum();  //获取tabel子组件的方法
        //this.num = this.table.aaa;   // 获取tabel子组件的属性
        console.log(this.num);
       // data.length == this.lists.length ? this.checkAll = true : this.checkAll = false;
    }
    //删除选中状态
    delCheck():void{
        this.lists = this.lists.filter(function(item){
            return item.state == false;
        });
        this.checkAll = false;
    }

    //调用子组件中的方法和属性  #table
    @ViewChild('table') table;
     //ElementRef直接操作DOM
     @ViewChild('input1') el:ElementRef;    //input1 表示 #input1  el  别名   ElementRef直接操作DOM
    //生命周期 初始化后
     ngOnInit():void{
        this.input = this.table.aaa; 
        this.el.nativeElement.style.background = 'red';  
     }

}