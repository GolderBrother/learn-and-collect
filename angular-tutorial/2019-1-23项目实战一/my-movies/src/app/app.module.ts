import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component'; //主页面
import { MoviesComponent } from './movies/movies.component'; 
import { UpcomingComponent } from './upcoming/upcoming.component'; 
import { PopularComponent } from './popular/popular.component'; 
import { DemoComponent } from './demo/demo.component'; 

import {RouterModule} from '@angular/router';   //路由
import {AppRoutes} from './app.router';   //路由的配置

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
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
