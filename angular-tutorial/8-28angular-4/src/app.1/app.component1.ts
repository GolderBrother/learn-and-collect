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

      <p *ngIf="msg=='hello'">hello</p>
      <p *ngIf="a<b">hello</p>
      <p *ngIf="fun(6,5)">x>y</p>

      <div [ngSwitch]='age'>
        <div *ngSwitchCase ="'18'">18</div>
        <div *ngSwitchCase ="'20'">20</div>
        <div *ngSwitchDefault>25</div>
      </div>

      <input type='text' [disabled]="fun(3,5)" [(ngModel)]="obj.name"/>

      <h1 [style.color]='blue'>hello world</h1>
      <h1 [style.font-size.px]='30'>hello world</h1>
      <h1 [style.background-color]='background'>hello world</h1>
      <h1 [ngStyle]="{color:'#fff','background-color':'blue'}">hello world</h1>

      <h1 [ngClass]="{selector:isShow}">hello world</h1>
    `,
  styles: [`
    .selector {
      background: #f60;
    }
  `]
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
  //ngIf
    a:number=10;
    b:number=5;
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
    blue:string ='blue';
    background:string = 'red';
    isShow:boolean = true;
}
