import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/shared/service/alert.service';
import { ModalService } from 'src/app/shared/service/modal.service';
import { Movie } from '../movie';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})
export class AddEditMovieComponent implements OnInit, OnChanges {
  @Input() selectedMovie: Movie;
  
  @Output() movieCreated = new EventEmitter<Movie>();
  @Output() movieUpdated = new EventEmitter<Movie>();

  addEditMovieForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private movieService: MovieService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addEditMovieForm = this.getDefaultFormValue();
  }

  ngOnChanges() {
    console.log('NG ON CHANGES HOOK!');
    this.addEditMovieForm = this.getDefaultFormValue();
  }

  submitForm() {
    // this.addEditMovieForm.value.releaseDate = new Date(this.addEditMovieForm.value.releaseDate+'T00:00:00');
    console.log(this.addEditMovieForm.value.releaseDate);
    if (this.selectedMovie) {
      this.movieService.updateMovie(this.addEditMovieForm.value).subscribe(x => {
        this.movieUpdated.emit(this.addEditMovieForm.value);
        this.alertService.success('Update successful!');
        this.modalService.close('edit-movie-modal');
      });
    } else {
      this.movieService.createMovie(this.addEditMovieForm.value).subscribe(x => {
        this.movieCreated.emit(x);
        this.alertService.success('Successfully added movie: ' + x.title);
        this.modalService.close('add-movie-modal');
      });
    }
  }

  clearForm() {
    this.addEditMovieForm = this.getDefaultFormValue();
  }

  onModalClose() {
    this.addEditMovieForm = this.getDefaultFormValue();
    this.modalService.closeAll();
  }

  getDefaultFormValue() {
    return this.formBuilder.group({
      id: this.selectedMovie ? this.selectedMovie.id : undefined,
      title: this.selectedMovie ? this.selectedMovie.title : undefined,
      genre: this.selectedMovie ? this.selectedMovie.genre : undefined,
      rating: this.selectedMovie ? this.selectedMovie.rating : 0.5,
      releaseDate: this.selectedMovie ? this.selectedMovie.releaseDate : undefined
    });
  }
}
