import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';   

import { HomeComponent } from './home.component';
import { NewsComponent } from './news.component';
import { OtherComponent } from './other.component';
//配置路由
const routes:Routes =[
    {path:'home',component:HomeComponent},
    {path:'news',component:NewsComponent},
    {path:'other',component:OtherComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }   //导出
