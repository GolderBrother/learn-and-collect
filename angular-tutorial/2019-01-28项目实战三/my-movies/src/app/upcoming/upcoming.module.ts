import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../app.router';  //路由
import {JsonpService} from '../service/jsonp.service';  //服务

import { UpcomingComponent } from './upcoming.component'; 
import { MovieCardModule } from '../movie-card/movie-card.module'; 


@NgModule({
  declarations: [    //自定义模块
    UpcomingComponent
  ],
  imports: [   //导入 （系统模块）
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    MovieCardModule
  ],

  providers: [JsonpService],
})
export class UpcomingModule { }
