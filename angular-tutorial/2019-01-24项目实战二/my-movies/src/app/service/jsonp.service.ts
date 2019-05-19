import { Injectable } from '@angular/core';
import {Jsonp} from '@angular/http';   //http
import 'rxjs/Rx';
//rxjs   是一个库
//对于angular6  rxjs-compat      cnpm install rxjs-compat --save

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
}