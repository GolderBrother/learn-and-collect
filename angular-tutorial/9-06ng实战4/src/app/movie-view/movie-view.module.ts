import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  //公共组件


import { MovieViewComponent } from './movie-view.component'; //影片封装

@NgModule({
  declarations: [   //自定义模块
    MovieViewComponent,

  ],
  imports: [     //系统模块
    BrowserModule,
    FormsModule
  ],
  exports:[   //允许其它模块访问
      CommonModule,  //公共组件
      MovieViewComponent
  ],
  providers: [],
  //bootstrap: [AppComponent]   //启动模块
})
export class MovieViewModule { }
