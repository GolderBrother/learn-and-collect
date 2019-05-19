import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';//顶级影片
import { UpcomingComponent } from './upcoming/upcoming.component';//最新影片
import { GenresComponent } from './genres/genres.component'; //分类
import { DetailComponent } from './detail/detail.component'; //详情
import { ActorComponent } from './actor/actor.component'; //作者

export const appRoutes: Routes = [
    {path: '', component: MoviesComponent,pathMatch:'full'}, 
    {path: 'upcoming', component: UpcomingComponent},
    {path: 'popular', component: MoviesComponent}, 
    {path: 'genres/:id/:name', component: GenresComponent}, 
    {path: 'movie/:id', component: DetailComponent}, 
    {path: 'actor/:id', component: ActorComponent}, 
];