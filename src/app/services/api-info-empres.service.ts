import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiInfoEmpresService {

  InfoEmpres: InfoEmpresa[] = [];

  constructor(private _http: HttpClient) { }

  getInfo(){
    return this._http.get<InfoEmpresa[]>('empres').subscribe({
      next: res => {
        this.InfoEmpres = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

}

export interface InfoEmpresa{
  id: number,
  description: string,
  ubication: string,
  gmail: string,
  telefono: string
}