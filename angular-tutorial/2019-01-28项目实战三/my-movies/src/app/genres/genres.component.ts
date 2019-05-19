import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';   //路由
//ActivatedRoute 路由参数传递
//abc?id=1&name=2   获取参数ActivatedRoute.queryParams[id]
//genres/12     获取参数ActivatedRoute.params[id]
//接收参数
//1)参数快照 snapshot    ActivatedRoute.snapshot.params['id']
//2)参数订阅 subscribe  ActivatedRoute.params.subscribe((params:Params)=>{})
import {JsonpService} from '../service/jsonp.service'

@Component({
  selector: 'genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
  providers:[JsonpService]
})
export class GenresComponent {
  constructor(
    private jsonp:JsonpService,
    private router:ActivatedRoute
  ){}
  arr:Array<Object>; 
  name:string;
  ngOnInit(){
    console.log(this.router.snapshot.params['id']);     //参数快照
    this.router.params.subscribe((params)=>{     //参数订阅
      var id = params['id'];
      this.name = params['name'];
      this.jsonp.getMoviesGenres(id).subscribe(res =>{
        this.arr = res.results;
      })
    })   
    

   }

} 
