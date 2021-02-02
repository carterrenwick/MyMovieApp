import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { ModalComponent } from './shared/modal/modal.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AddEditMovieComponent } from './movie/add-edit-movie/add-edit-movie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './shared/interceptor/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    ModalComponent,
    AlertComponent,
    AddEditMovieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
