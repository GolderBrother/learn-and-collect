import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';   

import { ViewComponent } from './view.component';
import { ListComponent } from './list.component';
import { DetailComponent } from './detail.component';
//配置路由
const routes:Routes =[
    {path:'',redirectTo:'/view',pathMatch:'full'},
    {path:'view',component:ViewComponent},
    {path:'list',component:ListComponent},
    {path:'detail/:id',component:DetailComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }   //导出
