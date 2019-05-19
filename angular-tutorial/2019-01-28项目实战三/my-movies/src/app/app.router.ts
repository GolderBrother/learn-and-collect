import {Routes} from '@angular/router';   //路由
import { MoviesComponent } from './movies/movies.component'; 
import { UpcomingComponent } from './upcoming/upcoming.component'; 
import { PopularComponent } from './popular/popular.component'; 
import { DemoComponent } from './demo/demo.component'; 
import { GenresComponent } from './genres/genres.component';    //分类详情
import { MovieDetailComponent } from './movie-detail/movie-detail.component';    //影片详情
import { ActorComponent } from './actor/actor.component';  //作者信息

export const AppRoutes: Routes =[
    //pathMatch:'prefix'  //匹配开头     'full' 完全匹配
    {path:'',component:MoviesComponent,pathMatch:'full'},
    {path:'upcoming',component:UpcomingComponent},
    {path:'popular/series',component:PopularComponent},
    {path:'demo',component:DemoComponent},
    {path:'genres/:id/:name',component:GenresComponent},  //分类详情
    {path:'movie/:id',component:MovieDetailComponent},  //影片详情
    {path: 'actor/:id', component: ActorComponent},  //作者信息
]