import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]   //启动模块
})
export class AppModule { }
