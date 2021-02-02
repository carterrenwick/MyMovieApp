import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../service/alert.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                // retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    this.alertService.error(error.error);
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    return throwError(errorMessage);
                })
            );
    }
}