import { Injectable } from '@angular/core';
import {Jsonp,URLSearchParams} from '@angular/http';   //http
import 'rxjs/Rx';
//rxjs   是一个库
//对于angular6  rxjs-compat      cnpm install rxjs-compat --save
//URLSearchParams 用于处理url中的查询字符串
@Injectable()
export class JsonpService {
    public jsonp;
    public apikey;
    constructor(jsonp:Jsonp){
        this.jsonp = jsonp;
        this.apikey = 'fed69657ba4cc6e1078d2a6a95f51c8c';
    } 

    //影片分类
    getGenres(){
        return this.jsonp.get('https://api.themoviedb.org/3/genre/movie/list?callback=JSONP_CALLBACK&api_key='+this.apikey)
            .map(res =>{
                return res.json();
            })
    }

    //最新影片
    getUpcoming(){
        return this.jsonp.get('https://api.themoviedb.org/3/movie/upcoming?callback=JSONP_CALLBACK&api_key='+this.apikey)
            .map(res =>{
                return res.json();
            })
    }

    //分类影片
    getMoviesGenres(id){
        return this.jsonp.get('https://api.themoviedb.org/3/genre/'+ id +'/movies?callback=JSONP_CALLBACK&api_key='+this.apikey)
            .map(res =>{
                return res.json();
            })
    }
    //基本信息
    getMovie(id: string) {
        var search = new URLSearchParams();
        search.set('api_key', this.apikey);
        return this.jsonp.get('https://api.themoviedb.org/3/movie/'+ id +'?callback=JSONP_CALLBACK', {search})
          .map(res => {
            return res.json();
          })
      }
      
      //评论
      getMovieReviews(id: string) {
        var search = new URLSearchParams();
        search.set('api_key', this.apikey);
        return this.jsonp.get('https://api.themoviedb.org/3/movie/'+ id +'/reviews?callback=JSONP_CALLBACK', {search})
          .map(res => {
            return res.json();
          })
      }

      //相似推荐
      getSimilarMovies(id: string) {
        var search = new URLSearchParams();
        search.set('api_key', this.apikey);
        return this.jsonp.get('https://api.themoviedb.org/3/movie/'+ id +'/similar?callback=JSONP_CALLBACK', {search})
          .map(res => {
            return res.json();
          })
      }

      //演员表
      getMovieCredits(id: string) {
        var search = new URLSearchParams();
        search.set('api_key', this.apikey);
        return this.jsonp.get('https://api.themoviedb.org/3/movie/'+ id +'/credits?callback=JSONP_CALLBACK', {search})
          .map(res => {
            return res.json();
          })
      }

      //作者详情
      getPersonDetail(id:string) {
        var search = new URLSearchParams();
        search.set('api_key', this.apikey);
        return this.jsonp.get('https://api.themoviedb.org/3/person/'+ id +'?callback=JSONP_CALLBACK', {search})
          .map(res => {
            return res.json();
          })
      }
      ////作者信息
      getPersonCast(id:string) {
        var search = new URLSearchParams();
        search.set('api_key', this.apikey);
        return this.jsonp.get('https://api.themoviedb.org/3/person/'+ id +'/movie_credits?callback=JSONP_CALLBACK', {search})
          .map(res => {
            return res.json();
          })
      }
}