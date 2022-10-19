import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiAccessService } from './api/api-access.service';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private _accessService: ApiAccessService,
    private _apiAcces: ApiAccessService,
    private _rotuer: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const url = `${environment.UrlApi}/${request.url}`;
    let apiKey: string | null = '';

    if (this._accessService.isAuth()) {
      apiKey = localStorage.getItem('token');
    }
    const headers = new HttpHeaders({
      'Access-Token': `${apiKey}`
    });

    const clonRequest = request.clone({url, headers });

    return next.handle(clonRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        this._apiAcces.logout();
        this._rotuer.navigateByUrl('/login');
        return throwError(() => err);
      })
    );
  }
}
