import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  //路由
import { MoviesService } from '../movies.service';

@Component({
  selector: 'my-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
  providers:[MoviesService]
})
export class GenresComponent {
  genresName:string;
  movies;

  constructor(private router:ActivatedRoute,
              private http:MoviesService) {}

  ngOnInit(){
    this.router.params.subscribe((params) => {  //路由传参
      var id = params['id'];
      this.genresName = params['name'];
      //http请求
      this.http.getMoviesByGenre(id).subscribe(res =>{
        console.log(res);
        this.movies = res.results;
      })
    })
  }
  //搜索方法
  searchMovies() {

  }

}
