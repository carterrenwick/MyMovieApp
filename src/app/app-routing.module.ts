import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie/movie-list/movie-list.component';


const routes: Routes = [
  { path: 'movie-list', component: MovieListComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'movie-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
