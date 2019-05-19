import { Component } from '@angular/core';
import {ListsService} from '../service/movies.service'

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  providers:[ListsService]
})
export class DemoComponent {
  constructor(private http:ListsService){}
  arr:Array<Object>; 
  ngOnInit(){
    this.http.get('/home',res=>{
      console.log(res);
      this.arr = res;
    })
  //   this.http.post('/home',{name:'abc'},res=>{
  //     console.log(res);
  //     this.arr = res;
  //   })
   }

} 
