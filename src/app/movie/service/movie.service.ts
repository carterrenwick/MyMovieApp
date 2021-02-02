import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'protractor';
import { environment } from 'src/environments/environment';
import { Movie } from '../movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getAllMovies() {
    return this.http.get<Movie[]>(environment.movie.getAllMovies());
  }

  createMovie(movie: Movie) {
    return this.http.put<Movie>(environment.movie.createMovie(), movie);
  }

  updateMovie(movie: Movie) {
    return this.http.post<Config>(environment.movie.updateMovie(), movie);
  }

  deleteMovie(id: number) {
    return this.http.delete<Config>(environment.movie.deleteMovie(id));
  }
  
}
