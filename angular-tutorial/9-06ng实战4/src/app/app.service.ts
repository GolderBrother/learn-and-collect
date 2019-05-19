import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
//HttpClient 可以用来提供高效的、最新的、功能丰富的支持 HTTP 协议的客户端编程工具包
@Injectable()
export class selfHttp {
    public restServer;
    public http;

  constructor(Http: HttpClient) {
    this.http = Http;
    this.restServer = 'http://127.0.0.1:3333';
  }
  //获取
 public get(url,fun?:Function){
      this.http.get(this.restServer +url).subscribe(res => {   //subscribe订阅模式  监听http请求的返回
        console.log(res);
            fun(res);
        })
  }
  //post
 public post(url,data?:Object,fun?:Function){
      this.http.post(this.restServer +url,data).subscribe(res => {   //subscribe订阅模式  监听http请求的返回
        console.log(res);
            fun(res);
        })
  }
  //put
 public put(url,data?:Object,fun?:Function){
      this.http.put(this.restServer +url,data).subscribe(res => {   //subscribe订阅模式  监听http请求的返回
        console.log(res);
            fun(res);
        })
  }
  //delete
 public delete(url,fun?:Function){
      this.http.delete(this.restServer +url).subscribe(res => {   //subscribe订阅模式  监听http请求的返回
        console.log(res);
            fun(res);
        })
  }
}