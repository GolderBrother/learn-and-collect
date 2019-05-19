import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  //公共组件


import { UpcomingComponent } from './upcoming.component';//UpcomingComponent
import {MovieViewModule} from '../movie-view/movie-view.module'; //封装模块

@NgModule({
  declarations: [   //自定义模块
    UpcomingComponent,

  ],
  imports: [     //系统模块
    BrowserModule,
    CommonModule,
    MovieViewModule,
  ],
  providers: [],
  //bootstrap: [AppComponent]   //启动模块
})
export class UpcomingModule { }
