import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {JsonpService} from '../service/jsonp.service'
import { Location }  from '@angular/common';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Object;
  reviews: Array<Object>;
  similarMovies: Array<Object>;
  cast: Array<Object>;
  video: Object;
  constructor(
    private jsonp: JsonpService,
    private router: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer
    ) {
 
  }

  ngOnInit() {
    //订阅(Subscribe) 
    this.router.params.subscribe((params) => {  //订阅活动路由
      const id = params['id'];
      this.jsonp.getMovie(id).subscribe(movie => {
        this.movie = movie;  //电影基本信息
      });
      this.jsonp.getMovieReviews(id).subscribe(res => {
        this.reviews = res.results;  //评论
      });
      this.jsonp.getMovieCredits(id).subscribe(res => {
        res.cast = res.cast.filter((item) => {return item.profile_path});
        this.cast = res.cast.slice(0,4);  //演员表
      });

      this.jsonp.getSimilarMovies(id).subscribe(res => {
        console.log(res.results);
        this.similarMovies = res.results.slice(0, 12);  //相似推荐
      });
    })
  }
  //返回
  goBack(): void {
    this.location.back();
  }

}
