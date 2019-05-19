import { BrowserModule } from '@angular/platform-browser';   //识别指令/组件。。。
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';   //NgModel

import { AppComponent } from './app.component';  //自定义组件
import { DetailComponent } from './detail.component';  //自定义组件
import { StatePipe,NumPipe } from './app.pipe';  //管道

import { AppRouterModule } from './router.module';  //路由
import { HomeComponent } from './home.component';
import { NewsComponent } from './news.component';
import { OtherComponent } from './other.component';

@NgModule({
  declarations: [    //声明   自定义模块
    AppComponent,
    DetailComponent,
    HomeComponent,
    NewsComponent,
    OtherComponent,
    StatePipe,
    NumPipe 
  ],
  imports: [   //依赖模块    系统模块
    BrowserModule,
    FormsModule ,
    AppRouterModule
  ],
  providers: [],   //服务的创建者
  bootstrap: [AppComponent]    //启动模块
})
export class AppModule { }   //导出
