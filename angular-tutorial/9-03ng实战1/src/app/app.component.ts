import { Component } from '@angular/core';

interface Obj {
    id:number;
    name:string;
}
const Arr:Obj[]=[
     {id:1,name:'影片分类1'},
     {id:2,name:'影片分类1'},
     {id:3,name:'影片分类1'},
     {id:8,name:'影片分类1'},
     {id:4,name:'影片分类1'},
     {id:5,name:'影片分类1'},
     {id:6,name:'影片分类1'},
     {id:7,name:'影片分类1'}
]
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-movies';
  genres = Arr;
}
