import { Component } from '@angular/core';
import {JsonpService} from '../service/jsonp.service'

@Component({
  selector: 'upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css'],
  providers:[JsonpService]
}) 
export class UpcomingComponent {
  upcoming;
  constructor(public jsonp:JsonpService){}   //缩写
  ngOnInit(){
    this.jsonp.getUpcoming().subscribe(res=>{
      console.log(res.results)
      this.upcoming = res.results;
    })
  }

} 
