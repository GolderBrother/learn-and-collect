import { Component } from '@angular/core';

interface State {
  state: string;
  name: string;
}
const LISTS: State[] = [
  { state: '未采购', name: 'Mr. Nice' },
  { state: '未采购', name: 'Narco' },
  { state: '未采购', name: 'Bombasto' },
  { state: '未采购', name: 'Celeritas' }
];

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div>
        <input type='text' [(ngModel)]="msg"/>
        <button (click)="add()">添加</button>
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
            <td>{{list.state}}</td>
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
  `]
})
export class AppComponent {
  msg="demo";
  lists = LISTS;
  //添加
  add():void {
    if(this.msg =='') return;
    this.lists.unshift({name:this.msg,state:'未采购'});
    this.msg = '';
  }
  //删除
  del(index:number):void{
    this.lists.splice(index,1)
  }
}