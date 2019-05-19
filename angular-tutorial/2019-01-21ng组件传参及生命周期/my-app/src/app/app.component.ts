import { Component } from '@angular/core';
import {Type} from './type';

const HEROES :Type[]= [
  { id: 1, name: 'Mr. Nice' },
  { id: 2, name: 'Narco' },
  { id: 3, name: 'Bombasto' },
  { id: 4, name: 'Celeritas' },
  { id: 5, name: 'Magneta' },
  { id: 6, name: 'RubberMan' },
  { id: 7, name: 'Dynama' },
  { id: 8, name: 'Dr IQ' },
  { id: 9, name: 'Magma' },
  { id: 10, name: 'Tornado' }
];

@Component({
  selector: 'app-root',  
  template: `    
    <h1>{{title}}</h1>
    <ul class="heroes">
      <li  *ngFor="let item of items"
           [ngClass]="{selected:item.id === n}" 
           (click)="getCur(item)">
        <span class="badge">{{item.id}}</span> {{item.name}}
      </li>
    </ul>
    <item-detail [item]="curObj"></item-detail>

  `,
  styles: [`
    .bordered {
        border: 1px dashed black;
        background-color: #eee;
    }

    .heroes li.selected {
      background-color: #f60;
      color: #fff;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li:hover {
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `]
})
export class AppComponent {
  title = 'hello';
  items = HEROES;
  n:number = 3;
  curObj:Type = HEROES[this.n-1];
  getCur(item :Type) :void{
    this.curObj = item;
    this.n = item.id;
  }
  

}