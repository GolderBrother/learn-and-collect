import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  //路由
import { MoviesService } from '../movies.service';
import { Location } from '@angular/common';

@Component({
  selector: 'my-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[MoviesService]
})
export class DetailComponent {
  reviews:Array<Object>;
  movie:Object;
  cast:Array<Object>;
  similarMovies:Array<Object>;

  constructor(private router:ActivatedRoute,
              private http:MoviesService,
              private location:Location) {}

  ngOnInit(){
    this.router.params.subscribe((params) => {  //路由传参
      var id = params['id'];
      //http请求
      this.http.getMovie(id).subscribe(res =>{
        console.log(res);
        this.movie = res;  //基本信息
      });
      //http请求
      this.http.getMovieReviews(id).subscribe(res => {
        this.reviews = res.results;  //评论
      });
      //http请求
      this.http.getMovieCredits(id).subscribe(res =>{
        console.log(res);
        this.cast = res.cast.slice(0,4);  //演员表
      });
      //http请求
      this.http.getSimilarMovies(id).subscribe(res => {
        console.log(res.results);
        this.similarMovies = res.results.slice(0, 12);  //相似推荐
      });
    })
  }
  //返回
  goBack():void {
    this.location.back();
  }

}
