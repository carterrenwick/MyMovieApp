import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Movie } from './movie/movie';
import { MovieService } from './movie/service/movie.service';
import { ModalService } from './shared/service/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movieList: Movie[];
  faPlus = faPlus;

  constructor(
     public modalService: ModalService,
     private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getAllMovies().subscribe(data => this.movieList = data);
  }

  onMovieCreation(movie: Movie) {
    this.movieList.push(movie);
  }

}
