import { Component, Input,Output,EventEmitter} from '@angular/core';

interface Hero {
  id: number;
  name: string;
}
@Component({
  selector: 'app-detail',
  template: `
    <div *ngIf="props">
      <h2>{{props.name}} details!</h2>
      <div><label>id: </label>{{props.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="props.name" placeholder="name"/>
        <button (click)="parentChange()">子调父</button>
      </div>
    </div>

  `,
  //inputs:['aa:props']   //别名：属性的名称
})
export class DetailComponent {
  //@Input() props:Hero;
  @Input('props') props:Hero;   //abc属性别名 props属性名称
  //@Input 装饰器 输入属性 实现父组件向子组件传递 参数
  @Output() changeNumber :EventEmitter<number> = new EventEmitter();  //子组件触发时引发父组件的事件
  n:number=0;
  parentChange():void{
    console.log('123');
    this.changeNumber.emit(this.n++);
  }
  getAbc():string{
    return 'abc'
  }
}