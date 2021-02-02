import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/shared/service/alert.service';
import { Movie } from '../movie';
import { ModalService } from 'src/app/shared/service/modal.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  @Input() movieList: Movie[];
  selectedMovie: Movie;

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor(
    private movieService: MovieService,
    private alertService: AlertService,
    private modalService: ModalService
    ) { }

  ngOnInit() {
    // this.movieService.getAllMovies().subscribe(data => this.movieList = data);
  }

  onEditClick(movie: Movie) {
    this.selectedMovie = movie;
    this.modalService.open('edit-movie-modal');
  }

  onDeleteClick(movie: Movie) {
    this.selectedMovie = movie;
    this.modalService.open('delete-movie-modal');
  }

  onDeleteConfirmation() {
    this.movieService.deleteMovie(this.selectedMovie.id).subscribe(() => {
      this.movieList.splice(this.movieList.findIndex(x => x.id === this.selectedMovie.id), 1);
      this.modalService.close('delete-movie-modal');
      this.alertService.warn(this.selectedMovie.title + ' has been removed from the list');
    })
  }

  onMovieUpdate(movie: Movie) {
    const index = this.movieList.findIndex(x => x.id === movie.id);
    this.movieList[index] = movie;
  }

}
