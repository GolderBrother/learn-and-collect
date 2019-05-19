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
    <input type="text" [(ngModel)]="title" />

    <h1 *ngIf="num1>num2">a</h1>
    <h1 *ngIf="title=='abc'">{{title}}</h1>
    <h1 *ngIf="fun(1,2)">{{title}}</h1>

    <div [ngSwitch]="age">
      <ul>
        <li *ngSwitchCase="20">20</li>
        <li *ngSwitchCase="30">30</li>
        <li *ngSwitchDefault>40</li>
      </ul>
    </div>

    <p [ngStyle]="{color:red}" [style.fontWeight]='800'>hello world</p>
    <p [style.color]="red" [ngStyle]="{fontSize:size}">hello world</p>
    <p [style.font-size.px]="40" >hello world</p>

    <p [ngClass]="{active:flag}">class</p>

    <input type="text" [disabled]="fun(4,7)" [(ngModel)]="title" />
  `,
  //styleUrls: ['./app.component.css']
  styles:[`
    h1 {
      color:red;
    }
    h2 {
      color:blue;
    }
    .active {
      border:1px solid  #f60;
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

  //ngif显示和隐藏
  num1:number = 5;
  num2:number = 3;
  fun(x:number,y:number):boolean{
    if(x>y){
      return true;
    }else {
      return false;
    }
  }
  //ngSwitch
  age:number = 20;

  //ngStyle
  size:string = '40px';
  red:string = 'red';

  //ngClass
  flag:boolean = true;

}
 