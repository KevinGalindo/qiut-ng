import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAccessService {

  constructor(private _http: HttpClient) {

    

  }

  login(user: {email: string, password: string}):Observable<Iparams>{

    return this._http.post<Iparams>('auth', user);

  }
  

}

interface Iparams {
  status: boolean,
  message: string,
  token: string
}