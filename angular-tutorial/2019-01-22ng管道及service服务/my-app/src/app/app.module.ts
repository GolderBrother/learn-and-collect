import { BrowserModule } from '@angular/platform-browser';   //识别指令/组件。。
import { NgModule } from '@angular/core';  //模块 
import { FormsModule } from '@angular/forms';  //模块 

//import { AppComponent } from './app.component';   //自定义组件
//import { AppComponent } from './filter/app.component';   //过滤/管道 
import { AppComponent } from './service/app.component';   //服务
//import { AppComponent } from './shopping/app.component'; 
import { TableComponent } from './shopping/table.component'; 
import { DetailComponent } from './details.component';   //详情组件
import { BannerComponent } from './banner/banner.component'; 

import { StatePipe,NumPipe } from './shopping/app.pipe';   //管道
import {HttpClientModule} from '@angular/common/http';   //http

@NgModule({     //模块  @NgModule装饰器的类
  declarations: [    //声明  自定义模块   组件/指令/管道
    AppComponent,
    DetailComponent,
    TableComponent,
    BannerComponent,
    StatePipe,
    NumPipe
  ],
  imports: [     //其它依赖模块    系统模块
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],    //服务的创建者
  bootstrap: [AppComponent]   //应用的主视图  启动模块
})
export class AppModule { }     //导出
