import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';   //http


@Injectable()
export class ListsService {
    public URL;
    public http;
    //constructor(public http:HttpClient){}   //缩写
    constructor(http:HttpClient){
        this.http = http;
        this.URL = 'http://localhost:3333';    //公共的地址
    }   

    //get 请求
    get(url:string,callback:Function){     //公共的GET请求
        const self = this;
        this.http.get(self.URL+url)
        .subscribe((res)=>{   //订阅模式  侦听http请求的返回
            console.log(res);
            callback(res);      //回调函数
        },(error)=>{
            console.log(error)
        })
    }
    //post请求
    post(url:string,data?:Object,callback?:Function){     //公共的GET请求
        const self = this;
        this.http.post(self.URL+url,data)
        .subscribe((res)=>{   //订阅模式  侦听http请求的返回
            console.log(res);
            callback(res);      //回调函数
        },(error)=>{
            console.log(error)
        })
    }

    //put
    put(url:string,data?:Object,callback?:Function){     //公共的GET请求
        const self = this;
        this.http.put(self.URL+url,data)
        .subscribe((res)=>{   //订阅模式  侦听http请求的返回
            console.log(res);
            callback(res);      //回调函数
        },(error)=>{
            console.log(error)
        })
    }

    //delete请求
    delete(url:string,data?:Object,callback?:Function){     //公共的GET请求
        const self = this;
        this.http.delete(self.URL+url,data)
        .subscribe((res)=>{   //订阅模式  侦听http请求的返回
            console.log(res);
            callback(res);      //回调函数
        },(error)=>{
            console.log(error)
        })
    }
}