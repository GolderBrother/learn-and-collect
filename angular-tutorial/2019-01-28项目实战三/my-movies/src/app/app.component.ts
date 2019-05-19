import { Component } from '@angular/core';
import {JsonpService} from './service/jsonp.service'

interface Obj {
  id:number;
  name:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[JsonpService]
})
export class AppComponent {
  title = 'my-movies';
  genres :Obj[];
  constructor(public jsonp:JsonpService){}   //缩写
  ngOnInit(){
    this.jsonp.getGenres().subscribe(res=>{
      this.genres = res.genres;
    })
   }

} 
