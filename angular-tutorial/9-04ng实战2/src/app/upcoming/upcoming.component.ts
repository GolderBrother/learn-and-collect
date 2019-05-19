import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {selfHttp} from '../app.service';

@Component({
  selector: 'upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css'],
  //providers:[HttpClient]
  providers:[selfHttp]
})
export class UpcomingComponent {
  //lists:Array<Object>; //类型为数组对象 [{name:'2342',id:234},{},{}]
  lists:any;

  // constructor(private http:HttpClient) {
  //   //http请求
  //   this.http.get('http://127.0.0.1:3333/home').subscribe(data => {
  //     console.log(data);
  //     this.lists = data;
  //   })
  // }
  //http复用
  constructor(private http:selfHttp) {
    //http请求
    this.http.get('/home',res => {  //$.each(arr,function(res){}) 
      this.lists = res;
    }) 
    //post
    // this.http.post('/home',{id:1},res => {  //$.each(arr,function(res){}) 
    //   this.lists = res;
    // }) 
    
  }

}
