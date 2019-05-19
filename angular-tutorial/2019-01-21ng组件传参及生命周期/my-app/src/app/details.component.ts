import { Component, Input } from '@angular/core';
import {Type} from './type';

@Component({
    selector: 'item-detail',  
    template: `    
      <div>
        <h2>details!</h2>
        <div><label>id: </label>{{abc.id}}</div>
        <div>
          <label>name: </label>
          <input type="text" [(ngModel)]="abc.name" placeholder="name"/>
        </div>
      </div>
    `,
    inputs:['abc:item']   //abc 别名 :  item 父组件中的属性  inputs:['item'] 
  })
  export class DetailComponent {
    //@Input()item:Type;   //item 父组件中的属性  Type接口
    //@Input('item') abc:Type;   //item 父组件中的属性  Type接口   abc表示属性的别名
  }