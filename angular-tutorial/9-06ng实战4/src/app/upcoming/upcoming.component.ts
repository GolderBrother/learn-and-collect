import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css'],
  //providers:[HttpClient]
  providers:[MoviesService]
})
export class UpcomingComponent {
 topRatedMovies:Array<Object>;
  
  constructor(private http:MoviesService) {}
  ngOnInit(){
    //http请求
    this.http.getTopRatedMovies().subscribe(res =>{
      console.log(res);
      this.topRatedMovies = res.results;  //顶级影片
    })
  }

}
