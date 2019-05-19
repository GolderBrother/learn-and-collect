import { Component,ViewChild } from '@angular/core';

interface Hero {
  id: number;
  name: string;
}
const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' }
];

@Component({
  selector: 'app-root',
  template: `
    <h1>{{num}}{{num2}}</h1>
    <ul class="heroes">
      <li *ngFor="let hero of heroes" 
        [ngClass]="{selected: hero == selectedHero}"
       (click)="onChange(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul> 
    <app-detail #abc [props]="selectedHero" (changeNumber)="numberChange($event)"></app-detail>

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
  title = 'Tour of Heroes';
  heroes = HEROES;
  num:number;
  num2:string;
  selectedHero: Hero ={ id: 12, name: 'Narco' };   //空的变量
  onChange(hero:Hero):void {
    this.selectedHero = hero;
  }
  numberChange(i:number):void {
    this.num = i;
  }
  //@ViewChild 获取组件中的方法属性
  @ViewChild('abc') abc;
  ngOnInit():void{   //生命周期，初始化
    this.num2 = this.abc.getAbc();
  }
}