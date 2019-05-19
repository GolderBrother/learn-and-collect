import { Component } from '@angular/core';

//定义一个接口
interface Person{
  name: string;
  id: number;
}
let arr:Person[] =[
  {name:'a',id:1},
  {name:'b',id:2},
  {name:'c',id:3},
  {name:'d',id:4},
  {name:'e',id:5}
]
@Component({   //@Component来描述当前组件中的元数据
  selector: 'app-root',   //组件的名称
  //templateUrl: './app.component.html',
  template:`
    <h1 title="{{title}}">{{title}}</h1>
    <h2 [title]="obj.name">{{obj.name}}</h2>
    <ul>
      <li *ngFor="let list of lists" (click)="listChange(list.name)">{{list.name}}</li>
    </ul>
  `,
  //styleUrls: ['./app.component.css']
  styles:[`
    h1 {
      color:red;
    }
    h2 {
      color:blue;
    }
  `]
})
export class AppComponent {
  constructor(){}
  title:string = 'my-app';
  obj:Person = {
    name:'abc',
    id:1
  };
  lists = arr;
  //单击事件
  listChange(name:string):void{
    this.title = name;
  }

}
 