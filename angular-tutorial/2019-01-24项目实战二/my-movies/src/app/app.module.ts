import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component'; //主页面
import { MoviesComponent } from './movies/movies.component'; 
import { UpcomingComponent } from './upcoming/upcoming.component'; 
import { PopularComponent } from './popular/popular.component'; 
import { DemoComponent } from './demo/demo.component'; 

import {RouterModule} from '@angular/router';   //路由
import {AppRoutes} from './app.router';   //路由的配置
import {HttpClientModule} from '@angular/common/http';   //http请求
import {HttpModule,JsonpModule} from '@angular/http';   //jsonp

@NgModule({
  declarations: [
    AppComponent, 
    MoviesComponent,
    UpcomingComponent,
    PopularComponent,
    DemoComponent
  ],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
