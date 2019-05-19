import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../app.router';  //路由
import { CommonModule } from '@angular/common';  //公共组件

import { MovieCardComponent } from './movie-card.component';  //影片展示
import { MovieDetailComponent } from '../movie-detail/movie-detail.component'; 
import { ActorComponent } from '../actor/actor.component';  //作者信息

@NgModule({
  declarations: [    //自定义模块
    MovieCardComponent,     //公共组件
    MovieDetailComponent,    //详情
    ActorComponent       //作者
  ],
  imports: [   //导入 （系统模块）
    CommonModule,
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [
    MovieCardComponent,
  ],
  providers: [],
})
export class MovieCardModule { }
