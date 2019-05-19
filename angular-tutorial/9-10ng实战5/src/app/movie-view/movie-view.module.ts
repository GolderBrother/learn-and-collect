import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  //公共组件
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '../app.routes';   //路由

import { MovieViewComponent } from './movie-view.component'; //影片封装
import { DetailComponent } from '../detail/detail.component'; //详情
import { ActorComponent } from '../actor/actor.component'; //作者


@NgModule({
  declarations: [   //自定义模块
    MovieViewComponent,
    DetailComponent,
    ActorComponent
  ],
  imports: [     //系统模块
    BrowserModule,
    RouterModule.forRoot(appRoutes)
    //FormsModule
  ],
  exports:[   //允许其它模块访问
      CommonModule,  //公共组件
      MovieViewComponent
  ],
  providers: [],
  //bootstrap: [AppComponent]   //启动模块
})
export class MovieViewModule { }
