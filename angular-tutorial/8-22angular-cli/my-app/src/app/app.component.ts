import { Component } from '@angular/core';

//定义类型
interface Obj {
  id:number;
  name:string;
}
const Arr:Obj[]=[
    {id:1,name:'a1'},
    {id:2,name:'a2'},
    {id:3,name:'a3'},
    {id:4,name:'a4'},
    {id:5,name:'a5'},
    {id:6,name:'a6'},
    {id:7,name:'a7'}
];
@Component({
  selector: 'app-root',  //组件名称
  //templateUrl: './app.component.html',
  template:`
      <h1>{{title}}</h1>
      <h2>{{msg}}</h2>
      <div>
        <h1>id:{{obj.id}}</h1>
        <h1>name:{{obj.name}}</h1>
      </div>
      <div>
        <label>abc:</label>
        <input type="text" [(ngModel)]="obj.name" /> 
      </div>
      <ul>
        <li *ngFor="let list of lists" (click)="onChange(list.name)">{{list.name}}</li>
      </ul>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  msg = 'hello';
  //Obj类型
  obj:Obj ={
    id:2,
    name:'sonia'
  };
  //数组对象
  lists = Arr;
  //触发方法
  onChange(list:string):void{
    this.title = list;
  }
}
