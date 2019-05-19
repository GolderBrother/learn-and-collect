import { Component } from '@angular/core';

interface Obj {
  id:number;
  name:string;
}
const arr:Obj[] = [
  {id:1,name:'a1'},
  {id:2,name:'a2'},
  {id:3,name:'a3'},
  {id:4,name:'a4'},
  {id:5,name:'a5'},
  {id:6,name:'a6'},
  {id:7,name:'a7'},
  {id:8,name:'a8'},
  {id:9,name:'a9'}
]
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-movies';
  genres = arr;
} 
