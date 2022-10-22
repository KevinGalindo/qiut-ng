import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiFilterServicesService {

  categories: Icategories[] = [];

  constructor(private _http: HttpClient) { }

  getAll(){
    return this._http.get<Icategories[]>('categories');
  }

}

export interface Icategories{
  id: number;
  name: string;
}