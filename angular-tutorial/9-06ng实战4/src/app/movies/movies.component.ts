import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers:[MoviesService]
})
export class MoviesComponent {
  searchStr:string;
  topRatedMovies:Array<Object>;
  searchLists:Array<Object>;
  
  constructor(private http:MoviesService) {}

  ngOnInit(){
    //http请求
    this.http.getTopRatedMovies().subscribe(res =>{
      console.log(res);
      this.topRatedMovies = res.results;  //顶级影片
    })
  }
  //搜索方法
  searchMovies() {
    this.http.searchMovies(this.searchStr).subscribe(res =>{
      console.log(res);
      this.searchLists = res.results;  //顶级影片
    })
  }

}
