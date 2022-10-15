import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiAccessService } from './api/api-access.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private _accessService: ApiAccessService) {}

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

    return next.handle(clonRequest);
  }
}
