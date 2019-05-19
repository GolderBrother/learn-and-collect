import { BrowserModule } from '@angular/platform-browser';   //识别指令/组件。。。
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';   //NgModel
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';  //自定义组件

import { AppRouterModule } from './router.module';  //路由
import { ViewComponent } from './view.component';
import { ListComponent } from './list.component';
import { OtherComponent } from './other.component';
import { DetailComponent } from './detail.component';  //详细
import { ListsService } from './app.service';

@NgModule({
  declarations: [    //声明   自定义模块
    AppComponent,
    DetailComponent,
    ViewComponent,
    ListComponent,
    OtherComponent
  ],
  imports: [   //依赖模块    系统模块
    BrowserModule,
    FormsModule ,
    AppRouterModule,
    HttpModule
  ],
  providers: [ListsService],   //服务的创建者
  bootstrap: [AppComponent]    //启动模块
})
export class AppModule { }   //导出
