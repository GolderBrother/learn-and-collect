import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { UpcomingComponent } from './upcoming/upcoming.component';

export const appRoutes: Routes = [
    {path: '', component: MoviesComponent,pathMatch:'full'}, 
    {path: 'upcoming', component: UpcomingComponent,pathMatch:'full'},
    {path: 'popular', component: MoviesComponent,pathMatch:'full'}, 
];