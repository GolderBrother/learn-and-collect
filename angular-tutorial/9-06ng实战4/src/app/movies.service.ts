import { Injectable } from '@angular/core';
import {Jsonp, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
//URLSearchParams 用于处理URL中查询的字符串
//rxjs 适用于异步场景，交互接口请求/事件。。。

@Injectable()
export class MoviesService {
  apikey: string;

  constructor(private _jsonp: Jsonp) {
    this.apikey = 'fed69657ba4cc6e1078d2a6a95f51c8c';
  }
  //获取分类
  public  getGenres() {
    var search = new URLSearchParams();
    search.set('language', 'en-US');
    search.set('api_key', this.apikey);
    //return this._jsonp.get('https://api.themoviedb.org/3/genre/movie/list?callback=JSONP_CALLBACK'+'&language=en-US'+'&'+'api_key'+this.apikey)
    return this._jsonp.get('https://api.themoviedb.org/3/genre/movie/list?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      })
  }

  //获取分类详情
  public getMoviesByGenre(id: string) {
    var search = new URLSearchParams();
    search.set('api_key', this.apikey);
    return this._jsonp.get('https://api.themoviedb.org/3/genre/'+ id +'/movies?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      })
  }

   //顶级电影
  public getTopRatedMovies() {
    var search = new URLSearchParams();
    search.set('api_key', this.apikey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/top_rated?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      })
  }
  //搜索影片
  public searchMovies(searchStr: string) {
    var search = new URLSearchParams();
    search.set('sort_by','popularity.desc');
    search.set('query', searchStr);
    search.set('api_key', this.apikey);
    return this._jsonp.get('https://api.themoviedb.org/3/search/movie?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      })
  }
}