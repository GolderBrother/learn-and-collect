import { BrowserModule } from '@angular/platform-browser';   //识别指令/组件。。。
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';   //NgModel

import { AppComponent } from './app.component';  //自定义组件

@NgModule({
  declarations: [    //声明   自定义模块
    AppComponent
  ],
  imports: [   //依赖模块    系统模块
    BrowserModule,
    FormsModule 
  ],
  providers: [],   //服务的创建者
  bootstrap: [AppComponent]    //启动模块
})
export class AppModule { }   //导出
