import { Component } from '@angular/core';
import {ListsService} from './app.service';//注入服务
import {HttpClient} from '@angular/common/http';   //http
//HttpClient 让http协议更丰富

@Component({
  selector: 'app-root',  //[ngClass]="{selected: hero === selectedHero}"
  template: `    
    <h1>{{title}}</h1>
    <ul class="heroes">
        <li  *ngFor="let item of items"
            [ngClass]="{selected:item.id === n}" 
            (click)="getCur(item)">
        <span class="badge">{{item.id}}</span> {{item.name}}
        </li>
    </ul>
    <div >
      <h2>名称 details!</h2>
      <div><label>id: </label>1</div>
      <div>
        <label>name: </label>
        <input  placeholder="name"/>
      </div>
    </div>

  `,
  styles: [`
    .bordered {
        border: 1px dashed black;
        background-color: #eee;
    }

    .heroes li.selected {
      background-color: #f60;
      color: #fff;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li:hover {
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  providers:[ListsService]     //为组件/模块提供服务
})
export class AppComponent {
    //构造注入的方式
    public service ;
    public http;
    constructor(service:ListsService,http:HttpClient){
        this.service = service;
        this.http = http;
    }
    //constructor(public service:ListsService){}   //缩写

    title = 'hello';
    items;
    //请求
    getData(url) {
        this.http.get(url)
        .subscribe((data)=>{   //订阅模式  侦听http请求的返回
            console.log(data);
            // if(data.code =='200'){
            //     this.items = data.result;
            // }
        },(error)=>{
            console.log(error)
        })
    }

    ngOnInit(){
        this.getData('http://localhost:3333/echarts_info');
        //this.items = this.service.getLists2();    //调用服务
        this.service.getList3('http://localhost:3333/get_list',res =>{
            console.log(res);
            if(res.code =='200'){
                this.items = res.result;
            }
        }); 
        // this.service.getList3('http://localhost:3333/get_list',function(data){
        //     console.log(data)
        // });
    }
  

}