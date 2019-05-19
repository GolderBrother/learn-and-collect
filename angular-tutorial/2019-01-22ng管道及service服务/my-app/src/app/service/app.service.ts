import { Injectable } from '@angular/core';
import { LISTS } from './item-data';
import {HttpClient} from '@angular/common/http';   //http


@Injectable()
export class ListsService {
    constructor(public http:HttpClient){}   //缩写
    HEROES = [
        { id: 11, name: 'Mr. Nice' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' }
      ];
    getLists(){
        return this.HEROES
    }
    getLists2(){
        return LISTS
    }
    getList3(url:string,callback:Function){     //公共的GET请求
        this.http.get(url)
        .subscribe((data)=>{   //订阅模式  侦听http请求的返回
            console.log(data);
            callback(data);      //回调函数
        },(error)=>{
            console.log(error)
        })
    }
}