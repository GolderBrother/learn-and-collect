import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  //Http请求
import { HttpModule, JsonpModule } from '@angular/http';  //jsonp

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';  //movies模块
import { UpcomingComponent } from './upcoming/upcoming.component';//UpcomingComponent
import { appRoutes } from './app.routes';   //路由

@NgModule({
  declarations: [   //自定义模块
    AppComponent,
    MoviesComponent,
    UpcomingComponent
  ],
  imports: [     //系统模块
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]   //启动模块
})
export class AppModule { }
