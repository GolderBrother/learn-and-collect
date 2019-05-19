import { Component } from '@angular/core';

interface State {
  state: boolean;
  name: string;
}
const LISTS: State[] = [
  { state: false, name: 'Mr. Nice' },
  { state: false, name: 'Narco' },
  { state: false, name: 'Bombasto' },
  { state: true, name: 'Celeritas' }
];

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div>
        <input type="checkbox"  [(ngModel)]="checkAll" (change)="checkAllChange()" [disabled]="lists.length==0"/>全选{{checkAll}}
        <input type='text' [(ngModel)]="msg"/>
        <button (click)="add()">添加</button><button (click)="delSelect()">删除选中状态</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let list of lists,let i= index" [ngClass]="{selected:i%2==0}">
            <td>{{list.name}}{{i}}</td>
            <td><input type="checkbox"  [(ngModel)]="list.state" (change)="checkCur()"/>{{list.state | statepipe}}</td>
            <td><button (click)="del(i)">删除</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles:[`
    .selected {
      background: #f9f9f9;
      color:#f60;
    }
    table {
      width: 100%;
    }
    tr td {
      text-align:center;
    }
  `]
})
export class AppComponent {
  msg="demo";
  lists = LISTS;
  //全选
  checkAll:boolean=false;
  //添加
  add():void {
    if(this.msg =='') return;
    this.lists.unshift({name:this.msg,state:false});
    this.msg = '';
    this.checkCur();
  }
  //删除
  del(index:number):void{
    this.lists.splice(index,1)
  }
  //全选事件
  checkAllChange(){
    this.lists.forEach((item,index)=>{
      item.state = this.checkAll;   //
    })
  }
  //当前事件
  checkCur() :void{
    let selectDate = this.lists.filter((item)=>{   //过滤所有state = true
      return item.state ==true;
    });
    selectDate.length == this.lists.length ? this.checkAll = true:this.checkAll = false;
  }
  delSelect():void {
    this.lists = this.lists.filter((item)=>{  
      return item.state ==false;
    });
    this.checkAll = false;
  }
}