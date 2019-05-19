import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component'; //主页面
import { MoviesComponent } from './movies/movies.component'; 
//import { UpcomingComponent } from './upcoming/upcoming.component'; 
import { PopularComponent } from './popular/popular.component'; 
import { DemoComponent } from './demo/demo.component'; 
import { GenresComponent } from './genres/genres.component'; //分类详情
//import { MovieDetailComponent } from './movie-detail/movie-detail.component';    //影片详情

import { UpcomingModule } from './upcoming/upcoming.module';    //upcoming模块

import {RouterModule} from '@angular/router';   //路由
import {AppRoutes} from './app.router';   //路由的配置
import {HttpClientModule} from '@angular/common/http';   //http请求
import {HttpModule,JsonpModule} from '@angular/http';   //jsonp

@NgModule({
  declarations: [
    AppComponent, 
    MoviesComponent,
    //UpcomingComponent,
    PopularComponent,
    DemoComponent,
    GenresComponent,
    //MovieDetailComponent
  ],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(AppRoutes),
    UpcomingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
