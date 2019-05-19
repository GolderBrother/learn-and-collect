import { Component } from '@angular/core';

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
    checkAll:boolean = false;   //全选
    //添加事件
    add():void{
        if(this.input =="") return;
        this.lists.unshift({name:this.input,state:false});
        this.input = "";
        this.checkAll = false;
    }
    //删除单个
    del(i:number):void{
        this.lists.splice(i,1);
    }
    //全选事件
    checkAllChange():void{
       // var self = this;
        this.lists.forEach((item,index)=>{
            item.state = this.checkAll
        })
    }
    //当前状态
    curChange():void{
        //filter()
        // let n = this.lists.filter(function(item){
        //     return item.state == true;
        // });
        // n.length == this.lists.length ? this.checkAll = true : this.checkAll = false;
        //every()  检测数据是否符合条件，只要有一个不满足返回false ，全部满足true
        this.checkAll = this.lists.every(function(item){
            return item.state;
        })
    }
    //删除选中状态
    delCheck():void{
        this.lists = this.lists.filter(function(item){
            return item.state == false;
        });
        this.checkAll = false;
    }

}