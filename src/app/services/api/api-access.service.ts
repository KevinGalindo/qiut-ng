import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAccessService {

  userToken: string | null = '';

  constructor(private _http: HttpClient) {

    this.leerToken();

  }

  createAccount(user: Iuser):Observable<any>{
    
    return this._http.post('sign-up', user);

  }

  login(user: {email: string, password: string}):Observable<Iparams>{

    this.leerToken();
    return this._http.post<Iparams>('auth', user);

  }

  leerToken(){

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }

  isAuth(): boolean{

    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }

  }

  logout(){

    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }

  }

}

interface Iparams {
  status: boolean,
  message: string,
  token: string
}

interface Iuser {
  name: string,
  email: string,
  password: string
}