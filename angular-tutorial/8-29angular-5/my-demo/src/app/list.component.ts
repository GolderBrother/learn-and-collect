import { Component } from '@angular/core';
import { ListsService } from './app.service';
import {List} from './interface';


@Component({
  selector: 'app-root',
  template: `
    <ul class="heroes">
      <li *ngFor="let hero of heroes" 
        [ngClass]="{selected: hero == selectedHero}"
       (click)="onChange(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <div *ngIf="selectedHero">
      <h2>{{selectedHero.name}} details!</h2>
      <div><label>id: </label>{{selectedHero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="selectedHero.name" placeholder="name"/>
      </div>
    </div>

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
export class ListComponent {
  title = 'Tour of Heroes';
  heroes:List[] = [];
  constructor(private listsService: ListsService) { }
  selectedHero: List;   //空的变量
  onChange(hero:List):void {
    this.selectedHero = hero;
  }
  ngOnInit():void{
    this.listsService.getLists()
      .then(data =>this.heroes = data)
  }
}