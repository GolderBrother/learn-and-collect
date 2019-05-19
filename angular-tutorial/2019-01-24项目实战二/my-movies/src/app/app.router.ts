import {Routes} from '@angular/router';   //路由
import { MoviesComponent } from './movies/movies.component'; 
import { UpcomingComponent } from './upcoming/upcoming.component'; 
import { PopularComponent } from './popular/popular.component'; 
import { DemoComponent } from './demo/demo.component'; 

export const AppRoutes: Routes =[
    //pathMatch:'prefix'  //匹配开头     'full' 完全匹配
    {path:'',component:MoviesComponent,pathMatch:'full'},
    {path:'upcoming',component:UpcomingComponent},
    {path:'popular/series',component:PopularComponent},
    {path:'demo',component:DemoComponent},
    {path:'genres/:id',component:DemoComponent}   //分类详情
]