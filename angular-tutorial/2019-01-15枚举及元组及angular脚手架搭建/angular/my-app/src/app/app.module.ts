import { BrowserModule } from '@angular/platform-browser';   //识别指令/组件。。
import { NgModule } from '@angular/core';  //模块 

import { AppComponent } from './app.component';   //自定义组件

@NgModule({     //模块  @NgModule装饰器的类
  declarations: [    //声明  自定义模块   组件/指令/管道
    AppComponent
  ],
  imports: [     //其它依赖模块    系统模块
    BrowserModule
  ],
  providers: [],    //服务的创建者
  bootstrap: [AppComponent]   //应用的主视图  启动模块
})
export class AppModule { }     //导出
