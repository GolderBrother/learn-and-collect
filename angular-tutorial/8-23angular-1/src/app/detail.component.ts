import { Component, Input} from '@angular/core';

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
      </div>
    </div>

  `,
  
})
export class DetailComponent {
  @Input() props:Hero;
  //@Input 装饰器 输入属性 实现父组件向子组件传递 参数
}